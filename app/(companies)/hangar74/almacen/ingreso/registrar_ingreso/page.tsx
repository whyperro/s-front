import RegisterArticleForm from "@/components/forms/RegisterArticleForm"
import { ContentLayout } from "@/components/layout/ContentLayout"

const AgregarPage = () => {

  return (
    <ContentLayout title='Registro de Articulo'>
      <RegisterArticleForm isEditing={false} />
    </ContentLayout>
  )
}

export default AgregarPage
