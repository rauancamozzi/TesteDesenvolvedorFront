import axios from 'axios';
import { Pokemon } from '../types/Pokemon';

export const getPokemons = async (limit: number = 100): Promise<Pokemon[]> => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: { limit }
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar os Pokémons", error);
    throw error;
  }
};

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter detalhes do Pokémon", error);
    throw error;
  }
};