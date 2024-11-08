import { Typography } from "@mui/material";

interface TitleProps {
  text: string;
  type: string;
}

const Title: React.FC<TitleProps> = ({ text, type }) => {
  const setFontSize = () => {
    if (type === 'title') return '2rem';
    if (type === 'subtitle') return '1.25rem';
  }
  
  return (
    <Typography
      sx={{
        fontSize: setFontSize(),
        fontWeight: "bold",
        color: "#374151",
      }}
    >
      {text}
    </Typography>
  );
};

export default Title;