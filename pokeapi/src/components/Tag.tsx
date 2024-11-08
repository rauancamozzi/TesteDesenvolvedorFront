import { Chip } from '@mui/material';

interface TagProps {
  value: string | null;
}

const Tag: React.FC<TagProps> = ({ value }) => {
  const getTagBackground = () => {
    switch (value) {
      case 'Inseto':
        return '#14532d';
      case 'Sombrio':
        return '#09090b';
      case 'Dragão':
        return '#115e59';
      case 'Elétrico':
        return '#ca8a04';
      case 'Fada':
        return '#be185d';
      case 'Voador':
          return '#075985'
      case 'Lutador':
        return '#3730a3';
      case 'Fogo':
        return '#991b1b';
      case 'Fantasma':
        return '#475569';
      case 'Planta':
        return '#3f6212';
      case 'Terrestre':
        return '#431407';
      case 'Gelo':
        return '#0891b2';
      case 'Normal':
        return '#78716c';
      case 'Venenoso':
        return '#65a30d';
      case 'Psíquico':
        return '#ec4899';
      case 'Rocha':
        return '#404040';
      case 'Aço':
        return '#94a3b8';
      case 'Água':
        return '#3b82f6';
    }
  }

  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: getTagBackground(),
        color: '#e5e7eb',
      }}
    />
  );
};

export default Tag;
