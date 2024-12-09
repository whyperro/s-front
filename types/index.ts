import { z } from "zod";

export type Role = {
    id: number,
    name: string,
    companyId: number;
    permissions: Permission[],
    company: {
      id: number,
      name: string,
      description: string,
    }[]
}

export type User = {
    id: number;
    username: string;
    first_name: string,
    last_name: string,
    email: string;
    isActive: boolean,
    roles?: {
      id: number,
      name: string,
      pivot: {
        model_type: string,
        model_id: string,
        rolde_id: string,
      }[],
      permissions: Permission[]
    }[];
    permissions: Permission[],
    companies: Company[]
}

export type Permission = {
  id: number,
  name: string,
  label: string,
  modules: {
    id: number,
    name: string,
    description: string,
    registered_by: string,
    company_id: string,
    pivot: {
      permission_id: string,
      module_id: string,
    },
    company: {
      id: number,
      name: string,
      description: string,
    }
  }[],
}

export type Module = {
  id: number,
  name: string,
  description: string,
  company_id: string,
}

export type Condition = {
  id: number,
  name: string,
  description: string,
  registered_by: string,
  updated_by: string,
}

export type Company = {
  id: number,
  name: string,
  description: string,
  rif: string,
  cod_inac: string,
  fiscal_address: string,
  created_at: string,
  updated_at: string,
}

export type Location = {
  id: number,
  address: string,
  type: string,
  isMainBase: boolean,
  cod_iata: string,
  companies: Company[],
}

export type Warehouse = {
    id: string,
    name: string,
    address: string,
    company: string,
    type: string,
}

export type Batch = {
  id: number,
  name: string,
  description: string,
  category: string,
  ata_code: string,
  brand:string,
  is_hazarous: boolean,
  medition_unit: string,
  min_quantity: number,
  zone: string,
  warehouse_id: number,
  warehouse_name: string,
}

export type Article = {
  id?: number,
  article_type?: string,
  part_number: string,
  alternative_part_number?: string,
  status?: string,
  serial?: string,
  description?: string,
  zone?: string,
  manufacturer?: Manufacturer,
  condition?: string,
  weight?: number,
  cost?: number,
  quantity?: number,
  batches?: Batch,
  batch_id?: number,
  vendor_id?: string,
  certifcate_8130?: File|string,
  certifcate_vendor?: File|string,
  certifcate_fabricant?: File|string,
  image?:File| string,
}

export interface ConsumableArticle extends Article {
  is_managed?: boolean,
  quantity?: number,
  caducate_date?: string,
  fabrication_date?: string,
}

export interface ComponentArticle extends Article {
  caducate_date?: string,
  fabrication_date?: string,
  hour_date?: number,
  cycle_date?: number,
  calendar_date?: string,
  component_id?: number,
}

export interface ToolArticle extends Article {
  is_special: boolean,
}

export type Request = {
  id: number,
  justification: string,
  submission_date: string,
  work_order?: WorkOrder,
  requisition_order?: string,
  article?: Article,
  requested_by: string,
  created_by: string,
}

export type Department = {
  id: number
  name: string,
  email: string,
}

export type Client = {
  id: number
  name: string,
  email: string,
}

export type JobTitle = {
  id: number,
  name: string,
  description: string,
  department: Department,
}

export type Aircraft = {
  id: number,
  client: Client,
  fabricant: string,
  brand: string,
  serial: string,
  acronym: string,
  flight_hours: number,
  cycles: number,
  fabricant_date: string,
  owner: string,
  aircraft_operator: string,
  type_engine: string,
  number_engine: string,
  comments: string,
}

export type Employee = {
  id: number,
  first_name: string,
  last_name: string,
  company: string,
  dni: string,
  job_title: JobTitle,
  department: Department,
  user?: User,
  location: Location,
}
export interface WorkOrder extends Request {
  order_number: string
  service: string,
  aircraft: Aircraft,
  status: boolean,
  description: string,
  employee: Employee,
}

export interface DispatchRequest extends Request {
  part_number: string,
  articles: Article[],
  destination_place: string,
  category: string,
}

export type Unit = {
  id: number,
  value: string,
  label: string,
  updated_by: string,
  registered_by: string,

  created_at: Date,
  updated_at: Date,
}

export type Convertion = {
  id: number,
  secondary_unit: string,
  convertion_rate: number,
  unit: Unit,
  quantity_unit: number,
  updated_by: string,
  registered_by: string,

  created_at: Date,
  updated_at: Date,
}

export type ToolBox = {
  id: number,
  name: string,
  created_by: string,
  delivered_by: string,
  employee: Employee,
  tool: {
    serial: string,
    article: ToolArticle,
  }[],
}

export type Manufacturer = {
  id: number,
  name: string,
  description: string,
}
