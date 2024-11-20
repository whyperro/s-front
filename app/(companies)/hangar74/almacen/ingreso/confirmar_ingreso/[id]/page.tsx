'use client'

import RegisterArticleForm from "@/components/forms/RegisterArticleForm"
import { ContentLayout } from "@/components/layout/ContentLayout"
import LoadingPage from "@/components/misc/LoadingPage"
import { useGetArticleById } from "@/hooks/almacen/useGetArticleById"
import { redirect, useParams } from "next/navigation"

const ConfirmIncomingPage = () => {
  const params = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetArticleById(params.id)
  if (isLoading) {
    return <LoadingPage />
  }
  if (isError) {
    redirect("/hangar74/dashboard")
  }
  return (
    <ContentLayout title='Confirmar Ingreso'>
      {data?.batch?.category}
      <RegisterArticleForm isEditing initialData={data} category={data?.batch?.category} />
    </ContentLayout>
  )
}

export default ConfirmIncomingPage
