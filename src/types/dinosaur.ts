export interface DinosaurImage {
  id: string;
  dinosaur_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface DinosaurArticle {
  id: string;
  dinosaur_id: string;
  url: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Dinosaur {
  id: string;
  name: string;
  taxon: string;
  period_start: string | null;
  period_end: string | null;
  period_start_human_readable: string | null;
  period_start_years_ago: number | null;
  period_start_period: string | null;
  period_end_human_readable: string | null;
  period_end_years_ago: number | null;
  period_end_period: string | null;
  size_comparison: string | null;
  wikidata_entry: string | null;
  wikipedia_entry: string | null;
  created_at: string;
  updated_at: string;
  images: DinosaurImage[];
  articles: DinosaurArticle[];
}
