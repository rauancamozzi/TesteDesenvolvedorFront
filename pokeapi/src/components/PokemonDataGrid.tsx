import { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetails } from '../services/pokemonService';
import { Pokemon } from '../types/Pokemon';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import PokemonDrawer from './PokemonDrawer';
import Tag from './Tag';
import formatPokemonName from '../utils/formatPokemonName';
import { TextField, Alert, Box } from '@mui/material';
import translateTypes from '../utils/translateTypes';
import Title from './Title';

interface Row {
  id: number;
  name: string;
  types: string[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'image',
    headerName: 'Imagem',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value as string}
        alt={params.row.name as string}
        style={{ width: '50px', height: '50px' }}
      />
    ),
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
    renderCell: (params) => (
      <span style={{ color: '#030712' }}>{params.value}</span>
    ),
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: 'types',
    headerName: 'Tipos',
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
          gap: '4px',
        }}
      >
        {params.value.map((value: string, index: number) => (
          <Tag value={value} key={index} />
        ))}
      </Box>
    ),
  },
];

const PokemonDataGrid = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Pokemon | null>(null);

  const [searchText, setSearchText] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<Row[]>([]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [totalPokemons, setTotalPokemons] = useState<number>(0);

  useEffect(() => {
    const loadPokemons = async () => {
      const offset = paginationModel.page * paginationModel.pageSize;
      const limit = paginationModel.pageSize;
      setLoading(true);

      try {
        const data = await getPokemons(offset, limit);

        const details = await Promise.all(
          data.map((pokemon) => getPokemonDetails(pokemon.name))
        );
        setPokemons(details);
        setTotalPokemons(1032);
      } catch (error) {
        setError('Falha ao buscar Pokémons: ' + error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [paginationModel]);

  useEffect(() => {
    const rows = pokemons.map((details) => ({
      ...details,
      id: details.id,
      image: details.sprites.other['official-artwork'].front_default || '',
      name: formatPokemonName(
        details.name.charAt(0).toUpperCase() + details.name.slice(1)
      ),
      types: translateTypes(details.types.map((item) => item.type.name)),
    }));

    const filteredData = rows.filter((row) => {
      const search = searchText.toLowerCase();

      const id = row.id.toString().includes(search);
      const name = row.name.toLowerCase().includes(search);
      const type = row.types
        .map((type: string) => type.toLowerCase())
        .some((type: string) => type.includes(search));

      return name || id || type;
    });

    setFilteredRows(filteredData);
  }, [pokemons, searchText]);
    
  if (error) return <Alert severity='error'>{error}</Alert>;

  const onClickRow = (params: { row: Pokemon }) => {
    setSelectedRow(params.row);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Title text='Pokédex' type='title' />
      </header>

      <TextField
        label='Buscar Pokémon'
        variant='outlined'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1f2937',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9ca3af',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1f2937',
          },
        }}
      />

      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationMode="server"
        rowCount={totalPokemons}
        paginationModel={paginationModel}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        onRowClick={onClickRow}
        loading={loading}
        sx={{
          cursor: 'pointer',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          borderColor: '#d1d5db',
          height: 'auto', // Define a altura fixa para permitir rolagem
          overflow: 'auto', // Habilita o overflow
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f3f4f6',
            color: '#71717a',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-filler': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: '#d1d5db',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-visible': {
            outline: 'none',
          },
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