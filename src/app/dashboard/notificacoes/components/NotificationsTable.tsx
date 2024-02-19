'use client';

import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Box, Pagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditNotificationModal from "./EditNotificationModal";
import dayjs from "dayjs";

type Notification = {
  id: string;
  message: string;
  date: string;
};

type NotificationsTableProps = {
  notifications: Notification[];
};

export default function NotificationsTable({ notifications }: NotificationsTableProps) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editNotification, setEditNotification] = useState(null);


  const { data } = useQuery({
    queryKey: ['notifications', page],
    queryFn: () => ApiClient.get(`v1/contacts/notifications?page=${page}`).then(({data}) => {
      setTotalPages(data.last_page)
      return data
    }),
    initialData: notifications,
  });
  

  return (
    <Box>
      {editNotification !== null && <EditNotificationModal onClose={() => setEditNotification(null)} notification={editNotification} />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Canal</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Mensagem</TableCell>
              <TableCell>Agendado P/</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((notification: any) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.channel}</TableCell>
                <TableCell>{notification.contact}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: notification.content}}></div>
                </TableCell>
                <TableCell>{dayjs(notification.schedule_date).format('DD/MM/YY HH:mm')}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditNotification(notification)}>Editar</Button>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination sx={{ margin: '20px 0px'}} count={totalPages} variant="outlined" onChange={(_, value) => setPage(value)} />
    </Box>

  );
}