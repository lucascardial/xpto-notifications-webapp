'use client';

import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Box, Pagination, FormControl, Select, MenuItem, InputLabel, Divider, SelectChangeEvent } from "@mui/material";
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
  const [statusFilter, setStatusFilter] = useState<any>('pending');

  const statuses = [
    { value: 'pending', label: 'Pendente' },
    { value: 'sent', label: 'Enviado' },
    { value: 'failed', label: 'Falhou' },
  ];



  const { data } = useQuery({
    queryKey: ['notifications', page, statusFilter],
    queryFn: () => ApiClient.get(`v1/contacts/notifications?page=${page}&status=${statusFilter}`).then(({data}) => {
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value) {
      setStatusFilter(value);
    }
  }

  return (
    <Box>
      {deleteNotification !== null && <DeleteNotificationModal notification={deleteNotification} onDeleted={onDelete} onClose={() => setDeleteNotification(null)}  />}
      {editNotification !== null && <EditNotificationModal onClose={() => setEditNotification(null)} notification={editNotification} />}
      <FormControl>
        <InputLabel id="status-select-label">Situação</InputLabel>
        <Select
          sx={{ width: '400px'}}
          labelId="status-select-label"
          label="Situação"
          onChange={handleSelectChange}
          value={statusFilter}
          >
          {statuses.map((status) => <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>)}
        </Select>
      </FormControl>
      <Divider sx={{ margin: '20px 0px'}} />
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
                  <Button disabled={notification.status !== 'pending'} onClick={() => setEditNotification(notification)}>Editar</Button>
                  <IconButton disabled={notification.status !== 'pending'} aria-label="delete" onClick={() => setDeleteNotification(notification)}>
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