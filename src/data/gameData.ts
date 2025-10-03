import { Game, GameCategory } from "../types/Game";
import { gameMonetizeGames } from "./gameMonetizeData";
import { enhanceGameData, distributeSpecialMarks, enhanceGameTags } from "../utils/enhanceGameData";

// 真实的GameMonetize游戏数据 - 包含新游戏推荐
export const featuredGames: Game[] = [
  // 特色合作伙伴游戏 - 顶级推荐
  {
    id: "silent-salt-cookie",
    title: "Silent Salt Cookie - Featured Partner Game",
    description: "Experience the power of the Devil of Silence in this epic Cookie Run Kingdom adventure. Play as Silent Salt Cookie, the fifth and final Beast Cookie, wielding corrupted Solidarity transformed into devastating Silence abilities. Ride alongside the legendary Nox Black Salt through the haunting Land of Silence in this thrilling action-adventure game. Master eclipse powers, stealth mechanics, and devastating combat combos in this premium gaming experience that brings the Cookie Run universe to life.",
    shortDescription: "Epic Beast Cookie adventure featuring Silent Salt Cookie with eclipse powers and legendary steed companion!",
    thumbnail: "/thumbnail/How To Get SILKSONG For FREE.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Adventure", "Action", "Cookie Run", "Beast Cookie", "Eclipse", "Stealth", "Combat", "Fantasy", "Premium", "Featured Partner"],
    url: "https://silentsalt.site/",
    embedUrl: "https://silentsalt.site/",
    fallbackUrls: ["https://silentsalt.site/"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.9,
    plays: 10000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-28T12:00:00.000Z",
    author: "Silent Salt Game Portal",
    releaseDate: "2025-09-28",
    language: "English",
    seoKeywords: "silent salt cookie, beast cookie, cookie run kingdom, devil of silence, eclipse powers, nox black salt, stealth mechanics, action adventure, fantasy game, premium gaming",
    external: true,
    instructions: [
      "Master the power of Silent Salt Cookie, the Devil of Silence",
      "Wield corrupted Solidarity transformed into devastating Silence abilities",
      "Ride alongside the legendary steed Nox Black Salt through epic battles",
      "Use stealth mechanics to outmaneuver enemies with precision",
      "Control eclipse powers to harness the moon's energy in combat",
      "Execute devastating attack combos with advanced combat system",
      "Explore the haunting Land of Silence in this premium adventure",
      "Experience the ultimate Beast Cookie saga in Cookie Run Kingdom"
    ]
  },
  // 新套壳游戏 - Queens Game 225 (SEO优化版本)
  {
    id: "queensgame-mirror",
    title: "Queens Game 225 - Ultimate Royal Gaming Portal",
    description: "Play Queens Game 225 and master challenging royal puzzle levels! Experience Queens Level 152, Queens Level 53, Queens Level 81, and 80+ queens games. Free online puzzle gaming with progressive difficulty from Queens Level 11 to Queens 225. Challenge yourself with Color Cannon Level 39 and other strategic royal adventures. Perfect for puzzle enthusiasts seeking brain-teasing gameplay and logical challenges.",
    shortDescription: "Play Queens 225, Level 152, 53, 81 & 80+ royal puzzle games - Free online strategic gaming portal!",
    thumbnail: "/thumbnail/How To Get SILKSONG For FREE.jpg",
    category: "Royal Puzzle",
    tags: ["Queens 225", "Queens Level 152", "Queens Level 53", "Queens Level 81", "80 Queens", "Queens Level 11", "Queens Level 12", "Queens Level 40", "Color Cannon Level 39", "Puzzle Games", "Royal Games", "Strategy", "Brain Games", "Logic Puzzles", "Free Games"],
    url: "/games/queensgame-mirror",
    embedUrl: "https://queensgame.vercel.app/",
    fallbackUrls: ["https://queensgame.vercel.app/"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.9,
    plays: 25000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    bestGame: true,
    mostPlayed: true,
    createdAt: "2025-10-03T12:00:00.000Z",
    author: "Royal Queens Gaming",
    releaseDate: "2025-10-03",
    language: "English",
    seoKeywords: "queens 225, queens level 152, queens level 53, queens level 81, 80 queens, queens level 11, queens level 12, queens level 40, color cannon level 39, queens game, royal puzzle games, strategic puzzle games, free online puzzle games, brain games, logic puzzles",
    external: true,
    instructions: [
      "Master Queens Game 225 - the ultimate royal puzzle challenge",
      "Progress through Queens Level 11, 12, 40 for beginners",
      "Tackle intermediate challenges: Queens Level 53 and Queens Level 81", 
      "Conquer advanced levels: Queens Level 152 and Queens 225",
      "Explore the complete 80 Queens game collection",
      "Challenge yourself with Color Cannon Level 39 special puzzles",
      "Use strategic thinking and logical reasoning to solve each level",
      "Enjoy progressive difficulty that adapts to your skill level"
    ]
  },
  // 新游戏推荐 - 置顶显示
  {
    id: "subway-moto",
    title: "Subway Moto - New Game Recommendation",
    description: "Rev up your engines for the ultimate subway motorcycle adventure! Navigate through underground tunnels at breakneck speeds while dodging obstacles and collecting power-ups. This adrenaline-pumping racing game combines precise controls with challenging track designs that will test your reflexes and racing skills. Experience stunning 3D graphics and smooth gameplay as you weave through subway stations, jump over barriers, and perform spectacular stunts. Perfect for racing enthusiasts who crave high-speed thrills and precision driving challenges.",
    shortDescription: "High-speed subway motorcycle racing with stunning 3D graphics and challenging obstacle courses - pure adrenaline rush!",
    thumbnail: "/thumbnail/Subway Moto.png",
    category: "Royal Racing", 
    tags: ["1 Player", "Racing", "Motorcycle", "3D", "Speed", "Obstacles", "Stunts", "New Game", "Adrenaline", "Underground"],
    url: "/games/subway-moto",
    embedUrl: "https://yoplay.io/subway-moto.embed",
    fallbackUrls: ["https://yoplay.io/subway-moto"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.7,
    plays: 22000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-25T11:00:00.000Z",
    author: "YoPlay Studios",
    releaseDate: "2025-09-25",
    language: "English",
    seoKeywords: "subway moto, new game recommendation, motorcycle racing, 3D racing game, subway racing, high speed racing, obstacle racing, underground racing, racing simulation, adrenaline racing",
    external: true,
    instructions: [
      "Use arrow keys or WASD to control your motorcycle's movement and speed",
      "Navigate through subway tunnels while avoiding trains, barriers, and obstacles",
      "Collect coins and power-ups to boost your performance and score",
      "Perform stunts and jumps to earn extra points and style bonuses",
      "Master the timing to weave through tight spaces at high speeds",
      "Upgrade your motorcycle with collected coins for better performance",
      "Challenge yourself to achieve the longest distance and highest score"
    ]
  },
  {
    id: "kirka",
    title: "Kirka - New Game Recommendation", 
    description: "Enter the competitive world of Kirka, a fast-paced multiplayer shooting game that combines tactical gameplay with intense action. Engage in strategic battles across diverse maps while customizing your loadout and mastering various weapons. This skill-based shooter emphasizes teamwork, precision aiming, and quick decision-making in dynamic combat scenarios. With its smooth controls and competitive mechanics, Kirka delivers an authentic FPS experience that challenges players to improve their shooting skills and tactical awareness.",
    shortDescription: "Competitive multiplayer FPS with tactical gameplay and weapon customization - perfect for strategic shooters!",
    thumbnail: "/thumbnail/Kirka.jpg",
    category: "Royal Action",
    tags: ["Multiplayer", "FPS", "Shooting", "Tactical", "Competitive", "Strategy", "Weapons", "New Game", "Skill-based", "Team Play"],
    url: "/games/kirka",
    embedUrl: "https://yoplay.io/kirka.embed",
    fallbackUrls: ["https://yoplay.io/kirka"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.5,
    plays: 35000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-25T11:30:00.000Z",
    author: "YoPlay Studios",
    releaseDate: "2025-09-25",
    language: "English",
    seoKeywords: "kirka game, new game recommendation, multiplayer fps, tactical shooter, competitive gaming, online shooting game, fps browser game, team shooter, strategic combat",
    external: true,
    instructions: [
      "Use WASD keys to move your character around the battlefield",
      "Aim with your mouse and click to shoot at opponents",
      "Use different weapons strategically based on the combat situation",
      "Work with your team to control key areas of the map",
      "Take cover behind obstacles to avoid enemy fire",
      "Customize your loadout to match your preferred playstyle",
      "Practice your aim and timing to improve your competitive performance"
    ]
  },
  {
    id: "silksong-free",
    title: "How to Get Silksong for Free - New Game Recommendation",
    description: "Discover the ultimate guide to accessing Silksong content while exploring this comprehensive gaming experience. This interactive adventure combines exploration elements with informative gameplay that teaches players about gaming culture and community resources. Navigate through beautifully designed environments while learning valuable tips and strategies. Perfect for adventure game enthusiasts and fans of the Hollow Knight universe who want to enhance their gaming knowledge and discover new ways to enjoy their favorite titles.",
    shortDescription: "Interactive adventure guide combining exploration with gaming tips - perfect for Hollow Knight fans and adventure seekers!",
    thumbnail: "/thumbnail/How To Get SILKSONG For FREE.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Adventure", "Guide", "Exploration", "Interactive", "Gaming Tips", "Hollow Knight", "New Game", "Educational", "Community"],
    url: "/games/silksong-free",
    embedUrl: "https://yoplay.io/how-to-get-silksong-for-free.embed",
    fallbackUrls: ["https://yoplay.io/how-to-get-silksong-for-free"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.3,
    plays: 18000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-25T12:00:00.000Z",
    author: "YoPlay Studios",
    releaseDate: "2025-09-25",
    language: "English",
    seoKeywords: "silksong free, new game recommendation, hollow knight silksong, adventure game, gaming guide, interactive guide, exploration game, gaming tips, community resources",
    external: true,
    instructions: [
      "Use arrow keys or WASD to navigate through the interactive guide",
      "Click on highlighted areas to discover gaming tips and resources",
      "Explore different sections to learn about gaming communities",
      "Follow the interactive prompts to uncover valuable information",
      "Take your time to read and understand each gaming tip provided",
      "Use the knowledge gained to enhance your overall gaming experience",
      "Share the useful tips with fellow gamers in your community"
    ]
  },
  {
    id: "flamy-dash",
    title: "Flamy Dash - New Game Recommendation",
    description: "Experience the ultimate dash adventure in Flamy Dash! Navigate through challenging obstacles with precise timing and lightning-fast reflexes. This addictive platformer combines stunning visual effects with smooth gameplay mechanics that will keep you coming back for more. Master the art of dashing through fiery landscapes, avoiding deadly traps, and collecting power-ups to achieve the highest scores. Perfect for players who love fast-paced action games that test their skills and reaction time.",
    shortDescription: "Fast-paced dash adventure with challenging obstacles and stunning visual effects - perfect for reflex testing!",
    thumbnail: "/thumbnail/Flamy Dash.png",
    category: "Royal Action", 
    tags: ["1 Player", "Action", "Dash", "Platformer", "Reflex", "Fast-paced", "Obstacles", "New Game", "Challenging", "Arcade"],
    url: "/games/flamy-dash",
    embedUrl: "https://yoplay.io/flamy-dash.embed",
    fallbackUrls: ["https://yoplay.io/flamy-dash"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.6,
    plays: 15000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-25T10:00:00.000Z",
    author: "YoPlay Studios",
    releaseDate: "2025-09-25",
    language: "English",
    seoKeywords: "flamy dash, new game recommendation, dash adventure, platformer game, reflex game, fast-paced action, obstacle course, arcade game, challenging gameplay, yoplay games",
    external: true,
    instructions: [
      "Use arrow keys or WASD to control your character's movement",
      "Press spacebar or click to dash through obstacles at the perfect moment",
      "Avoid deadly traps and hazardous terrain while maintaining momentum",
      "Collect power-ups and bonuses to boost your score and abilities",
      "Master the timing of your dashes to navigate through complex obstacle patterns",
      "Challenge yourself to achieve higher scores and unlock new levels",
      "Perfect for players who enjoy skill-based platformers and reflex challenges"
    ]
  },
  {
    id: "lovemoney-game",
    title: "LoveMoney: Moral Clicker RPG",
    description: "LoveMoney is an emotionally charged clicker RPG where desperate circumstances drive difficult choices. You need money for life-saving surgery but face an unconventional opportunity at a mysterious stall. This narrative-driven clicker combines fast-paced gameplay with heavy moral weight, challenging players to balance survival needs against ethical boundaries. Each click advances both your financial goals and a deeply personal story of relationships, sacrifice, and the true cost of desperation.",
    shortDescription: "A bold clicker RPG mixing moral choices with fast-paced gameplay - earn money for life-saving surgery through questionable means.",
    thumbnail: "/thumbnail/LOVEMONEY.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Clicker", "RPG", "Story-driven", "Moral Choices", "Drama", "Survival", "Emotional", "Idle Game", "New Game"],
    url: "/games/lovemoney-game",
    embedUrl: "https://lovemoneygame.io/game/lovemoney-game/",
    fallbackUrls: ["https://sprunki.org/lovemoney"],
    width: 1024,
    height: 768,
    provider: "external",
    rating: 4.5,
    plays: 8500,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-23T14:00:00.000Z",
    author: "Independent Developer",
    releaseDate: "2025-09-22",
    language: "English",
    seoKeywords: "lovemoney game, clicker rpg, moral choices, life saving surgery, emotional clicker, story driven game, idle rpg, survival drama, relationship choices",
    external: true,
    instructions: [
      "Click to earn money needed for life-saving surgery",
      "Make difficult moral choices that affect the story outcome",
      "Meet the mysterious stall owner and learn their unconventional methods",
      "Balance your financial needs with ethical boundaries",
      "Experience the emotional weight of survival-driven decisions",
      "Unlock different story paths based on your choices",
      "Manage relationships while pursuing your desperate goal"
    ]
  },
  {
    id: "bloodmoney-2",
    title: "Human Expenditure Program: Bloodmoney 2",
    description: "Experience Human Expenditure Program: Bloodmoney 2, a psychological horror clicker game where each click inflicts pain on Harvey Harvington, and the pain is very real. This deceptively simple clicker mechanic comes with heavy moral responsibility. The game requires mental resilience and is not recommended for those sensitive to flashing lights. Discover what the Human Expenditure Program really is, who's behind it, and your actual role in this dark experiment.",
    shortDescription: "A psychological horror clicker where each click affects Harvey Harvington's well-being in this moral responsibility thriller.",
    thumbnail: "/thumbnail/Bloodmoney_2.jpg",
    category: "Royal Adventure",
    tags: ["1 Player", "Clicker", "Psychological Horror", "Thriller", "Drama", "Mystery", "Virtual Pet", "Horror", "Sad", "Suspense", "New Game"],
    url: "/games/human-expenditure-program-bloodmoney-2",
    embedUrl: "https://yoplay.io/human-expenditure-program-bloodmoney-2.embed",
    fallbackUrls: ["https://sprunki.org/bloodmoney-2"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.3,
    plays: 12000,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-23T12:00:00.000Z",
    author: "Shroomychrist Studios",
    releaseDate: "2025-09-20",
    language: "English",
    seoKeywords: "bloodmoney 2, human expenditure program, psychological horror clicker, harvey harvington, virtual pet game, moral responsibility game, shroomychrist studios, clicker horror game, drama thriller",
    external: true,
    instructions: [
      "Click on Harvey Harvington to interact - but remember, the pain you inflict is real",
      "Each click has moral weight and psychological consequences",
      "Monitor Harvey's well-being as you progress through the experiment",
      "Discover the truth behind the Human Expenditure Program through gameplay",
      "Experience the heavy responsibility that comes with each interaction",
      "Use mouse clicks to advance the story and uncover dark secrets",
      "Be prepared for psychological impact - mental resilience required"
    ]
  },
  {
    id: "race-survival-arena-king",
    title: "Race Survival: Arena King - New Game Recommendation",
    description: "Enter the ultimate survival racing arena where speed meets strategy in this heart-pounding vehicular combat experience. Race Survival: Arena King combines high-octane racing with tactical combat mechanics, challenging players to outlast opponents while navigating treacherous arena environments. Master vehicle customization, weapon systems, and arena tactics to claim your throne as the undisputed Arena King. This innovative racing game delivers intense multiplayer battles where only the most skilled drivers survive to see victory.",
    shortDescription: "High-intensity survival racing with vehicular combat - master speed, strategy, and survival in deadly arena battles!",
    thumbnail: "/thumbnail/Race_Survival_Arena_King.jpg",
    category: "Royal Racing",
    tags: ["1 Player", "Racing", "Survival", "Combat", "Arena", "Strategy", "Vehicles", "New Game", "Action", "Competitive"],
    url: "/games/race-survival-arena-king",
    embedUrl: "https://www.gamegab.com:444/content/games/race-survival-arena-king/",
    fallbackUrls: ["https://www.gamegab.com/games/race-survival-arena-king"],
    width: 1280,
    height: 720,
    provider: "external",
    rating: 4.6,
    plays: 8500,
    featured: true,
    trending: true,
    editorsPick: true,
    hotGame: true,
    createdAt: "2025-09-25T14:00:00.000Z",
    author: "GameGab Studios",
    releaseDate: "2025-09-25",
    language: "English",
    seoKeywords: "race survival arena king, new game recommendation, survival racing, vehicular combat, arena racing, combat racing, racing strategy, multiplayer racing, survival games, arena combat",
    external: true,
    instructions: [
      "Use WASD or arrow keys to control your vehicle's movement and steering",
      "Navigate through the arena while avoiding obstacles and enemy attacks",
      "Collect power-ups and weapons to enhance your vehicle's capabilities",
      "Use strategic positioning to outmaneuver opponents in combat situations",
      "Master the balance between aggressive racing and defensive survival tactics",
      "Upgrade your vehicle between rounds to improve performance and survivability",
      "Eliminate competitors while racing to become the ultimate Arena King"
    ]
  },
  // 特色游戏 - 从所有游戏中精选
  {
    id: "gm-34678",
    title: "Feed Monster Game",
    description: "Wander through an endless maze collecting glowing dots to boost your score while staying ahead of the hungry creatures lurking around. Grab an energizer and turn the tables, chasing monsters for extra points.",
    thumbnail: "https://img.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/512x384.jpg",
    category: "Royal Action",
    tags: ["1 Player", "Arcade", "Classic", "Funny", "Maze", "PacMan", "Retro"],
    url: "/games/feed-monster-game",
    embedUrl: "https://html5.gamemonetize.com/v2537t64ojk8ia8pa1r0d7xdrhlqq9xt/",
    width: 1280,
    height: 768,
    provider: "gamemonetize",
    rating: 4.7,
    plays: 156000,
    featured: true,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "gm-brainrot-clicker",
    title: "Brainrot Clicker Game",
    description: "Italian Brainrot Clicker – Tap to earn, laugh to survive! In this absurd HTML5 clicker game, you will meet the weirdest cast ever: sharks with shoes, chocolate blocks with bats, birds with bellies, and more. Your goal? Tap on them as fast as you can to gain points, trigger animations, and unlock total chaos.",
    thumbnail: "https://img.gamemonetize.com/ncqiptu7hxaj72x3ijlmp83kl9pbd7c4/512x384.jpg",
    category: "Royal Clicker",
    tags: ["1 Player", "Arcade", "Clicker", "Italian", "Brainrot", "Meme", "Funny", "Royal"],
    url: "/games/brainrot-clicker-game",
    embedUrl: "https://html5.gamemonetize.com/ncqiptu7hxaj72x3ijlmp83kl9pbd7c4/",
    width: 768,
    height: 1024,
    provider: "gamemonetize",
    rating: 4.3,
    plays: 45000,
    featured: true,
    createdAt: "2025-09-04T10:30:00.000Z"
  },
  {
    id: "gm-snake-2025",
    title: "Snake Game 2025",
    description: "Classic Snake Game – HTML5 + Responsive + Touch Support. Bring back the nostalgia with this modern take on the classic Snake Game, built entirely with HTML5, CSS3, and JavaScript. Lightweight, fast, and fully responsive, this game runs smoothly across all modern browsers and devices.",
    thumbnail: "https://img.gamemonetize.com/i6y64skipzp3fqog4u2qpbqw4o2bhzar/512x384.jpg",
    category: "Royal Action",
    tags: ["1 Player", "Action", "Adventure", "Best Games", "Classic", "Snake", "Royal"],
    url: "/games/snake-game-2025",
    embedUrl: "https://html5.gamemonetize.com/i6y64skipzp3fqog4u2qpbqw4o2bhzar/",
    width: 800,
    height: 600,
    provider: "gamemonetize",
    rating: 4.6,
    plays: 125000,
    featured: true,
    createdAt: "2025-09-04T11:15:00.000Z"
  },
  {
    id: "gm-krashen",
    title: "Krashen",
    description: "Krashen – Stack, Smash, and Conquer! Think you have got perfect timing? Krashen will put your reflexes to the ultimate test. Your mission is simple, but dangerously addictive: Tap at the perfect moment to stack falling blocks on top of each other. Miss the alignment, and the overhanging piece gets sliced away.",
    thumbnail: "https://img.gamemonetize.com/z3r5ki3ft58tzkpzn2w4qchzho944bz8/512x384.jpg",
    category: "Royal Clicker",
    tags: ["1 Player", "2025 games", "Best Games", "Clicker", "Hypercasual", "Stack", "Royal"],
    url: "/games/krashen",
    embedUrl: "https://html5.gamemonetize.com/z3r5ki3ft58tzkpzn2w4qchzho944bz8/",
    width: 800,
    height: 600,
    provider: "gamemonetize",
    rating: 4.5,
    plays: 89000,
    featured: true,
    createdAt: "2025-09-04T11:45:00.000Z"
  }
];

export const popularGames: Game[] = featuredGames;

// 游戏分类数据 - 更新统计数字
export const gameCategories: GameCategory[] = [
  {
    id: "1",
    name: "Royal Action",
    slug: "royal-action",
    description: "Fast-paced action games with thrilling gameplay",
    icon: "⚡",
    gameCount: 16
  },
  {
    id: "2",
    name: "Royal Adventure",
    slug: "royal-adventure",
    description: "Epic adventures and exploration games",
    icon: "👑",
    gameCount: 10
  },
  {
    id: "3",
    name: "Royal Racing",
    slug: "royal-racing",
    description: "High-speed racing and driving games",
    icon: "🏎️",
    gameCount: 4
  },
  {
    id: "4",
    name: "Royal Puzzle",
    slug: "royal-puzzle",
    description: "Brain-teasing puzzles and mind games",
    icon: "🧩",
    gameCount: 12
  },
  {
    id: "5",
    name: "Royal Tournament",
    slug: "royal-tournament",
    description: "Competitive multiplayer and sports games",
    icon: "🏆",
    gameCount: 2
  },
  {
    id: "6",
    name: "Royal Clicker",
    slug: "royal-clicker",
    description: "Addictive clicker games with royal themes",
    icon: "👆",
    gameCount: 2
  }
];

// 按分类分组的游戏
export const gamesByCategory: Record<string, Game[]> = {
  "Royal Action": gameMonetizeGames.filter(g => g.category === "Royal Action"),
  "Royal Adventure": gameMonetizeGames.filter(g => g.category === "Royal Adventure"),
  "Royal Racing": gameMonetizeGames.filter(g => g.category === "Royal Racing"),
  "Royal Puzzle": gameMonetizeGames.filter(g => g.category === "Royal Puzzle"),
  "Royal Tournament": gameMonetizeGames.filter(g => g.category === "Royal Tournament"),
  "Royal Clicker": gameMonetizeGames.filter(g => g.category === "Royal Clicker")
};

// 获取特定分类的游戏
export const getGamesByCategory = (category: string): Game[] => {
  return gamesByCategory[category] || [];
};

// 获取所有分类
export const getAllCategories = (): GameCategory[] => {
  return gameCategories;
};

// Yu-Gi-Oh! and Card Games for GENESYS topic
export const cardGames: Game[] = [
  {
    id: "yugioh-master-duel",
    title: "Yu-Gi-Oh! Master Duel",
    description: "Experience the definitive Yu-Gi-Oh! digital card game with over 10,000 cards from the entire TCG history. Build competitive decks, duel online, and master the art of strategic card battling in this free-to-play masterpiece.",
    shortDescription: "The ultimate Yu-Gi-Oh! digital experience with thousands of cards and competitive online dueling.",
    thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/1449850/header.jpg",
    category: "Card Game",
    tags: ["yugioh", "card game", "strategy", "tcg", "multiplayer", "competitive", "deck building", "anime"],
    url: "/games/yugioh-master-duel",
    embedUrl: "https://www.konami.com/yugioh/masterduel/",
    width: 1920,
    height: 1080,
    provider: "external",
    rating: 4.7,
    plays: 125000,
    featured: true,
    trending: true,
    editorsPick: true,
    createdAt: "2024-09-20T10:00:00.000Z",
    author: "Konami",
    releaseDate: "2022-01-19",
    language: "English",
    seoKeywords: "yugioh master duel, digital card game, online dueling, deck building, tcg",
    external: true
  },
  {
    id: "classic-card-battles",
    title: "Classic Card Battles",
    description: "Dive into strategic card battles with simplified rules reminiscent of classic TCG formats. Perfect for players who enjoy the GENESYS-style gameplay with point-based deck construction and balanced competition.",
    shortDescription: "Strategic card game with simplified rules and balanced deck building mechanics.",
    thumbnail: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Classic+Card+Battles",
    category: "Card Game", 
    tags: ["card game", "strategy", "deck building", "genesys", "classic", "tcg", "competitive"],
    url: "/games/classic-card-battles",
    embedUrl: "https://example.com/classic-card-battles",
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.3,
    plays: 45000,
    featured: true,
    weeklyPick: true,
    createdAt: "2024-09-15T12:00:00.000Z",
    author: "QueensGame Studios",
    releaseDate: "2024-09-15",
    language: "English",
    seoKeywords: "card battles, strategy game, deck building, simplified rules, tcg"
  },
  {
    id: "duel-arena-legends",
    title: "Duel Arena Legends",
    description: "Enter the ultimate duel arena where strategic card play meets epic monster battles. Build your deck, summon powerful creatures, and engage in turn-based combat that captures the essence of classic card game tournaments.",
    shortDescription: "Epic monster dueling game with strategic deck building and tournament-style gameplay.",
    thumbnail: "https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Duel+Arena+Legends",
    category: "Card Game",
    tags: ["card game", "monsters", "strategy", "tournament", "dueling", "tcg", "competitive", "fantasy"],
    url: "/games/duel-arena-legends", 
    embedUrl: "https://example.com/duel-arena-legends",
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.5,
    plays: 67000,
    hotGame: true,
    mostPlayed: true,
    createdAt: "2024-09-10T14:00:00.000Z",
    author: "Arena Games",
    releaseDate: "2024-09-10",
    language: "English",
    seoKeywords: "duel arena, monster battles, card strategy, tournament play"
  },
  {
    id: "nostalgic-card-master",
    title: "Nostalgic Card Master",
    description: "Relive the golden age of trading card games with this nostalgia-filled experience. Features classic gameplay mechanics, familiar card types, and strategic depth that veteran players will appreciate.",
    shortDescription: "Classic trading card experience with nostalgic gameplay and strategic depth.",
    thumbnail: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Nostalgic+Card+Master",
    category: "Card Game",
    tags: ["card game", "nostalgic", "classic", "trading card", "strategy", "retro", "tcg"],
    url: "/games/nostalgic-card-master",
    embedUrl: "https://example.com/nostalgic-card-master", 
    width: 1024,
    height: 768,
    provider: "custom",
    rating: 4.2,
    plays: 38000,
    exclusive: true,
    bestGame: true,
    createdAt: "2024-09-05T16:00:00.000Z",
    author: "Retro Gaming Co",
    releaseDate: "2024-09-05",
    language: "English",
    seoKeywords: "nostalgic card game, classic tcg, retro gaming, strategic card play"
  }
];

// 合并所有游戏数据
const rawGames: Game[] = [
  ...featuredGames,
  ...cardGames,
  ...gameMonetizeGames // 使用所有可用的游戏，不再限制数量
];

// 去重函数 - 根据游戏ID去除重复游戏
const removeDuplicateGames = (games: Game[]): Game[] => {
  const uniqueGames = new Map<string, Game>();
  
  games.forEach(game => {
    const existingGame = uniqueGames.get(game.id);
    if (!existingGame) {
      // 如果游戏不存在，直接添加
      uniqueGames.set(game.id, game);
    } else {
      // 如果游戏已存在，保留数据更完整或评分更高的版本
      const shouldReplace = 
        (game.rating || 0) > (existingGame.rating || 0) ||
        (game.plays || 0) > (existingGame.plays || 0) ||
        game.featured === true ||
        game.description.length > existingGame.description.length;
      
      if (shouldReplace) {
        uniqueGames.set(game.id, game);
      }
    }
  });
  
  return Array.from(uniqueGames.values());
};

// 应用去重
const deduplicatedGames = removeDuplicateGames(rawGames);

// 增强游戏数据，添加特殊标记和更丰富的标签
const enhancedGames = distributeSpecialMarks(enhanceGameData(deduplicatedGames)).map(game => ({
  ...game,
  tags: enhanceGameTags(game)
}));

// 所有游戏数据 - 增强后的游戏数据
export const allGames: Game[] = enhancedGames
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
