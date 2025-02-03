'use client';

import { useDeleteQuote } from '@/actions/compras/cotizaciones/actions';
import { ContentLayout } from '@/components/layout/ContentLayout';
import LoadingPage from '@/components/misc/LoadingPage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetPurchaseOrder } from '@/hooks/compras/useGetPurchaseOrder';
import { useGetTrackingInfo } from '@/hooks/compras/useGetTrackingInfo';
import { cn } from '@/lib/utils';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2, Trash2, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const CotizacionPage = () => {

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { selectedCompany } = useCompanyStore();

  const { order_number } = useParams<{ order_number: string }>();

  const { data, isLoading } = useGetPurchaseOrder(selectedCompany?.split(" ").join("") ?? null, order_number);

  if (isLoading) return <LoadingPage />;

  return (
    <ContentLayout title='Cotización'>
      <div className='flex flex-col gap-y-2 mb-12'>
        <h1 className='text-4xl font-bold text-center'>Cotización Nro: <span className='text-blue-600'>#{order_number}</span></h1>
        <p className='text-sm text-muted-foreground text-center italic'>
          Detalles de la Orden de Compra #{order_number}
        </p>
      </div>
      <Card className='max-w-5xl mx-auto'>
        <CardHeader className='flex flex-col items-center'>
          <CardTitle className='flex justify-center text-5xl mb-2'>#{order_number}</CardTitle>
          <Badge className={cn("text-lg", data?.status === 'pagado' ? "bg-green-500" : "bg-yellow-600")}>{data?.status.toUpperCase()}</Badge>
        </CardHeader>
        <CardContent className='flex flex-col gap-8' >
          <div className='flex w-full justify-center gap-24 text-xl'>
            <div className='flex flex-col gap-2 items-center'>
              <h1>Creado Por:</h1>
              <p className='font-bold flex gap-2 items-center'><User /> {data?.created_by}</p>
            </div>
            <div className='flex flex-col gap-2 items-center'>
              <h1>Proveedor:</h1>
              <p className='font-bold flex gap-2 items-center'>{data?.vendor.name}</p>
            </div>
          </div>
          <p className='text-center font-medium italic'>{data?.justification}</p>
          <div className='flex justify-center gap-2'>
            {
              data?.article_purchase_order.map((article) => (
                <Card className='w-[280px] text-center' key={article.article_part_number}>
                  <CardTitle className='p-6'>{article.batch?.name} - {article.article_part_number}</CardTitle>
                  <CardContent>
                    <p className='font-medium'>Cantidad: <span className='font-bold italic'>{article.quantity}</span></p>
                    <p className='font-medium'>Tracking - USA: <span className='font-bold italic'>{article.usa_tracking}</span></p>
                    <p className='font-medium'>Tracking - OCK21: <span className='font-bold italic'>{article.ock_tracking}</span></p>
                    <p className='font-medium'>Ubicación: <span className='font-bold italic'>{article.article_location}</span></p>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </CardContent>
        {
          data?.status !== 'aprobada' && (
            <CardFooter className='flex gap-2 justify-end'>
              <Button>Aprobar</Button>
              <Button onClick={() => setOpenDelete(true)} variant={"destructive"}><Trash2 /></Button>
            </CardFooter>
          )
        }
      </Card>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">¿Eliminar Cotización?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant={"destructive"} onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button>Borrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
};

export default CotizacionPage;
