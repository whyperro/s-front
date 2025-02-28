'use client';
import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmCreateActivityReportDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCreateActivityReportDialog: React.FC<ConfirmCreateActivityReportDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <Button variant="default" onClick={onConfirm}>Crear</Button>
      <DialogContent>
        <p>No se encontró un registro de actividades para esta fecha. ¿Desea crear uno?</p>
      </DialogContent>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button variant="default" onClick={onConfirm}>Crear</Button>
      </div>
    </Dialog>
  );
};

export default ConfirmCreateActivityReportDialog;