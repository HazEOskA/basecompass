export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-street-green';
  if (score >= 70) return 'text-neon-cyan';
  if (score >= 55) return 'text-street-amber';
  return 'text-street-red';
}

export function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-street-green/15 border-street-green/30 text-street-green';
  if (score >= 70) return 'bg-neon-cyan/15 border-neon-cyan/30 text-neon-cyan';
  if (score >= 55) return 'bg-street-amber/15 border-street-amber/30 text-street-amber';
  return 'bg-street-red/15 border-street-red/30 text-street-red';
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Beginner Friendly';
  if (score >= 70) return 'Accessible';
  if (score >= 55) return 'Moderate';
  return 'Advanced';
}

export function getRiskColor(risk: 'Low' | 'Medium' | 'High'): string {
  switch (risk) {
    case 'Low':    return 'bg-street-green/15 border-street-green/30 text-street-green';
    case 'Medium': return 'bg-street-amber/15 border-street-amber/30 text-street-amber';
    case 'High':   return 'bg-street-red/15 border-street-red/30 text-street-red';
  }
}

export function getLevelColor(level: 'Easy' | 'Medium' | 'Advanced'): string {
  switch (level) {
    case 'Easy':     return 'bg-base-blue/15 border-base-blue/30 text-base-blue-lt';
    case 'Medium':   return 'bg-neon-cyan/15 border-neon-cyan/30 text-neon-cyan';
    case 'Advanced': return 'bg-purple-500/15 border-purple-500/30 text-purple-400';
  }
}

export function scoreBarWidth(score: number): string {
  return `${score}%`;
}
