import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  
  interface FormDialogProps {
    open: boolean;
    onClose: () => void;
    refreshTests: () => void;
  }
  
  const FormDialog: React.FC<FormDialogProps> = ({ open, onClose, refreshTests }) => {
    const [type, setType] = useState("desarrollar");
  
    const handleChange = (event: SelectChangeEvent) => {
      setType(event.target.value);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const payload = {
        type,
        question: formJson.question,
        solution: formJson.solution || null,
      };
  
      try {
        const response = await fetch("https://testing-system-backend.vercel.app/api/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const result = await response.json();
        alert(result.message);
  
        refreshTests(); 
        onClose(); 
      } catch (error) {
        alert("Ocurrió un error inesperado");
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Nueva Prueba Técnica</DialogTitle>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={type}
              onChange={handleChange}
              label="Tipo de prueba"
            >
              <MenuItem value="desarrollar">Pregunta a desarrollar</MenuItem>
              <MenuItem value="generar">Generación de código</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            id="question"
            name="question"
            label="Pregunta"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required={type === "generar"}
            margin="dense"
            id="solution"
            name="solution"
            label="Solución"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{
              border: "1px solid #242424",
              borderRadius: "5px",
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "#242424", color: "white" }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default FormDialog;
  