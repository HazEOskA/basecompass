import { App } from '../data/apps';

export interface FilterState {
  search: string;
  category: string;
  level: string;
  risk: string;
  sort: string;
}

export function filterApps(apps: App[], filters: FilterState): App[] {
  const { search, category, level, risk } = filters;

  return apps.filter(app => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.tags.some(t => t.toLowerCase().includes(q));

    const matchesCategory = !category || app.category === category;
    const matchesLevel    = !level    || app.beginnerLevel === level;
    const matchesRisk     = !risk     || app.riskLevel === risk;

    return matchesSearch && matchesCategory && matchesLevel && matchesRisk;
  });
}

export function sortApps(apps: App[], sort: string): App[] {
  switch (sort) {
    case 'score-desc': return [...apps].sort((a, b) => b.beginnerScore - a.beginnerScore);
    case 'score-asc':  return [...apps].sort((a, b) => a.beginnerScore - b.beginnerScore);
    case 'name':       return [...apps].sort((a, b) => a.name.localeCompare(b.name));
    case 'risk-low':   return [...apps].sort((a, b) => {
      const order = { Low: 0, Medium: 1, High: 2 };
      return order[a.riskLevel] - order[b.riskLevel];
    });
    default: return apps;
  }
}
