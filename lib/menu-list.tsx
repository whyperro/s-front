import {
  Bookmark,
  Building,
  ClipboardCopy,
  LayoutGrid,
  LucideIcon,
  NotebookPen,
  PackageOpen,
  Settings,
  SquarePen,
  Tag,
  User2
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
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export type CompanyMenu = 'transmandu' | 'hangar 74';


//TODO: Crear menus para cada empresa. Mismo array o diferente, ir probando.

export function getMenuList(pathname: string, company: CompanyMenu): Group[] {
  switch (company) {
    case 'transmandu':
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/transmandu/dashboard",
              label: "Dashboard",
              active: pathname.includes("/transmandu/dashboard"),
              icon: LayoutGrid,
              submenus: []
            }
          ]
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
                  active: pathname === ("/administracion/usuarios_permisos/usuarios"),
                },
                {
                  href: "/administracion/usuarios_permisos/roles",
                  label: "Administrar  Roles",
                  active: pathname === ("/administracion/usuarios_permisos/roles")
                },
                {
                  href: "/administracion/usuarios_permisos/permisos",
                  label: "Administrar Permisos",
                  active: pathname === ("/administracion/usuarios_permisos/permisos")
                }
              ]
            }
          ]
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: []
            }
          ]
        },
      ];

    case 'hangar 74':
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/hangar74/dashboard",
              label: "Dashboard / Hangar74",
              active: pathname.includes("/hangar74/dashboard"),
              icon: LayoutGrid,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Almacen",
          menus: [
            {
              href: "",
              label: "Solicitudes",
              active: pathname.includes("/hangar74/solicitudes"),
              icon: ClipboardCopy,
              submenus: [
                {
                  href: "/hangar74/almacen/solicitudes/entrada",
                  label: "Entrada",
                  active: pathname === "/hangar74/almacen/solicitudes/entrada"
                },
                {
                  href: "/hangar74/almacen/solicitudes/salida",
                  label: "Salida",
                  active: pathname === "/hangar74/almacen/solicitudes/salida"
                },
              ]
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
                  active: pathname === "/hangar74/almacen/inventario/gestion" || pathname === "/hangar74/almacen/inventario/gestion/crear",
                },
                {
                  href: "/hangar74/almacen/inventario/en_espera",
                  label: "En Espera",
                  active: pathname === "/hangar74/almacen/inventario/en_espera"
                },
                {
                  href: "/hangar74/almacen/inventario/apartado",
                  label: "Apartado",
                  active: pathname === "/hangar74/almacen/inventario/apartado"
                },
                {
                  href: "/hangar74/almacen/inventario/entregado",
                  label: "Entregado",
                  active: pathname === "/hangar74/almacen/inventario/entregado"
                },
              ]
            },
            {
              href: "/hangar74/almacen/reportes",
              label: "Reportes",
              active: pathname.includes("/hangar74/almacen/reportes"),
              icon: NotebookPen,
              submenus: [
                {
                  href: "/hangar74/almacen/reportes/interno",
                  label: "Interno",
                  active: pathname === "/hangar74/almacen/reportes/interno"
                },
                {
                  href: "/hangar74/almacen/reportes/inac",
                  label: "INAC",
                  active: pathname === "/hangar74/almacen/reportes/inac"
                },
              ]
            }
          ]
        },
        {
          groupLabel: "Planificación y Mantenimiento",
          menus: [
            {
              href: "/hangar74/planificacion/ordenes_trabajo",
              label: "Ordenes de Trabajo",
              active: pathname.includes("/hangar74/ordenes_trabajo"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/hangar74/planificacion/ordenes_trabajo/nueva_orden_trabajo",
                  label: "Registrar Orden",
                  active: pathname === "/hangar74/planificacion/ordenes_trabajo/nueva_orden_trabajo"
                },
                {
                  href: "/hangar74/planificacion/ordenes_trabajo/historial",
                  label: "Historial de Ordenes",
                  active: pathname === "/hangar74/planificacion/ordenes_trabajo/historial"
                }
              ]
            },
            {
              href: "/hangar74/planificacion/trabajadores",
              label: "Trabajadores",
              active: pathname.includes("/hangar74/planificacion/trabajadores"),
              icon: Bookmark,
              submenus: []
            },
            {
              href: "/hangar74/planificacion/reportes",
              label: "Reportes",
              active: pathname.includes("/hangar74/planificacion/reportes"),
              icon: Tag,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/hangar74/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: []
            }
          ]
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
                  active: pathname === ("/administracion/usuarios_permisos/usuarios"),
                },
                {
                  href: "/administracion/usuarios_permisos/roles",
                  label: "Administrar  Roles",
                  active: pathname === ("/administracion/usuarios_permisos/roles")
                },
                {
                  href: "/administracion/usuarios_permisos/permisos",
                  label: "Administrar Permisos",
                  active: pathname === ("/administracion/usuarios_permisos/permisos")
                }
              ]
            },
            {
              href: "/administracion/empresas",
              label: "Empresas",
              active: pathname.includes("/administracion/empresas"),
              icon: Building,
              submenus: [
                {
                  href: "/administracion/empresas",
                  label: "Administrar Empresas",
                  active: pathname === ("/administracion/empresas")
                },
                {
                  href: "/administracion/empresas/almacenes",
                  label: "Administrar Almacenes",
                  active: pathname === ("/administracion/empresas/almacenes")
                },
              ]
            },
          ]
        }
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
              submenus: []
            }
          ]
        }
      ];
  }
}
