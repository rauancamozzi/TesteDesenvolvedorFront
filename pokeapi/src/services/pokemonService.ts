import axios from 'axios';
import { Pokemon } from '../types/Pokemon';

export const fetchPokemons = async (limit: number = 100): Promise<Pokemon[]> => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: { limit }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemons", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string): Promise<Pokemon> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon details", error);
    throw error;
  }
};