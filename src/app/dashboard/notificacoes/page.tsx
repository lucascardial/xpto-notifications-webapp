import { Container, Typography } from "@mui/material";
import NotificationsTable from "./components/NotificationsTable";

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/api/v1/contacts/notifications', { cache: 'no-store' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function NotificacoesPage() {
  const notifications = await getData();
  return (
    <Container>
      <Typography variant="h4">
        Notificações
      </Typography>
      <Typography>Todas as notificações ainda pendentes</Typography>
      <br/>
      <NotificationsTable notifications={notifications} />
    </Container>
  );
}