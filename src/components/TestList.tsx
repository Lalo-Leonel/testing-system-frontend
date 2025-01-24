import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { OpenInNew } from "@mui/icons-material";
import Detail from "./Detail";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242424",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Test {
  _id: string;
  type: string;
  question: string;
  solution?: string;
  createdAt: string;
}

interface TestListProps {
  tests: Test[];
  loading: boolean;
}

const TestList: React.FC<TestListProps> = ({ tests, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setSelectedTest(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedTest(null);
    setOpen(false);
  };

  return (
    <div style={{ marginTop: 5 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nro</StyledTableCell>
              <StyledTableCell align="center">Tipo de prueba</StyledTableCell>
              <StyledTableCell align="center">Pregunta</StyledTableCell>
              <StyledTableCell align="center">Detalles</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
              <CircularProgress />
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            <>
              {tests.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    colSpan={4}
                    style={{ textAlign: "center" }}
                  >
                    Aún no ha registrado ninguna pregunta
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                <>
                  {tests
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((row, index) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.type === "desarrollar"
                            ? "Pregunta a desarrollar"
                            : "Generación de código"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.question}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Tooltip title="Detalles">
                            <IconButton
                              style={{ padding: 1 }}
                              onClick={() => handleOpenDialog(row._id)}
                            >
                              <OpenInNew />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </>
              )}
            </>
          )}
          </TableBody>
        </Table>
      </TableContainer>
      <Detail open={open} onClose={handleCloseDialog} testId={selectedTest} />
    </div>
  );
};

export default TestList;
