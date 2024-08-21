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
  part_number: string,
  description: string,
  category: string,
  alternative_part_number: string,
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
  article_type: string,
  status?: string,
  serial?: string,
  description?: string,
  zone?: string,
  brand?: string,
  condition?: string,
  weight?: number,
  cost?: number,
  batches_id?: number,
  vendor_id?: string,
  certifcate_8130?: File,
  certifcate_vendor?: File,
  certifcate_fabricant?: File,
  image?: File,
}

export interface ConsumableArticle extends Article {
  is_managed?: boolean,
  quantity?: number,
  magnitude?: number,
  unit_mesassure?: number,
  caducate_date?: string,
  fabrication_date?: string,
  component_id?: string,
  consumable_id?: string,
}
