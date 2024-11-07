import { Drawer, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Pokemon } from '../types/Pokemon';
import React, { useEffect, useState } from 'react';
import api from '../api';
import LikeDislikeButton from './LikeDislikeButton';
import Comment from '../components/Comment';

interface PokemonDrawerProps {
  open: boolean;
  onClose: () => void;
  rowData: Pokemon | null;
}

interface PokemonApi {
  id: number;
  name: string;
  comment: string;
  rating: 'like' | 'dislike' | null;
  githubID: string;
}

const PokemonDrawer: React.FC<PokemonDrawerProps> = ({ open, onClose, rowData }) => {
  const [userChoice, setUserChoice] = useState<'like' | 'dislike' | null>(null);
  const [comment, setComment] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonApi[]>([]);
  
  
  useEffect(() => {
    loadPokemons();
  }, []);

  const getPokemonAbilities = () => {
    const abilities = rowData?.abilities.map((ability) => {
      return ability.ability.name;
    });
    
    return abilities?.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
  }

  const getPokemonTypes = () => {
    const types = rowData?.types.map((type) => {
      return type.type.name;
    });

    return types?.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
  }

  const loadPokemons = async () => {
    const response = await api.get<PokemonApi[]>('/pokemons');
    setPokemons(response.data);
  }

  const handleUserComment = (comment: string) => {
    addPokemon(comment);
  }

  const handleUserChoice = (choice: 'like' | 'dislike' | null) => {
    setUserChoice(choice);
  }

  const addPokemon = async (comment: string) => {
    const newPokemon = {
      id: rowData?.id,
      name: rowData?.name,
      comment: comment,
      rating: userChoice,
      githubID: "rauancamozzi"
    }

    const response = await api.post<PokemonApi>('/pokemons', newPokemon);
    setPokemons([...pokemons, response.data]);
  }

  if (!rowData) {
    return null;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="12px"
        width="50vw"
      >
        <Typography variant="h6">Pokémon</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column">
        <img
          src={rowData.sprites.other["official-artwork"].front_default}
          alt={rowData.name}
          width="300px"
        />
        <Typography>Nome: {rowData.name}</Typography>
        <Typography>Altura: {rowData.height / 10} m</Typography>
        <Typography>Peso: {rowData.weight / 10} kg</Typography>
        <Typography>Habilidades: {getPokemonAbilities()}</Typography>
        <Typography>Tipos: {getPokemonTypes()}</Typography>
        <Typography>Experiência base: {rowData.base_experience}</Typography>
      </Box>

      <Comment onSubmit={handleUserComment} />

      <LikeDislikeButton onChoice={handleUserChoice} />
    </Drawer>
  );
}

export default PokemonDrawer;