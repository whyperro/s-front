import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ArticleBrandSelectProps {
  onChange: () => void
}

const ArticleBrandSelect = (onChange: ArticleBrandSelectProps) => {

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccione una marca..." />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="circor">CIRCOR</SelectItem>
          <SelectItem value="aeroforce">Aeroforce</SelectItem>
          <SelectItem value="boeing">Boeing</SelectItem>
          <SelectItem value="pratt_whitney">Pratt & Whitney</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ArticleBrandSelect
