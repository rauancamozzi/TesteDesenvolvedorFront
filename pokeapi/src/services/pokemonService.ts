import axios from 'axios';
import { Pokemon, PokemonDetails } from '../types/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (limit: number = 100): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit }
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemons", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon details", error);
    throw error;
  }
};