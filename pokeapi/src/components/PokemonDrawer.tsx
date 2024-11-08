import { Drawer, Typography, IconButton, Box, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemon } from "../types/Pokemon";
import React, { useEffect, useState } from "react";
import api from "../api";
import LikeDislikeButton from "./LikeDislikeButton";
import Comment from "../components/Comment";
import Tag from "./Tag";
import formatPokemonName from "../utils/formatPokemonName";
import formatPokemonAbilityName from "../utils/formatPokemonAbilityName";
import Card from "./Card";
import Title from "./Title";

interface PokemonDrawerProps {
  open: boolean;
  onClose: () => void;
  rowData: Pokemon | null;
}

interface PokemonApi {
  id: number;
  name: string;
  comment: string;
  rating: "like" | "dislike" | null;
  githubID: string;
}

const PokemonDrawer: React.FC<PokemonDrawerProps> = ({
  open,
  onClose,
  rowData,
}) => {
  const [userChoice, setUserChoice] = useState<"like" | "dislike" | null>(null);
  const [pokemons, setPokemons] = useState<PokemonApi[]>([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadPokemons();
  }, []);

  const getPokemonAbilities = () => {
    const abilities = rowData?.abilities.map((item) => {
      return item.ability.name;
    });

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {abilities?.map((item, index) => (
          <Typography key={index}>{formatPokemonAbilityName(item)}</Typography>
        ))}
      </Box>
    );
  };

  const getPokemonTypes = () => {
    return rowData?.types.map((value: string, index: number) => {
      return <Tag value={value} key={index} />;
    });
  };

  const loadPokemons = async () => {
    const response = await api.get<PokemonApi[]>("/pokemons");
    setPokemons(response.data);
  };

  const updateUserComment = (comment: string) => {
    addPokemon(comment);
  };

  const updateUserChoice = (choice: "like" | "dislike" | null) => {
    setUserChoice(choice);
  };

  const addPokemon = async (comment: string) => {
    const newPokemon = {
      id: rowData?.id,
      name: rowData?.name,
      comment: comment,
      rating: userChoice,
      githubID: "rauancamozzi",
    };

    const response = await api.post<PokemonApi>("/pokemons", newPokemon);
    setPokemons([...pokemons, response.data]);
  };

  if (!rowData) {
    return null;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "16px",
          backgroundColor: "#f9fafb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#4b5563",
            }}
          >
            Nº {rowData.id}
          </Typography>
          <Title text={formatPokemonName(rowData.name)} type="title" />
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? 'column-reverse' : 'none',
          width: "100%",
          height: "auto",
          padding: "12px",
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'none',
            width: isMobile ? '100%' : '50%',
            gap: isMobile ? '4px' : '12px',
          }}
        >
          <Card title="Altura" text={`${rowData.height / 10}m`} />
          <Card title="Peso" text={`${rowData.weight / 10}kg`} />
          <Card title="Experiência base" text={`${rowData.base_experience} XP`} />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
              border: "solid 1px",
              borderColor: "#e5e7eb",
            }}
          >
            <img
              src={rowData.sprites.other["official-artwork"].front_default}
              alt={rowData.name}
              width="100%"
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? 'center' : 'none',
          gap: "8px",
          backgroundColor: "#f9fafb",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              boxSizing: 'border-box',
              width: isMobile ? '100%' : 'auto',
              flex: 1,
              padding: '12px'
            }}
          >
            <Title text="Tipos" type="subtitle" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: '8px',
                marginTop: '8px'
              }}
            >
              {getPokemonTypes()}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              boxSizing: 'border-box',
              width: isMobile ? '100%' : 'auto',
              flex: 1,
              padding: '12px'
            }}
          >
            <Title text="Habilidades" type="subtitle" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: '8px'
              }}
            >
              {getPokemonAbilities()}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxSizing: 'border-box',
            width: '100%',
            padding: "12px",
          }}
        >
          <Title text="Avalie o Pokémon" type="subtitle" />
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: "flex-start",
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <LikeDislikeButton onChoice={updateUserChoice} />
            <Comment onSubmit={updateUserComment} />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PokemonDrawer;
