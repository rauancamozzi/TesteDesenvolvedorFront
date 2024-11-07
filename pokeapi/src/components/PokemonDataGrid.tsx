import React, { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../services/pokemonService";
import { Pokemon } from "../types/Pokemon";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PokemonDrawer from "./PokemonDrawer";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import { Chip } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "imageAndName",
    headerName: "Pokémon",
    width: 300,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center'}}>
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

      return (row1?.name || "").localeCompare(row2?.name || "");
    },
  },
  {
    field: 'types',
    headerName: 'Tipos',
    width: 300,
    renderCell: (params) => (
      <div>
        {params.value.map((tag: string, index: number) => (
          <Chip key={index} label={tag} style={{ margin: 2 }} />
        ))}
      </div>
    ),
  },
];

const PokemonDataGrid = () => {
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
        const data = await getPokemons();
        setPokemons(data);

        const details = await Promise.all(
          data.map((pokemon) => getPokemonDetails(pokemon.name))
        );
        setPokemonDetails(details);
      } catch (error) {
        setError('Falha ao buscar Pokémons: ' + error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  if (loading) return <CircularProgress
    sx={{
      color: "#71717a"
    }}
  />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const rows = pokemonDetails.map((details) => ({
    ...details,
    id: details.id,
    image: details.sprites.other["official-artwork"].front_default || "",
    name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
    types: details.types.map((item) => {
      return item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)
    }),
  }));

  const onClickRow = (params: { row: Pokemon }) => {
    setSelectedRow(params.row);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
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
        onRowClick={onClickRow}
        sx={{ 
          cursor: 'pointer', 
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          borderColor: '#d1d5db',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f3f4f6',
            color: '#71717a'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold', 
          },
          '& .MuiDataGrid-filler': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: "#d1d5db"
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: "none",
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-visible': {
            outline: 'none',
          }
        }}
      />
      <PokemonDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        rowData={selectedRow}
      />
    </Box>
  );
};

export default PokemonDataGrid;
