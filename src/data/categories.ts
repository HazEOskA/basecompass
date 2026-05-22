export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  glowColor: string;
  count?: number;
}

export const categoryList: Category[] = [
  {
    id: 'DeFi',
    name: 'DeFi',
    emoji: '⚡',
    description: 'Decentralized exchanges, lending protocols, and yield strategies.',
    color: 'text-base-blue border-base-blue/40 bg-base-blue/10',
    glowColor: 'rgba(0,82,255,0.3)',
  },
  {
    id: 'Social',
    name: 'Social',
    emoji: '🔗',
    description: 'Onchain social protocols, publishing platforms, and communities.',
    color: 'text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10',
    glowColor: 'rgba(0,212,255,0.3)',
  },
  {
    id: 'NFT / Creator',
    name: 'NFT / Creator',
    emoji: '🎨',
    description: 'NFT marketplaces, minting platforms, and creator tools.',
    color: 'text-pink-400 border-pink-400/40 bg-pink-400/10',
    glowColor: 'rgba(236,72,153,0.3)',
  },
  {
    id: 'Games',
    name: 'Games',
    emoji: '🎮',
    description: 'Onchain games, competitions, and interactive experiences.',
    color: 'text-street-green border-street-green/40 bg-street-green/10',
    glowColor: 'rgba(0,255,136,0.3)',
  },
  {
    id: 'Wallets',
    name: 'Wallets',
    emoji: '🔐',
    description: 'Self-custody wallets, smart accounts, and signers.',
    color: 'text-street-amber border-street-amber/40 bg-street-amber/10',
    glowColor: 'rgba(255,170,0,0.3)',
  },
  {
    id: 'Tools',
    name: 'Tools',
    emoji: '🛠',
    description: 'Block explorers, analytics dashboards, and safety utilities.',
    color: 'text-txt-secondary border-txt-secondary/40 bg-txt-secondary/10',
    glowColor: 'rgba(138,150,176,0.3)',
  },
  {
    id: 'Learn',
    name: 'Learn',
    emoji: '📡',
    description: 'Courses, tutorials, and guided paths into the Base ecosystem.',
    color: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    glowColor: 'rgba(168,85,247,0.3)',
  },
  {
    id: 'Builders',
    name: 'Builders',
    emoji: '⚙️',
    description: 'Developer tools, SDKs, frameworks, and builder programs.',
    color: 'text-base-blue-lt border-base-blue-lt/40 bg-base-blue-lt/10',
    glowColor: 'rgba(51,116,255,0.3)',
  },
];

export const getCategoryStyle = (categoryId: string): Category =>
  categoryList.find(c => c.id === categoryId) ?? categoryList[0];
