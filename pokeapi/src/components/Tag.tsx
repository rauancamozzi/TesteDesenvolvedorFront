import { Chip } from "@mui/material";

interface TagProps {
  value: string | null;
}

const Tag: React.FC<TagProps> = ({ value }) => {
  const getTagLabel = () => {
    switch (value) {
        case "bug":
            return "Inseto";
        case "dark":
            return "Sombrio";
        case "dragon":
            return "Dragão";
        case "electric":
            return "Elétrico";
        case "fairy":
            return "Fada";
        case "flying":
            return "Voador"
        case "fighting":
            return "Lutador";
        case "fire":
            return "Fogo";
        case "ghost":
            return "Fantasma";
        case "grass":
            return "Planta";
        case "ground":
            return "Terrestre";
        case "ice":
            return "Gelo";
        case "normal":
            return "Normal";
        case "poison":
            return "Venenoso";
        case "psychic":
            return "Psíquico";
        case "rock":
            return "Rocha";
        case "steel":
            return "Aço";
        case "water":
            return "Água";
        default:
            return "Tipo desconhecido";
    }
  };

  const getTagBackground = () => {
    switch (value) {
      case "bug":
        return "#14532d";
      case "dark":
        return "#09090b";
      case "dragon":
        return "#115e59";
      case "electric":
        return "#ca8a04";
      case "fairy":
        return "#be185d";
      case "flying":
          return "#075985"
      case "fighting":
        return "#3730a3";
      case "fire":
        return "#991b1b";
      case "ghost":
        return "#475569";
      case "grass":
        return "#3f6212";
      case "ground":
        return "#431407";
      case "ice":
        return "#0891b2";
      case "normal":
        return "#78716c";
      case "poison":
        return "#65a30d";
      case "psychic":
        return "#ec4899";
      case "rock":
        return "#404040";
      case "steel":
        return "#94a3b8";
      case "water":
        return "#3b82f6";
    }
  }

  return (
    <Chip
      label={getTagLabel()}
      sx={{
        backgroundColor: getTagBackground(),
        color: '#e5e7eb',
      }}
    />
  );
};

export default Tag;
