'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { create } from 'zustand';
import { useCreateActivityReport } from '@/actions/desarrollo/reportes_diarios/actions';

interface ConfirmCreateActivityReportDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCreateActivityReportDialog: React.FC<ConfirmCreateActivityReportDialogProps> = ({ open, onClose, onConfirm }) => {
  const {createActivityReport} = useCreateActivityReport();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <p>No se encontró un registro de actividades para esta fecha. ¿Desea crear uno?</p>
        <div className='flex justify-center gap-2'>
        <Button variant="default" onClick={onConfirm}>Crear</Button>
      </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCreateActivityReportDialog;