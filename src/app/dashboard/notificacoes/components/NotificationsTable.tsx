'use client';

import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Box, Pagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditNotificationModal from "./EditNotificationModal";
import dayjs from "dayjs";
import { reactQueryClient } from "@/providers/QueryClientProvider";
import DeleteNotificationModal from "./DeleteNotificationModal";

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
  const [totalPages, setTotalPages] = useState(0);
  const [editNotification, setEditNotification] = useState(null);
  const [deleteNotification, setDeleteNotification] = useState(null);


  const { data } = useQuery({
    queryKey: ['notifications', page],
    queryFn: () => ApiClient.get(`v1/contacts/notifications?page=${page}`).then(({data}) => {
      setTotalPages(data.last_page || 0)
      return data
    }),
    initialData: notifications,
  });

  const onDelete = () => {
    setDeleteNotification(null)
    reactQueryClient.invalidateQueries({
      queryKey: ['notifications', page]
    });
  }

  return (
    <Box>
      {deleteNotification !== null && <DeleteNotificationModal notification={deleteNotification} onDeleted={onDelete} onClose={() => setDeleteNotification(null)}  />}
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
                  <IconButton aria-label="delete" onClick={() => setDeleteNotification(notification)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      { totalPages > 1 && <Pagination sx={{ margin: '20px 0px'}} count={totalPages} variant="outlined" onChange={(_, value) => setPage(value)} />}
    </Box>

  );
}