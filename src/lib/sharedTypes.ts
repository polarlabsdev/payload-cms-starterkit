import { Metadata } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export type NextPageProps<T> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type NextMetadataFunc<T> = (args: NextPageProps<T>) => Promise<Metadata>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextRouteHandler<T = {}> = (
  req: NextRequest,
  context: { params: Promise<T> },
) => Promise<NextResponse> | NextResponse;

export interface SearchResult {
  id: string | number;
  title: string;
  slug: string;
  type: 'pages' | 'stories';
  summary?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  error?: string;
}

export interface SuggestionResult {
  title: string;
  url: string;
  source: 'page' | 'story';
}

export interface SuggestionsResponse {
  suggestions: SuggestionResult[];
  error?: string;
}
