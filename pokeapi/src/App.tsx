import "./App.css";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PokemonDataGrid from "./components/PokemonDataGrid";

function App() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: "#f9fafb"
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <PokemonDataGrid />
        </Container>
      </Box>
    </>
  );
}

export default App;
