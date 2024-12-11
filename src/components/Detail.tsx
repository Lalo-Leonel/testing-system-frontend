import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface DetailProps {
  open: boolean;
  onClose: () => void;
  testId: string | null;
}

interface TestDetails {
  _id: string;
  type: string;
  question: string;
  solution?: string;
  createdAt: string;
}

const Detail: React.FC<DetailProps> = ({ open, onClose, testId }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<TestDetails | null>(null);

  useEffect(() => {
    if (testId && open) {
      fetchDetails(testId);
    }
  }, [testId, open]);

  const fetchDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://testing-system-backend.vercel.app/api/test/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener detalles: ${response.statusText}`);
      }
      const result = await response.json();
      setDetails(result.data);
    } catch (error) {
      console.error("Error al cargar los detalles:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-modal>
      <DialogTitle component={"h2"}>DETALLES</DialogTitle>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </div>
      ) : details ? (
        <DialogContent>
          <Typography variant="h6">Tipo de Prueba:</Typography>
          <Typography variant="body1" gutterBottom>
            {details.type === "desarrollar"
              ? "Pregunta a desarrollar"
              : "Generación de código"}
          </Typography>

          <Typography variant="h6">Pregunta:</Typography>
          <Typography variant="body1" gutterBottom>
            {details.question}
          </Typography>

          {details.solution && (
            <>
              <Typography variant="h6">Solución:</Typography>
              <Typography variant="body1" gutterBottom>
                {details.solution}
              </Typography>
            </>
          )}

          <Typography variant="h6">Fecha de Creación:</Typography>
          <Typography variant="body1">
            {new Date(details.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </DialogContent>
      ) : (
        <Typography color="error" variant="body1">
          No se pudieron cargar los detalles.
        </Typography>
      )}
      <DialogActions>
        <Button
          onClick={onClose}
          style={{ backgroundColor: "#242424", color: "white" }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Detail;
