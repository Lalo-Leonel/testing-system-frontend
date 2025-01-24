import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
      <Route path="/" element={<App />} />
      </Routes>
    </ThemeProvider>
  </StrictMode>,
  </BrowserRouter>
)
