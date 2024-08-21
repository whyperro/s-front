'use client'

import ConsumableInventoryForm from '@/components/forms/ConsumableInventoryForm';
import { ContentLayout } from '@/components/layout/ContentLayout'
import ArticleTypeSelect from '@/components/selects/ArticleTypeSelect'
import { useState } from 'react';


const AgregarPage = () => {

  const [type, setType] = useState("");

  function handleTypeSelect(data: string) {
    setType(data);
  }


  return (
    <ContentLayout title='TEST DE AGREGADO'>
      <div className='space-y-3 mb-4'>
        <h1 className='font-bold text-3xl'>Ingreso de Articulo</h1>
        <p className='text-sm text-muted-foreground'>Seleccione el tipo de articulo a registrar:</p>
        <ArticleTypeSelect sendValue={handleTypeSelect}/>
      </div>
      {
        type === 'consumable' && <ConsumableInventoryForm />
      }
      {
        type === 'herramienta' && <p>herramienta</p>
      }
      {
        type === 'electronica' && <p>electronica</p>
      }
    </ContentLayout>
  )
}

export default AgregarPage
