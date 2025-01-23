import {
  Building,
  ClipboardCopy,
  ClipboardPen,
  Globe,
  HandCoins,
  History,
  LayoutGrid,
  LucideIcon,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  Plane,
  ScrollText,
  Settings,
  SquarePen,
  User2,
  Wrench,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export type CompanyMenu = "transmandu" | "hangar 74";

//TODO: Crear menus para cada empresa. Mismo array o diferente, ir probando.

export function getMenuList(pathname: string, company: CompanyMenu): Group[] {
  switch (company) {
    case "transmandu":
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/transmandu/dashboard",
              label: "Dashboard",
              active: pathname.includes("/transmandu/dashboard"),
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "SMS",
          menus: [
            {
              href: "/transmandu/sms",
              label: "Reportes",
              active: pathname.includes("/transmandu/sms"),
              icon: ClipboardPen,
              submenus: [
                {
                  href: "/transmandu/sms/reportes_obligatorios",
                  label: "Reportes Obligatorios",
                  active: pathname === "/transmandu/sms/reportes_obligatorios",
                },
                {
                  href: "/transmandu/sms/reportes_voluntarios",
                  label: "Reportes Voluntarios",
                  active: pathname === "/transmandu/sms/reportes_voluntarios",
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Admistración",
          menus: [
            {
              href: "/administracion/usuarios_permisos",
              label: "Usuarios Y Permisos",
              active: pathname.includes("/administracion/usuarios_permisos"),
              icon: User2,
              submenus: [
                {
                  href: "/administracion/usuarios_permisos/usuarios",
                  label: "Administrar Usuarios",
                  active:
                    pathname === "/administracion/usuarios_permisos/usuarios",
                },
                {
                  href: "/administracion/usuarios_permisos/roles",
                  label: "Administrar  Roles",
                  active:
                    pathname === "/administracion/usuarios_permisos/roles",
                },
                {
                  href: "/administracion/usuarios_permisos/permisos",
                  label: "Administrar Permisos",
                  active:
                    pathname === "/administracion/usuarios_permisos/permisos",
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: [],
            },
          ],
        },
      ];

    case "hangar 74":
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/hangar74/dashboard",
              label: "Dashboard / Hangar74",
              active: pathname.includes("/hangar74/dashboard"),
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "General",
          menus: [
            {
              href: "/hangar74/general/inventario",
              label: "Inventario",
              active: pathname.includes("/hangar74/general/inventario"),
              icon: PackageSearch,
              submenus: [],
            },
            {
              href: "/hangar74/general/requisiciones",
              label: "Requisiciones",
              active: pathname.includes("/hangar74/general/requisiciones"),
              icon: ScrollText,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Carga Administrativa",
          menus: [
            {
              href: "",
              label: "Control de Ingreso",
              active: pathname.includes("/hangar74/almacen/inventario/ingreso"),
              icon: PackagePlus,
              submenus: [
                {
                  href: "/hangar74/almacen/ingreso/registrar_ingreso",
                  label: "Ingreso de Articulo",
                  active:
                    pathname === "/hangar74/almacen/ingreso/registrar_ingreso",
                },
                {
                  href: "/hangar74/almacen/ingreso/en_transito",
                  label: "Articulos en Tránsito",
                  active: pathname === "/hangar74/almacen/ingreso/en_transito",
                },
                {
                  href: "/hangar74/almacen/ingreso/en_recepcion",
                  label: "Articulos en Recepción",
                  active: pathname === "/hangar74/almacen/ingreso/en_recepcion",
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Almacen",
          menus: [
            {
              href: "",
              label: "Solicitudes",
              active: pathname.includes("/hangar74/almacen/solicitudes"),
              icon: ClipboardCopy,
              submenus: [
                {
                  href: "/hangar74/almacen/solicitudes/pendiente",
                  label: "Pendiente",
                  active:
                    pathname === "/hangar74/almacen/solicitudes/pendiente",
                },
                {
                  href: "/hangar74/almacen/solicitudes/salida",
                  label: "Salida",
                  active: pathname === "/hangar74/almacen/solicitudes/salida",
                },
              ],
            },
            {
              href: "/hangar74/almacen/inventario",
              label: "Inventario",
              active: pathname.includes("/hangar74/almacen/inventario"),
              icon: PackageOpen,
              submenus: [
                {
                  href: "/hangar74/almacen/inventario/gestion",
                  label: "Gestión",
                  active:
                    pathname === "/hangar74/almacen/inventario/gestion" ||
                    pathname === "/hangar74/almacen/inventario/gestion/crear",
                },
                {
                  href: "/hangar74/almacen/inventario/entregado",
                  label: "Entregado",
                  active: pathname === "/hangar74/almacen/inventario/entregado",
                },
              ],
            },
            {
              href: "/hangar74/almacen/caja_herramientas",
              label: "Cajas de Herramientas",
              active: pathname.includes("/hangar74/almacen/caja_herramientas"),
              icon: Wrench,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Compras",
          menus: [
            {
              href: "/hangar74/compras/estatus",
              label: "Estatus de Compras",
              active: pathname.includes("/hangar74/estatus"),
              icon: History,
              submenus: [],
            },
            {
              href: "/hangar74/compras/cotizaciones",
              label: "Cotizaciones",
              active: pathname.includes("/hangar74/compras/cotizaciones"),
              icon: HandCoins,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Planificación y Mantenimiento",
          menus: [
            {
              href: "/hangar74/planificacion/ordenes_trabajo",
              label: "Ordenes de Trabajo",
              active: pathname.includes(
                "/hangar74/planificacion/ordenes_trabajo"
              ),
              icon: SquarePen,
              submenus: [
                {
                  href: "/hangar74/planificacion/ordenes_trabajo/",
                  label: "Gestionar Ordenes",
                  active:
                    pathname === "/hangar74/planificacion/ordenes_trabajo",
                },
              ],
            },
            {
              href: "/hangar74/planificacion/aeronaves",
              label: "Aeronaves",
              active: pathname.includes("/hangar74/planificacion/reportes"),
              icon: Plane,
              submenus: [
                {
                  href: "/hangar74/planificacion/aeronaves",
                  label: "Gestión de Aeronaves",
                  active: pathname === "/hangar74/planificacion/aeronaves",
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Ajustes",
          menus: [
            {
              href: "/ajustes/empresas",
              label: "Globales",
              active: pathname.includes("/ajustes/globales"),
              icon: Globe,
              submenus: [
                {
                  href: "/ajustes/globales/unidades",
                  label: "Unidades",
                  active: pathname === "/ajustes/globales/unidades",
                },
                {
                  href: "/ajustes/globales/fabricantes",
                  label: "Fabricantes",
                  active: pathname === "/administracion/globales/fabricantes",
                },
                {
                  href: "/ajustes/globales/condiciones",
                  label: "Condiciones",
                  active: pathname === "/ajustes/globales/condiciones",
                },
              ],
            },
            {
              href: "/hangar74/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Admistración",
          menus: [
            {
              href: "/administracion/usuarios_permisos",
              label: "Usuarios Y Permisos",
              active: pathname.includes("/administracion/usuarios_permisos"),
              icon: User2,
              submenus: [
                {
                  href: "/administracion/usuarios_permisos/usuarios",
                  label: "Administrar Usuarios",
                  active:
                    pathname === "/administracion/usuarios_permisos/usuarios",
                },
                {
                  href: "/administracion/usuarios_permisos/roles",
                  label: "Administrar  Roles",
                  active:
                    pathname === "/administracion/usuarios_permisos/roles",
                },
                {
                  href: "/administracion/usuarios_permisos/permisos",
                  label: "Administrar Permisos",
                  active:
                    pathname === "/administracion/usuarios_permisos/permisos",
                },
              ],
            },
            {
              href: "/administracion/empresas",
              label: "Empresas",
              active: pathname.includes("/administracion/empresas"),
              icon: Building,
              submenus: [
                {
                  href: "/administracion/empresas/almacenes",
                  label: "Administrar Almacenes",
                  active: pathname === "/administracion/empresas/almacenes",
                },
                {
                  href: "/administracion/empresas/empleados",
                  label: "Administrar Empleados",
                  active: pathname === "/administracion/empresas/empleados",
                },
              ],
            },
          ],
        },
      ];

    default:
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname.includes("/dashboard"),
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
      ];
  }
}
