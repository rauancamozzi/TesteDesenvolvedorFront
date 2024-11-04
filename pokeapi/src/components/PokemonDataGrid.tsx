import React, { useEffect, useState } from 'react';
import { fetchPokemons, fetchPokemonDetails  } from '../services/pokemonService';
import { Pokemon, PokemonDetails  } from '../types/Pokemon';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'imageAndName',
    headerName: 'Pokémon',
    width: 200,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={params.row.image as string}
          alt={params.row.name as string}
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <span>{params.row.name}</span>
      </div>
    ),
  },
];

const PokemonDataGrid = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemons(100);
        setPokemons(data);

        const details = await Promise.all(
          data.map((pokemon) => fetchPokemonDetails(pokemon.url))
        );
        setPokemonDetails(details);
      } catch (error) {
        setError("Failed to fetch pokemons: " + error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const rows = pokemonDetails.map((details) => ({
    id: details.id,
    image: details.sprites.front_default,
    name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
  }));

  return (
    <Box sx={{ height: "auto", width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default PokemonDataGrid;