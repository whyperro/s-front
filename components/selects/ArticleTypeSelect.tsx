import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ArticleTypeProps {
  sendValue: (value: string) => void,
}

const ArticleTypeSelect = ({ sendValue }: ArticleTypeProps) => {

  const handleChange = (value: string) => {
    sendValue(value);
  }
  return (

    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder='Seleccionar...' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="consumable">Consumible</SelectItem>
        <SelectItem value="aeronautic">Aeronautica</SelectItem>
        <SelectItem value="electronic">Electronica</SelectItem>
        <SelectItem value="tool">Herramienta</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ArticleTypeSelect
