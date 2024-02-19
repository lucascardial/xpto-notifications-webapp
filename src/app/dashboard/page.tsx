import { Box, Container, Typography } from "@mui/material"
import UploadCsvForm from "./forms/UploadCsvForm";
import ContactImporsTable from "./components/ContactImportsTable";

export const dynamic = "force-dynamic";


async function getData() {
  const res = await fetch(`${process.env.SRV_API_URL}/v1/contacts/imports`, { cache: 'no-store' })
 
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