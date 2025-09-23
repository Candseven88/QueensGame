import { TopicPage, Game } from '../types/Game';

export const topicPages: TopicPage[] = [
  {
    id: 'rabbit-road',
    title: 'Rabbit Road',
    slug: 'rabbit-road',
    description: 'Expert-verified arcade adventure with 250K+ players worldwide. Join the ultimate rabbit adventure experience!',
    icon: '🐰',
    filterCriteria: (game: Game) => game.tags.some(tag => ['rabbit', 'adventure', 'arcade', 'carrot', 'animal'].includes(tag.toLowerCase())),
    seoTitle: 'Rabbit Road - Ultimate Arcade Adventure Experience | QueensGame',
    seoDescription: 'Discover Rabbit Road, the expert-verified arcade game with 250K+ players worldwide. Family-friendly rabbit adventure with premium gameplay.',
    seoKeywords: 'rabbit road, arcade games, animal games, adventure games, family games, safe games, expert verified',
    priority: 0,
    color: '#FF6B9D',
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 'drift-boss',
    title: 'Drift Boss',
    slug: 'drift-boss',
    description: 'Master the art of drifting in this addictive one-click driving game. Navigate tricky corners, collect coins, and unlock new cars!',
    icon: '🏎️',
    filterCriteria: (game: Game) => game.id === 'gd-drift-boss' || 
      game.tags.some(tag => ['drifting', 'car', 'driving'].includes(tag.toLowerCase())),
    seoTitle: 'Drift Boss - Play the Viral Car Drifting Game Online | QueensGame',
    seoDescription: 'Play Drift Boss online for free! Master the art of drifting in this addictive one-click driving game. Navigate tricky corners, collect coins, and unlock new cars.',
    seoKeywords: 'drift boss, car drifting game, one click game, driving game, car game, arcade game, drift racing, casual game',
    priority: 1,
    color: '#FF6B35',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'trending',
    title: 'Trending Games',
    slug: 'trending',
    description: 'Discover the hottest and most popular games that everyone is playing right now!',
    icon: '🔥',
    filterCriteria: (game: Game) => game.trending === true || game.hotGame === true,
    seoTitle: 'Trending Games 2024 - Play the Hottest Online Games | QueensGame',
    seoDescription: 'Play the most trending and viral games of 2024. Discover what everyone is playing right now - free HTML5 games updated daily.',
    seoKeywords: 'trending games, viral games, popular games, hot games, most played games 2024, trending online games',
    priority: 0,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 'editors-picks',
    title: "Editor's Picks",
    slug: 'editors-picks',
    description: 'Hand-selected premium games chosen by our gaming experts for the ultimate experience.',
    icon: '⭐',
    filterCriteria: (game: Game) => game.editorsPick === true,
    seoTitle: "Editor's Choice Games - Premium Curated Gaming Collection | QueensGame",
    seoDescription: 'Play editor-curated premium games. Hand-picked by gaming experts for quality, fun, and engaging gameplay. Updated weekly.',
    seoKeywords: 'editors choice games, curated games, premium games, best games, recommended games, expert picks',
    priority: 3,
    color: '#4ECDC4',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'best-games',
    title: 'Best Games',
    slug: 'best-games',
    description: 'The highest-rated and most acclaimed games that define excellence in online gaming.',
    icon: '🏆',
    filterCriteria: (game: Game) => game.bestGame === true || (game.rating !== undefined && game.rating >= 4.5),
    seoTitle: 'Best Online Games 2024 - Top Rated Free Games | QueensGame',
    seoDescription: 'Play the best online games of 2024. Top-rated, award-winning games with excellent gameplay and stunning graphics.',
    seoKeywords: 'best games, top rated games, award winning games, highest rated games, premium games, excellent games',
    priority: 3,
    color: '#FFD93D',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'hot-games',
    title: 'Hot Games',
    slug: 'hot-games',
    description: 'The most exciting and fast-paced games that will get your adrenaline pumping!',
    icon: '🔥',
    filterCriteria: (game: Game) => game.hotGame === true || game.featured === true,
    seoTitle: 'Hot Games - Most Exciting Action-Packed Online Games | QueensGame',
    seoDescription: 'Play the hottest and most exciting games online. Fast-paced, action-packed games that will keep you on the edge of your seat.',
    seoKeywords: 'hot games, exciting games, action games, fast paced games, adrenaline games, intense games',
    priority: 4,
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'most-played',
    title: 'Most Played',
    slug: 'most-played',
    description: 'The games with millions of plays worldwide - join the community of dedicated players!',
    icon: '👥',
    filterCriteria: (game: Game) => game.mostPlayed === true || (game.plays !== undefined && game.plays >= 100000),
    seoTitle: 'Most Played Games - Popular Community Favorites | QueensGame',
    seoDescription: 'Play the most popular games with millions of players worldwide. Join the community and experience the most loved games.',
    seoKeywords: 'most played games, popular games, community favorites, millions of players, viral games, beloved games',
    priority: 5,
    color: '#6C5CE7',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'weekly-picks',
    title: 'Weekly Picks',
    slug: 'weekly-picks',
    description: 'Fresh selections updated every week - discover new gaming experiences regularly!',
    icon: '📅',
    filterCriteria: (game: Game) => game.weeklyPick === true,
    seoTitle: 'Weekly Game Picks - Fresh Games Updated Every Week | QueensGame',
    seoDescription: 'Discover new games every week with our weekly picks. Fresh gaming experiences selected regularly for your entertainment.',
    seoKeywords: 'weekly picks, weekly games, new games, fresh games, updated weekly, game recommendations',
    priority: 6,
    color: '#00B894',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'exclusive',
    title: 'Exclusive Games',
    slug: 'exclusive',
    description: 'Special and unique games available only on QueensGame - play what others can\'t find!',
    icon: '💎',
    filterCriteria: (game: Game) => game.exclusive === true,
    seoTitle: 'Exclusive Games - Unique Gaming Experiences Only at QueensGame',
    seoDescription: 'Play exclusive games available only on QueensGame. Unique gaming experiences you won\'t find anywhere else.',
    seoKeywords: 'exclusive games, unique games, special games, rare games, limited games, one of a kind games',
    priority: 7,
    color: '#A29BFE',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'christmas',
    title: 'Christmas Games',
    slug: 'christmas-games',
    description: 'Celebrate the holiday season with festive Christmas-themed games full of joy and magic!',
    icon: '🎄',
    filterCriteria: (game: Game) => game.seasonal === 'Christmas' || 
      game.tags.some(tag => ['christmas', 'santa', 'holiday', 'winter', 'xmas'].includes(tag.toLowerCase())),
    seoTitle: 'Christmas Games 2024 - Festive Holiday Gaming Fun | QueensGame',
    seoDescription: 'Play the best Christmas games online! Festive holiday-themed games with Santa, snow, and Christmas magic. Perfect for the season.',
    seoKeywords: 'christmas games, holiday games, santa games, winter games, festive games, xmas games, seasonal games',
    priority: 8,
    color: '#00B894',
    gradient: 'from-green-600 to-red-600'
  },
  {
    id: 'halloween',
    title: 'Halloween Games',
    slug: 'halloween-games',
    description: 'Spooky and thrilling games perfect for Halloween - if you dare to play!',
    icon: '🎃',
    filterCriteria: (game: Game) => game.seasonal === 'Halloween' || 
      game.tags.some(tag => ['halloween', 'spooky', 'ghost', 'scary', 'horror'].includes(tag.toLowerCase())),
    seoTitle: 'Halloween Games 2024 - Spooky Horror Gaming Collection | QueensGame',
    seoDescription: 'Play spooky Halloween games online! Scary, thrilling, and horror-themed games perfect for Halloween season.',
    seoKeywords: 'halloween games, spooky games, horror games, scary games, ghost games, halloween 2024, seasonal games',
    priority: 9,
    color: '#FF6B35',
    gradient: 'from-orange-600 to-purple-600'
  },
  {
    id: 'easter',
    title: 'Easter Games',
    slug: 'easter-games',
    description: 'Spring-themed games filled with bunnies, eggs, and Easter joy for the whole family!',
    icon: '🐰',
    filterCriteria: (game: Game) => game.seasonal === 'Easter' || 
      game.tags.some(tag => ['easter', 'bunny', 'egg', 'spring'].includes(tag.toLowerCase())),
    seoTitle: 'Easter Games 2024 - Spring Holiday Gaming Fun | QueensGame',
    seoDescription: 'Play delightful Easter games online! Spring-themed games with Easter bunnies, egg hunts, and family-friendly fun.',
    seoKeywords: 'easter games, spring games, bunny games, egg hunt games, easter 2024, family games, seasonal games',
    priority: 10,
    color: '#FFD93D',
    gradient: 'from-yellow-400 to-pink-400'
  },
  {
    id: 'puzzle-games',
    title: 'Puzzle Games',
    slug: 'puzzle-games',
    description: 'Challenge your mind with brain-teasing puzzles and logic games for all skill levels.',
    icon: '🧩',
    filterCriteria: (game: Game) => game.category.toLowerCase().includes('puzzle') || 
      game.tags.some(tag => ['puzzle', 'brain', 'logic', 'thinking'].includes(tag.toLowerCase())),
    seoTitle: 'Puzzle Games - Brain Teasers & Logic Games Online | QueensGame',
    seoDescription: 'Play challenging puzzle games online. Brain teasers, logic puzzles, and mind games for all ages and skill levels.',
    seoKeywords: 'puzzle games, brain games, logic games, mind games, brain teasers, thinking games, educational games',
    priority: 11,
    color: '#6C5CE7',
    gradient: 'from-purple-500 to-blue-500'
  },
  {
    id: 'action-games',
    title: 'Action Games',
    slug: 'action-games',
    description: 'High-octane action games packed with excitement, adventure, and non-stop thrills!',
    icon: '⚡',
    filterCriteria: (game: Game) => game.category.toLowerCase().includes('action') || 
      game.tags.some(tag => ['action', 'adventure', 'fighting', 'shooting'].includes(tag.toLowerCase())),
    seoTitle: 'Action Games - Fast-Paced Adventure & Fighting Games | QueensGame',
    seoDescription: 'Play exciting action games online! Fast-paced adventures, fighting games, and thrilling challenges for action game lovers.',
    seoKeywords: 'action games, adventure games, fighting games, fast paced games, thrilling games, exciting games',
    priority: 12,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-orange-500'
  }
];

// Helper function to get games for a specific topic
export function getGamesForTopic(topicSlug: string, allGames: Game[]): Game[] {
  const topic = topicPages.find(t => t.slug === topicSlug);
  if (!topic) return [];
  
  return allGames.filter(topic.filterCriteria);
}

// Helper function to get topic by slug
export function getTopicBySlug(slug: string): TopicPage | undefined {
  return topicPages.find(topic => topic.slug === slug);
}

// Helper function to get seasonal topics
export function getSeasonalTopics(): TopicPage[] {
  return topicPages.filter(topic => 
    ['christmas', 'halloween', 'easter'].includes(topic.id)
  );
}

// Helper function to get main gaming topics (non-seasonal)
export function getMainTopics(): TopicPage[] {
  return topicPages.filter(topic => 
    !['christmas', 'halloween', 'easter', 'puzzle-games', 'action-games'].includes(topic.id)
  );
}

// Helper function to get category topics
export function getCategoryTopics(): TopicPage[] {
  return topicPages.filter(topic => 
    ['puzzle-games', 'action-games'].includes(topic.id)
  );
} 