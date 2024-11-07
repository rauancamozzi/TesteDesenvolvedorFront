import { Drawer, Typography, IconButton, Box, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemon } from "../types/Pokemon";
import React, { useEffect, useState } from "react";
import api from "../api";
import LikeDislikeButton from "./LikeDislikeButton";
import Comment from "../components/Comment";

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

  useEffect(() => {
    loadPokemons();
  }, []);
  const getPokemonAbilities = () => {
    const abilities = rowData?.abilities.map((item) => {
      return item.ability.name;
    });

    return abilities
      ?.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(", ");
  };

  const getPokemonTypes = () => {
    return rowData?.types.map((value: string, index: number) => {
      return <Chip key={index} label={value} style={{ margin: 2 }} />
    });
  };

  const loadPokemons = async () => {
    const response = await api.get<PokemonApi[]>("/pokemons");
    setPokemons(response.data);
  };

  const handleUserComment = (comment: string) => {
    addPokemon(comment);
  };

  const handleUserChoice = (choice: "like" | "dislike" | null) => {
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
          backgroundColor: "#f9fafb"
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
            }}
          >
            Nº {rowData.id}
          </Typography>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {rowData.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          // backgroundColor: { xs: 'red', sm: 'blue', md: 'purple' },
          height: "auto",
          padding: "12px",
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
          gap: "16px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              borderRadius: "16px",
              flex: 1,
              backgroundColor: "#f3f4f6",
              border: "solid 1px",
              borderColor: "#e5e7eb",
            }}
          >
            <Typography>Altura</Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {rowData.height / 10} m
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              borderRadius: "16px",
              flex: 1,
              backgroundColor: "#f3f4f6",
              border: "solid 1px",
              borderColor: "#e5e7eb",
            }}
          >
            <Typography>Peso</Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >{rowData.weight / 10} kg</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              borderRadius: "16px",
              flex: 1,
              backgroundColor: "#f3f4f6",
              border: "solid 1px",
              borderColor: "#e5e7eb",
            }}
          >
            <Typography>Experiência base</Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >{rowData.base_experience} xp</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              borderRadius: "16px",
              flex: 1,
              backgroundColor: "#f3f4f6",
              border: "solid 1px",
              borderColor: "#e5e7eb",
            }}
          >
            <Typography>Habilidades</Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >{getPokemonAbilities()}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "75%",
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
              border: "solid 1px",
              borderColor: "#e5e7eb"
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
          justifyContent: "space-around",
          gap: "8px",
          backgroundColor: "#f9fafb",
          height: "100%"
        }}
      >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >Tipos</Typography>
        <div>{getPokemonTypes()}</div>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >Avalie o Pokémon</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <LikeDislikeButton onChoice={handleUserChoice} />
          <Comment onSubmit={handleUserComment} />
        </Box>
      </Box>
      </Box>
    </Drawer>
  );
};

export default PokemonDrawer;
