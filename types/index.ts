import { z } from "zod";

export type Role = {
  id: number;
  name: string;
  companyId: number;
  permissions: Permission[];
  company: {
    id: number;
    name: string;
    description: string;
  }[];
};

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  isActive: boolean;
  roles?: {
    id: number;
    name: string;
    permissions: Permission[];
  }[];
  permissions: Permission[];
  companies: Company[];
};

export type Permission = {
  id: number;
  name: string;
  label: string;
  modules: {
    id: number;
    name: string;
    description: string;
    registered_by: string;
    company_id: string;
    pivot: {
      permission_id: string;
      module_id: string;
    };
    company: {
      id: number;
      name: string;
      description: string;
    };
  }[];
};

export type Module = {
  id: number;
  name: string;
  description: string;
  company_id: string;
};

export type Condition = {
  id: number;
  name: string;
  description: string;
  registered_by: string;
  updated_by: string;
};

export type Company = {
  id: number;
  name: string;
  description: string;
  rif: string;
  cod_inac: string;
  fiscal_address: string;
  created_at: string;
  updated_at: string;
};

export type Location = {
  id: number;
  address: string;
  type: string;
  isMainBase: boolean;
  cod_iata: string;
  companies: Company[];
};

export type Warehouse = {
  id: string;
  name: string;
  address: string;
  company: string;
  type: string;
};

export type Batch = {
  id: number;
  name: string;
  description: string;
  category: string;
  ata_code: string;
  brand: string;
  is_hazarous: boolean;
  medition_unit: string;
  min_quantity: number;
  zone: string;
  warehouse_id: number;
  warehouse_name: string;
};

export type Article = {
  id?: number;
  article_type?: string;
  part_number: string;
  alternative_part_number?: string;
  status?: string;
  serial?: string;
  description?: string;
  zone?: string;
  manufacturer?: Manufacturer;
  condition?: Condition;
  condition_id?: string;
  weight?: number;
  cost?: number;
  quantity?: number;
  batches?: Batch;
  batch_id?: number;
  vendor_id?: string;
  certifcate_8130?: File | string;
  certifcate_vendor?: File | string;
  certifcate_fabricant?: File | string;
  image?: File | string;
};

export interface ConsumableArticle extends Article {
  is_managed?: boolean;
  quantity?: number;
  caducate_date?: string;
  fabrication_date?: string;
}

export interface ComponentArticle extends Article {
  caducate_date?: string;
  fabrication_date?: string;
  hour_date?: number;
  cycle_date?: number;
  calendar_date?: string;
  component_id?: number;
}

export interface ToolArticle extends Article {
  is_special: boolean;
}

export type Request = {
  id: number;
  justification: string;
  submission_date: string;
  work_order?: WorkOrder;
  requisition_order?: string;
  article?: Article;
  requested_by: string;
  created_by: string;
};

export type Department = {
  id: number;
  name: string;
  email: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
};

export type JobTitle = {
  id: number;
  name: string;
  description: string;
  department: Department;
};

export type Aircraft = {
  id: number;
  client: Client;
  model: string;
  fabricant: string;
  brand: string;
  serial: string;
  acronym: string;
  flight_hours: number;
  cycles: number;
  fabricant_date: string;
  owner: string;
  aircraft_operator: string;
  type_engine: string;
  number_engine: string;
  comments: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  dni: string;
  job_title: JobTitle;
  department: Department;
  user?: User;
  location: Location;
};
export interface WorkOrder extends Request {
  order_number: string;
  service: string;
  aircraft: Aircraft;
  status: boolean;
  description: string;
  employee: Employee;
}

export interface DispatchRequest extends Request {
  part_number: string;
  articles: Article[];
  destination_place: string;
  category: string;
}

export type Unit = {
  id: number;
  value: string;
  label: string;
  updated_by: string;
  registered_by: string;
  created_at: Date;
  updated_at: Date;
};

export type Convertion = {
  id: number;
  secondary_unit: string;
  convertion_rate: number;
  unit: Unit;
  quantity_unit: number;
  updated_by: string;
  registered_by: string;
  created_at: Date;
  updated_at: Date;
};

