import { Drawer, Typography, IconButton, Box } from '@mui/material';
import Comment from '../components/Comment';
import CloseIcon from '@mui/icons-material/Close';
import { Pokemon } from '../types/Pokemon';

interface PokemonDrawerProps {
  open: boolean;
  onClose: () => void;
  rowData: Pokemon | null;
}

const PokemonDrawer: React.FC<PokemonDrawerProps> = ({ open, onClose, rowData }) => {
  if (!rowData) {
    return null;
  }

  const getPokemonAbilities = () => {
    const abilities = rowData.abilities.map((ability) => {
      return ability.ability.name;
    });
    
    return abilities.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
  }

  const getPokemonTypes = () => {
    const types = rowData.types.map((type) => {
      return type.type.name;
    });

    return types.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
  }

  const handleCommentSubmit = (comment: string) => {
    // Aqui você pode enviar o comentário para o servidor ou exibi-lo na tela
    console.log("Comentário enviado:", comment);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
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
      <Box
        display="flex"
        flexDirection="column"
      >
        <img src={rowData.sprites.other['official-artwork'].front_default} alt={rowData.name} width="300px" />
        <Typography>Nome: {rowData.name}</Typography>
        <Typography>Altura: {rowData.height / 10} m</Typography>
        <Typography>Peso: {rowData.weight / 10} kg</Typography>
        <Typography>Habilidades: {getPokemonAbilities()}</Typography>
        <Typography>Tipos: {getPokemonTypes()}</Typography>
        <Typography>Experiência base: {rowData.base_experience}</Typography>
      </Box>

      <Comment onSubmit={handleCommentSubmit} />
    </Drawer>
  )
}

export default PokemonDrawer;