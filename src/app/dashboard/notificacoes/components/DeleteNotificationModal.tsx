import { ApiClient } from "@/http-clients/ApiAxiosClient";
import { reactQueryClient } from "@/providers/QueryClientProvider";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import page from "../page";

type DeleteNotificationModalProps = {
  onClose: () => void;
  onDeleted: () => void;
  notification: Record<string, any>;
};

export default function DeleteNotificationModal({ onClose, onDeleted, notification }: DeleteNotificationModalProps) {
  const handleDelete = async () => {
    await ApiClient.delete(`v1/contacts/notifications/${notification.id}`);
    onDeleted();
  }
  
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle id="alert-dialog-title">
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja realmente excluir a notificação para o contato {notification.contact}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Deletar
          </Button>
        </DialogActions>
    </Dialog>
  );
}