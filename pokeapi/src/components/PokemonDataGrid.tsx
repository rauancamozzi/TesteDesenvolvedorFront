import React, { useEffect, useState } from 'react';
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonService';
import { Pokemon  } from '../types/Pokemon';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PokemonDrawer from './PokemonDrawer';

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
    sortComparator: (v1, v2, param1, param2) => {
      const row1 = param1.api.getRow(param1.id);
      const row2 = param2.api.getRow(param2.id);

      return (row1?.name || '').localeCompare(row2?.name || '');
    },
  },
];

const DataGridComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Pokemon | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemons();
        setPokemons(data);

        const details = await Promise.all(
          data.map((pokemon) => fetchPokemonDetails(pokemon.name))
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
    ...details,
    id: details.id,
    image: details.sprites.other['official-artwork'].front_default || '',
    name: details.name.charAt(0).toUpperCase() + details.name.slice(1)
  }));

  const handleRowClick = (params: { row: Pokemon }) => {
    setSelectedRow(params.row);
    setDrawerOpen(true); 
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

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
        onRowClick={handleRowClick}
        sx={{ cursor: 'pointer' }}
      />
      <PokemonDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        rowData={selectedRow}
      />
    </Box>
  );
}

export default DataGridComponent;