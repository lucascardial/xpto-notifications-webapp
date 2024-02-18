import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import UploadCsvForm from "./forms/UploadCsvForm";
import ContactImporsTable from "./components/ContactImportsTable";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/contacts/imports`, { cache: 'no-store' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

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



export default NotificacaoPage;