export type ToolBox = {
  id: number;
  name: string;
  created_by: string;
  delivered_by: string;
  employee: Employee;
  tool: {
    serial: string;
    article: ToolArticle;
  }[];
};

export type Manufacturer = {
  id: number;
  name: string;
  description: string;
};

export type Requisition = {
  id: number;
  order_number: string;
  status: string;
  created_by: string;
  approved_by: string;
  requested_by: string;
  received_by: string;
  justification: string;
  arrival_date: Date;
  submission_date: Date;
  work_order: WorkOrder;
  aircraft: Aircraft;
};

export type Vendor = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
};

export type Quote = {
  id: number;
  quote_number: string;
  justification: string;
  article_quote_order: {
    batch: {
      name: string;
    };
    article_part_number: string;
    quantity: number;
    unit_price: string;
    image: string;
  }[];
  sub_total: number;
  total: number;
  vendor: Vendor;
  requisition_order: Requisition;
  quote_date: Date;
  created_by: string;
  status: string;
};

export type PurchaseOrder = {
  id: number;
  order_number: string;
  justification: string;
  article_purchase_order: {
    batch?: {
      name: string;
    };
    id: number;
    article_part_number: string;
    quantity: number;
    unit_price: string;
    article_tax: number;
    usa_tracking: string;
    ock_tracking: string;
    article_location: string;
  }[];
  status: string;
  purchase_date: Date;
  tax: number;
  handling_fee: number;
  shipping_fee: number;
  sub_total: number;
  total: number;
  vendor: Vendor;
  requisition_order: Requisition;
  quote_order: Quote;
  location: Location;
  created_by: string;
  company: string;
};

export type Pilot = {
  id: number;
  dni: number;
  first_name: string;
  last_name: string;
  license_number: string;
  phone: string;
  email: string;
};

export type InformationSource = {
  id: string;
  name: string;
  type: "PROACTIVO" | "REACTIVO" | "PREDICTIVO";
};

export type ObligatoryReport = {
  id: string;
  report_code: string;
  report_date: Date;
  incident_date: Date;
  incident_time: Date;
  flight_time: Date;
  pilot: Pilot;
  copilot: Pilot;
  aircraft_acronym: string;
  aircraft_model: string;
  flight_number: string;
  flight_origin: string;
  flight_destiny: string;
  flight_alt_destiny: string;
  incidents: string;
  other_incidents: string;
};

export type VoluntaryReport = {
  id: number;
  report_number: string;
  information_source: InformationSource;
  report_date: Date;
  identification_date: Date;
  danger_location: string;
  danger_area: string;
  description: string;
  possible_consequences: string;
  danger_identification_id: number;
  status: string;
  reporter_name?: string;
  reporter_last_name?: string;
  reporter_phone?: string;
  reporter_email?: string;
};

export type DangerIdentification = {
  id: number;
  danger: string;
  danger_location: string;
  danger_area: string;
  description: string;
  possible_consequences: string;
  consequence_to_evaluate: string;
  root_cause_analysis: string;
  information_source: InformationSource;
};

export type FollowUpControl = {
  id: number;
  date: Date;
  description: string;
  mitigation_measure_id: number;
};

export type MitigationMeasure = {
  id: number;
  description: string;
  implementation_supervisor: string;
  implementation_responsible: string;
  estimated_date: Date;
  execution_date: Date;
  mitigation_plan_id: number;
  follow_up_control: FollowUpControl[];
};

export type MitigationPlan = {
  id: number;
  description: string;
  responsible: string;
  start_date: Date;
  measures: MitigationMeasure[];
  analysis: Analysis;
};

export type Analysis = {
  id: number;
  probability: string;
  severity: string;
  result: string;
};

export type MitigationTable = {
  id: number;
  danger: string;
  danger_location: string;
  danger_area: string;
  description: string;
  possible_consequences: string;
  consequence_to_evaluate: string;
  danger_type: string;
  root_cause_analysis: string;
  information_source_id: number;
  analysis: Analysis;
  mitigation_plan: MitigationPlan | null;
};

export type ReportsByArea = {
  name: string;
  reports_number: string;
};

export type DangerIdentificationsByType = {
  name: string;
  identifications_number: string;
};

export type ReportingStats = {
  total_reports: number;
  open_reports: number;
  closed_reports: number;
};
