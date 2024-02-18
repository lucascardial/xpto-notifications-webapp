import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import UploadCsvForm from "./forms/UploadCsvForm";
import ContactImporsTable from "./components/ContactImportsTable";

const importacoes = [
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 1',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 2',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 3',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 4',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 5',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 6',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 7',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 8',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 9',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  },
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'Importação 10',
    status: 'Concluída',
    date: '18/02/2024 14:00'
  }
];

const NotificacaoPage = async() => {
  const contactImports = await getData();
    return (
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4">Importações</Typography>
            <UploadCsvForm />
          </Box>
          <Box sx={{ marginTop: '40px'}}>
            <ContactImporsTable data={contactImports} />
          </Box>
        </Container>
    );
}
async function getData() {
  const res = await fetch('http://127.0.0.1:8000/api/v1/contacts/imports', { cache: 'no-store' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default NotificacaoPage;