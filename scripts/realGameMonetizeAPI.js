#!/usr/bin/env node

/**
 * Real GameMonetize RSS Feed Integration
 * Fetches actual games from GameMonetize RSS and API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  RSS_URL: 'https://gamemonetize.com/rss.xml',
  API_BASE_URL: 'https://gamemonetize.com/api/v1',
  GAMES_PER_REQUEST: 50,
  REQUEST_DELAY: 1000, // 1 second between requests
  DATA_FILE: path.join(__dirname, 'src/data/gameMonetizeData.ts'),
  BACKUP_DIR: path.join(__dirname, 'backups'),
  LOG_FILE: path.join(__dirname, 'logs/gamemonetize-api.log'),
  MAX_RETRIES: 3,
  TIMEOUT: 10000 // 10 seconds
};

// Enhanced category mapping for better SEO
const CATEGORY_MAPPING = {
  'Hypercasual': 'Hot Games',
  'Arcade': 'Trending',
  'Shooting': 'Best Games',
  'Racing': 'Racing Games',
  'Puzzles': 'Puzzle Games',
  'Adventure': 'Adventure Games',
  'Girls': 'Most Played',
  'Sports': 'Sports Games',
  'Multiplayer': 'Weekly Picks',
  'Action': 'Editor\'s Picks',
  'Strategy': 'Exclusive',
  'Platform': 'Trending',
  'Fighting': 'Hot Games',
  'Simulation': 'Best Games'
};

// Holiday/Seasonal category detection
const SEASONAL_KEYWORDS = {
  'Christmas': ['christmas', 'santa', 'xmas', 'holiday', 'winter'],
  'Halloween': ['halloween', 'spooky', 'ghost', 'zombie', 'scary'],
  'Easter': ['easter', 'bunny', 'egg', 'spring'],
  'Holidays': ['valentine', 'thanksgiving', 'party', 'celebration']
};

// Logging function
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  const logDir = path.dirname(CONFIG.LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.appendFileSync(CONFIG.LOG_FILE, logMessage + '\n');
}

// Fetch RSS feed with retry logic
async function fetchRSSFeed() {
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      log(`Attempting to fetch RSS feed (attempt ${attempt}/${CONFIG.MAX_RETRIES})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
      
      const response = await fetch(CONFIG.RSS_URL, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'QueensGame RSS Fetcher 1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const xmlData = await response.text();
      log(`Successfully fetched RSS feed (${xmlData.length} chars)`);
      
      return xmlData;
    } catch (error) {
      log(`RSS fetch attempt ${attempt} failed: ${error.message}`, 'ERROR');
      
      if (attempt === CONFIG.MAX_RETRIES) {
        throw new Error(`Failed to fetch RSS after ${CONFIG.MAX_RETRIES} attempts`);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, CONFIG.REQUEST_DELAY * attempt));
    }
  }
}

// Parse RSS XML data
async function parseRSSData(xmlData) {
  try {
    log('Parsing RSS XML data...');
    
    const result = await parseStringPromise(xmlData, {
      trim: true,
      explicitArray: false,
      mergeAttrs: true
    });
    
    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      throw new Error('Invalid RSS structure');
    }
    
    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item];
    
    log(`Parsed ${items.length} items from RSS feed`);
    return items;
  } catch (error) {
    log(`RSS parsing error: ${error.message}`, 'ERROR');
    throw error;
  }
}

// Enhanced game data transformation
function transformGameData(rssItems) {
  log('Transforming game data...');
  
  const transformedGames = rssItems.map((item, index) => {
    try {
      // Extract game ID from link or generate one
      const gameId = extractGameId(item.link || item.guid);
      
      // Get category and check for seasonal content
      const originalCategory = item.category || 'Hypercasual';
      const category = detectCategory(item.title, item.description, originalCategory);
      
      // Generate unique description
      const description = generateUniqueDescription(item.title, item.description || '');
      
      // Extract metadata
      const metadata = extractGameMetadata(item);
      
      // Generate gameplay instructions
      const instructions = generateGameplayInstructions(item.title, category);
      
      // Detect and assign appropriate tags
      const tags = generateTags(item.title, item.description || '', category);
      
      return {
        id: gameId,
        title: item.title || `Game ${index + 1}`,
        description: description,
        shortDescription: description.substring(0, 120) + '...',
        instructions: instructions,
        thumbnail: item.enclosure?.url || metadata.image || `https://img.gamemonetize.com/placeholder_${gameId}/512x384.jpg`,
        category: category,
        tags: tags,
        url: `/games/${generateSlug(item.title || `game-${index + 1}`)}`,
        embedUrl: item.link || `https://html5.gamemonetize.com/${gameId}/`,
        width: metadata.width || 800,
        height: metadata.height || 600,
        provider: 'gamemonetize',
        rating: generateRating(),
        plays: generatePlayCount(),
        featured: Math.random() > 0.85, // 15% chance to be featured
        trending: Math.random() > 0.80, // 20% chance to be trending
        editorsPick: Math.random() > 0.90, // 10% chance for editor's pick
        exclusive: Math.random() > 0.95, // 5% chance to be exclusive
        weeklyPick: Math.random() > 0.88, // 12% chance for weekly pick
        createdAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        lastModified: new Date().toISOString(),
        author: metadata.author || 'GameMonetize',
        releaseDate: item.pubDate || new Date().toISOString(),
        language: 'en',
        seoKeywords: generateSEOKeywords(item.title, category, tags)
      };
    } catch (error) {
      log(`Error transforming game ${index}: ${error.message}`, 'ERROR');
      return null;
    }
  }).filter(game => game !== null);
  
  log(`Successfully transformed ${transformedGames.length} games`);
  return transformedGames;
}

// Extract game ID from URL
function extractGameId(url) {
  if (!url) return `gm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const matches = url.match(/\/([a-zA-Z0-9_-]+)\/?$/);
  return matches ? `gm-${matches[1]}` : `gm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Detect appropriate category including seasonal content
function detectCategory(title, description, originalCategory) {
  const text = `${title} ${description}`.toLowerCase();
  
  // Check for seasonal content first
  for (const [season, keywords] of Object.entries(SEASONAL_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return season;
    }
  }
  
  // Use category mapping
  return CATEGORY_MAPPING[originalCategory] || 'Trending';
}

// Generate unique, SEO-friendly description
function generateUniqueDescription(title, originalDescription) {
  if (!originalDescription || originalDescription.length < 20) {
    return generateDefaultDescription(title);
  }
  
  // Create unique variation of the description
  const variations = [
    `Experience the thrill of ${title}! ${originalDescription}`,
    `Dive into ${title}, an exciting game where ${originalDescription.toLowerCase()}`,
    `Play ${title} online and enjoy ${originalDescription.toLowerCase()}`,
    `${title} brings you ${originalDescription.toLowerCase()} Play now for free!`,
    `Join the adventure in ${title}! ${originalDescription}`
  ];
  
  const selectedVariation = variations[Math.floor(Math.random() * variations.length)];
  return selectedVariation.length > 160 ? selectedVariation.substring(0, 157) + '...' : selectedVariation;
}

// Generate default description for games without one
function generateDefaultDescription(title) {
  const templates = [
    `Play ${title} online for free! An exciting and engaging game that will keep you entertained for hours.`,
    `${title} is a fun and addictive game perfect for players of all ages. Start playing now!`,
    `Enjoy ${title}, a premium gaming experience with stunning graphics and smooth gameplay.`,
    `${title} offers an amazing gaming adventure with challenging levels and exciting rewards.`,
    `Experience the best of online gaming with ${title}. Free to play, easy to master!`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// Generate gameplay instructions
function generateGameplayInstructions(title, category) {
  const categoryInstructions = {
    'Hot Games': [
      'Click or tap to start the game',
      'Use mouse or touch controls to navigate',
      'Follow on-screen prompts for game-specific actions',
      'Achieve high scores and beat your personal best',
      'Share your achievements with friends'
    ],
    'Trending': [
      'Begin by reading the game tutorial',
      'Master the basic controls and mechanics',
      'Progress through increasingly challenging levels',
      'Collect rewards and unlock new features',
      'Compete with other players for top rankings'
    ],
    'Puzzle Games': [
      'Analyze the puzzle layout carefully',
      'Use logic and strategy to solve each level',
      'Drag and drop pieces or click to interact',
      'Look for patterns and connections',
      'Take your time - there\'s no rush to solve puzzles'
    ],
    'Racing Games': [
      'Use arrow keys or WASD to control your vehicle',
      'Press spacebar or click for boost/brake',
      'Navigate through the track avoiding obstacles',
      'Collect power-ups for speed advantages',
      'Cross the finish line in first place to win'
    ],
    'Adventure Games': [
      'Explore the game world by moving your character',
      'Interact with objects and characters you meet',
      'Collect items and tools for your inventory',
      'Solve quests and overcome challenges',
      'Discover hidden secrets and unlock new areas'
    ]
  };
  
  return categoryInstructions[category] || categoryInstructions['Hot Games'];
}

// Extract game metadata
function extractGameMetadata(item) {
  const metadata = {
    width: 800,
    height: 600,
    author: 'GameMonetize',
    image: null
  };
  
  // Try to extract dimensions from description or other fields
  if (item.description) {
    const widthMatch = item.description.match(/width[:\s]*(\d+)/i);
    const heightMatch = item.description.match(/height[:\s]*(\d+)/i);
    
    if (widthMatch) metadata.width = parseInt(widthMatch[1]);
    if (heightMatch) metadata.height = parseInt(heightMatch[1]);
  }
  
  // Extract image URL
  if (item.enclosure && item.enclosure.url) {
    metadata.image = item.enclosure.url;
  }
  
  return metadata;
}

// Generate realistic rating
function generateRating() {
  const baseRating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
  return Math.round(baseRating * 10) / 10;
}

// Generate realistic play count
function generatePlayCount() {
  const ranges = [
    { min: 10000, max: 50000, weight: 0.4 },   // 40% chance
    { min: 50000, max: 150000, weight: 0.35 }, // 35% chance
    { min: 150000, max: 500000, weight: 0.2 }, // 20% chance
    { min: 500000, max: 1000000, weight: 0.05 } // 5% chance
  ];
  
  const random = Math.random();
  let currentWeight = 0;
  
  for (const range of ranges) {
    currentWeight += range.weight;
    if (random <= currentWeight) {
      return Math.floor(Math.random() * (range.max - range.min) + range.min);
    }
  }
  
  return 25000; // fallback
}

// Generate comprehensive tags
function generateTags(title, description, category) {
  const text = `${title} ${description}`.toLowerCase();
  const baseTags = [];
  
  // Category-specific tags
  const categoryTags = {
    'Hot Games': ['trending', 'popular', 'hot', 'featured'],
    'Trending': ['viral', 'popular', 'new', 'trending'],
    'Best Games': ['award-winning', 'top-rated', 'premium', 'best'],
    'Puzzle Games': ['brain-teaser', 'logic', 'thinking', 'puzzle'],
    'Racing Games': ['speed', 'cars', 'racing', 'fast-paced'],
    'Adventure Games': ['exploration', 'quest', 'story', 'adventure'],
    'Sports Games': ['athletics', 'competition', 'sports', 'tournament'],
    'Editor\'s Picks': ['curated', 'recommended', 'choice', 'selected'],
    'Exclusive': ['exclusive', 'unique', 'special', 'limited'],
    'Weekly Picks': ['featured', 'weekly', 'spotlight', 'pick'],
    'Most Played': ['popular', 'favorite', 'top-played', 'loved']
  };
  
  // Add category-specific tags
  if (categoryTags[category]) {
    baseTags.push(...categoryTags[category]);
  }
  
  // Detect gameplay elements
  const gameplayTags = {
    'multiplayer': ['multiplayer', 'online', 'friends', 'versus'],
    'single-player': ['solo', 'single', 'offline'],
    'mobile-friendly': ['mobile', 'touch', 'phone', 'tablet'],
    'browser-game': ['html5', 'browser', 'web', 'online'],
    'free-to-play': ['free', 'no-cost', 'gratis'],
    'family-friendly': ['family', 'kids', 'children', 'safe'],
    'challenging': ['hard', 'difficult', 'challenge', 'expert'],
    'casual': ['easy', 'relaxing', 'casual', 'simple'],
    'arcade': ['arcade', 'retro', 'classic', 'old-school'],
    'strategy': ['strategy', 'tactical', 'planning', 'thinking'],
    '3d': ['3d', 'three-dimensional', 'realistic'],
    '2d': ['2d', 'pixel', 'flat', 'sprite']
  };
  
  // Check for gameplay elements in text
  for (const [tag, keywords] of Object.entries(gameplayTags)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      baseTags.push(tag);
    }
  }
  
  // Add universal tags
  baseTags.push('html5', 'browser-game', 'free-to-play', 'online');
  
  // Remove duplicates and limit to 10 tags
  const uniqueTags = [...new Set(baseTags)];
  return uniqueTags.slice(0, 10);
}

// Generate SEO keywords
function generateSEOKeywords(title, category, tags) {
  const keywords = [
    title.toLowerCase(),
    category.toLowerCase().replace(/['"]/g, ''),
    ...tags,
    'online game',
    'free game',
    'html5 game',
    'browser game',
    'play online'
  ];
  
  return [...new Set(keywords)].join(', ');
}

// Generate URL slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Main fetch function
async function fetchLatestGames() {
  try {
    log('=== Starting GameMonetize RSS fetch ===');
    
    // Fetch RSS feed
    const xmlData = await fetchRSSFeed();
    
    // Parse RSS data
    const rssItems = await parseRSSData(xmlData);
    
    // Transform to game data
    const games = transformGameData(rssItems);
    
    log(`=== Successfully processed ${games.length} games ===`);
    return games;
    
  } catch (error) {
    log(`Fatal error in fetchLatestGames: ${error.message}`, 'ERROR');
    throw error;
  }
}

// Export functions for use in other scripts
export {
  fetchLatestGames,
  transformGameData,
  CONFIG,
  log
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchLatestGames()
    .then(games => {
      console.log(`\n✅ Successfully fetched ${games.length} games`);
      console.log('Sample game:', JSON.stringify(games[0], null, 2));
    })
    .catch(error => {
      console.error(`\n❌ Error: ${error.message}`);
      process.exit(1);
    });
} 