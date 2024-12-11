import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TestList from './components/TestList';
import { Box, Button } from '@mui/material';
import FormDialog from './components/Form';

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://testing-system-backend.vercel.app/api/test");
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }
      const result = await response.json();
      setTests(result.data);
    } catch (error) {
      alert("ocurrio un error inesperado a listar las pruebas");
    }
  };

  const handleOpenDialog = () => {
    setOpenForm(true);
  };

  const handleCloseDialog = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Navbar />
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: { xs: 2, sm: 5, md: 10 }
  }}
>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div></div>
          <Button
            style={{ backgroundColor: "#242424", color: "white", minWidth: 150 }}
            onClick={handleOpenDialog}
          >
            NUEVO
          </Button>
        </div>
        <TestList tests={tests} />
      </Box>
      <FormDialog open={openForm} onClose={handleCloseDialog} refreshTests={fetchData} />
    </>
  );
}

export default App;
