export interface PokemonApi {
  id: number;
  name: string;
  comment: string;
  rating: 'like' | 'dislike' | null;
  githubID: string;
}