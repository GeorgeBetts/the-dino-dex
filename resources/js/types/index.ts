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
    title: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface Dinosaur {
    id: string;
    name: string;
    taxon: string;
    period_start: string;
    period_end: string;
    size_comparison: string | null;
    wikidata_entry: string;
    wikipedia_entry: string;
    created_at: string;
    updated_at: string;
    images: DinosaurImage[];
    articles: DinosaurArticle[];
    period_start_human_readable: string;
    period_start_years_ago: number;
    period_start_period: string;
    period_end_human_readable: string;
    period_end_years_ago: number;
    period_end_period: string;
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationLinkItem {
    url: string | null;
    label: string;
    page?: number | null;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLinkItem[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface APIResponse<T> {
    data: T;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
    links: PaginationLinks;
    meta: PaginationMeta;
}
