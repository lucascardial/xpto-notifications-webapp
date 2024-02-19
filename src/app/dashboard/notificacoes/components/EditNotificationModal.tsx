import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { reactQueryClient } from "@/providers/QueryClientProvider";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import  dayjs  from 'dayjs';

type EditNotificationModalProps = {
  onClose: () => void;
  notification: Record<string, any>;
};

export default function EditNotificationModal({onClose, notification}: EditNotificationModalProps) {
  const { data } = useQuery({
    queryKey: [`notifications.${notification.id}`],
    queryFn: () => ApiClient.get(`v1/contacts/notifications/${notification.id}`).then(({data}) => data),
    initialData: notification,
  });

  const [formData, setFormData] = useState({
    ...data,
    schedule_date: dayjs(data.schedule_date)
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
      await ApiClient.put(`v1/contacts/notifications/${notification.id}`, {
        ...formData,
        schedule_date: dayjs(formData.schedule_date)
      });
      
      reactQueryClient.invalidateQueries({ queryKey: ['notifications']});
      reactQueryClient.invalidateQueries({ queryKey: [`notifications.${notification.id}`]});

      onClose();
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        Editar Notificação
      </DialogTitle>
      <DialogContent>
        <Grid container gap={2} sx={{ paddingTop: '20px'}}>
          <Grid xs={12}>
            <TextField name="channel" onChange={handleInputChange} fullWidth label="Canal" defaultValue={formData.channel} />
          </Grid>
          <Grid xs={12}>
            <TextField name="contact" onChange={handleInputChange} fullWidth label="Contato" defaultValue={formData.contact} />
          </Grid>
          <Grid xs={12}>
            <DateTimePicker
              ampm={false}
              label="Data Agendamento"
              value={formData.schedule_date}
              onChange={(newValue) => setFormData({ ...formData, schedule_date: newValue })}
            />
          </Grid>
          <Grid xs={12}>
            <TextareaAutosize name="content" onChange={handleInputChange} style={{height: '300px', width: '100%', display: 'block'}} maxRows={10} aria-label="empty textarea"  defaultValue={formData.content} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}