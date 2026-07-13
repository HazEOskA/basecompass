export interface RoadmapDay {
  day: number;
  missionCode: string;
  title: string;
  subtitle: string;
  goal: string;
  tasks: string[];
  warning: string;
  tools: string[];
  toolIds: string[];
  color: string;
  accent: string;
}

export const roadmap: RoadmapDay[] = [
  {
    day: 1,
    missionCode: 'MISSION-01',
    title: 'Wallet Setup',
    subtitle: 'Establish your base of operations',
    goal: 'Create a self-custody wallet, add the Base network, and understand seed phrase security before touching any real assets.',
    tasks: [
      'Install Coinbase Wallet or MetaMask on your phone/browser.',
      'Create a NEW wallet — do not reuse an existing one for exploration.',
      'Write your seed phrase on paper. Do NOT store it in a note, screenshot, or cloud service.',
      'Add Base network (Chain ID: 8453) via chainlist.org if using MetaMask.',
      'Get testnet ETH from the Base Sepolia faucet for zero-risk practice.',
    ],
    warning: 'Anyone who asks for your seed phrase or private key is attempting to steal your assets. Legitimate apps never ask for it.',
    tools: ['Coinbase Wallet', 'MetaMask', 'Rabby Wallet'],
    toolIds: ['coinbase-wallet', 'metamask', 'rabby'],
    color: 'from-base-blue to-base-blue-lt',
    accent: '#0052ff',
  },
  {
    day: 2,
    missionCode: 'MISSION-02',
    title: 'First Transaction',
    subtitle: 'Move funds — understand gas and bridges',
    goal: 'Bridge a small amount of ETH to Base and make your first on-chain swap, understanding every step of the process.',
    tasks: [
      'Bridge a very small amount of ETH (≤ $10) to Base using the official bridge at bridge.base.org.',
      'Open BaseScan and track your bridge transaction in real time.',
      'Once on Base, swap a tiny amount via Aerodrome or Uniswap.',
      'Study the gas fee shown — on Base it should be fractions of a cent.',
      'Check your portfolio on DeBank after the swap to confirm balances.',
    ],
    warning: 'Only use the official Base bridge at bridge.base.org. Third-party bridges carry additional smart contract risk — always verify URLs.',
    tools: ['BaseScan', 'Aerodrome Finance', 'DeBank'],
    toolIds: ['basescan', 'aerodrome', 'debank'],
    color: 'from-neon-cyan to-base-blue',
    accent: '#00d4ff',
  },
  {
    day: 3,
    missionCode: 'MISSION-03',
    title: 'Explore dApps Safely',
    subtitle: 'Navigate the map — read before you sign',
    goal: 'Discover and interact with your first dApps while building the habit of checking URLs, reading transactions, and revoking approvals.',
    tasks: [
      'Visit Revoke.cash — connect your wallet and review any existing approvals.',
      'Explore DeFiLlama to see the Base ecosystem ranked by TVL.',
      'Visit 2 dApps in read-only mode (no connection) before deciding to connect.',
      'When connecting, read exactly what permissions the dApp requests.',
      'After any interaction, return to Revoke.cash and clean up unnecessary approvals.',
    ],
    warning: 'Every dApp connection is a potential risk surface. If a site promises guaranteed returns or airdrops, it is almost certainly a scam.',
    tools: ['Revoke.cash', 'DeFiLlama', 'BaseScan'],
    toolIds: ['revoke', 'defillama', 'basescan'],
    color: 'from-street-green/80 to-neon-cyan',
    accent: '#00ff88',
  },
  {
    day: 4,
    missionCode: 'MISSION-04',
    title: 'Social & Mini Apps',
    subtitle: 'Find your crew in the ecosystem',
    goal: 'Create your onchain social presence and discover the builder community through Farcaster and onchain mini apps.',
    tasks: [
      'Create a Farcaster account on Warpcast — your first onchain social identity.',
      'Follow channels: /base, /buildonbase, /onchain, /farcaster.',
      'Cast your first post about starting your Base journey.',
      'Explore Frames — interactive mini apps embedded inside Farcaster casts.',
      'Subscribe to a Base newsletter on Paragraph.xyz.',
    ],
    warning: 'Never share your seed phrase in social channels. Beware DMs offering "whitelist spots" or "exclusive mints" — these are almost always scams.',
    tools: ['Farcaster (Warpcast)', 'Paragraph', 'Supercast'],
    toolIds: ['farcaster', 'paragraph', 'supercast'],
    color: 'from-purple-600/80 to-base-blue',
    accent: '#a855f7',
  },
  {
    day: 5,
    missionCode: 'MISSION-05',
    title: 'NFTs & Creators',
    subtitle: 'Collect something worth keeping',
    goal: 'Mint your first meaningful NFT, understand token standards, and explore the creator economy on Base.',
    tasks: [
      'Visit Mint.fun and browse active free mints on Base.',
      'Mint one free or very low-cost piece (under 0.001 ETH).',
      'Paint a pixel on Base Paint — the collaborative daily canvas.',
      'Explore Sound.xyz and listen to at least 5 onchain music tracks.',
      'View your NFT collection in your wallet or on OpenSea to confirm ownership.',
    ],
    warning: 'Minting every drop is not a strategy. Research the creator and verify the contract on BaseScan before paying for any NFT.',
    tools: ['Mint.fun', 'Base Paint', 'Sound.xyz', 'OpenSea'],
    toolIds: ['mint-fun', 'base-paints', 'sound-xyz', 'opensea-base'],
    color: 'from-pink-600/80 to-base-blue-lt',
    accent: '#ec4899',
  },
  {
    day: 6,
    missionCode: 'MISSION-06',
    title: 'Builder Path',
    subtitle: 'Start building — even if you are not a dev',
    goal: 'Take your first step into building on Base — from Base Account integration to a tested app or smart contract.',
    tasks: [
      'Open the current Base learning resources and choose the Apps or Chain path.',
      'Open Remix IDE and deploy the default Storage.sol to Base Sepolia testnet.',
      'Follow the Base App quickstart and run the wallet flow locally.',
      'Browse the current Base funding paths to understand what evidence gets rewarded.',
      'Write a public Farcaster cast or Paragraph post about what you want to build.',
    ],
    warning: 'Testnet funds have no value — always experiment on Base Sepolia before deploying to mainnet. Mainnet deployments cost real ETH.',
    tools: ['Base Learning Resources', 'Remix IDE', 'Base App Quickstart'],
    toolIds: ['base-camp', 'remix-ide', 'onchainkit'],
    color: 'from-street-amber/80 to-street-green/60',
    accent: '#ffaa00',
  },
  {
    day: 7,
    missionCode: 'MISSION-07',
    title: 'Rewards, Grants & Next Steps',
    subtitle: 'Map the rest of the territory',
    goal: 'Discover how to earn rewards for contributing to Base, apply for builder grants, and chart your personal roadmap forward.',
    tasks: [
      'Review the current Base App rewards and verification requirements.',
      'Review the current Base funding paths and assess which program matches your project.',
      'Join at least one Base-focused Farcaster channel aligned with your goal.',
      'Write a personal "onchain commit" post — what are you building next?',
      'Bookmark BaseCompass — come back when you discover new apps to explore.',
    ],
    warning: 'No grant program guarantees funding. Build first, apply second. Scam "grant programs" often ask for upfront fees — the real Base grants never do.',
    tools: ['Base Missions', 'Base Funding Paths', 'Farcaster'],
    toolIds: ['odyssey', 'base-grants', 'farcaster'],
    color: 'from-base-blue to-neon-cyan',
    accent: '#0052ff',
  },
];
