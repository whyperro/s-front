const mockData = {
  jobTitle: {
    id: 1,
    name: "Analista de Sistemas",
    description: "Encargado del análisis y diseño de soluciones de software",
    department: {
      id: 2,
      name: "Tecnología",
      email: "tecnologia@empresa.com",
    },
  },
  location: {
    id: 1,
    address: "Av. Principal, Caracas, Venezuela",
    type: "Oficina Central",
    isMainBase: true,
    cod_iata: "CCS",
    companies: [
      {
        id: 1,
        name: "Empresa Aeronáutica",
        description: "Empresa dedicada al sector aeronáutico",
        rif: "J-12345678-9",
        cod_inac: "E123",
        fiscal_address: "Av. Principal, Caracas, Venezuela",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-10T00:00:00Z",
      },
    ],
  },
  activityReports: [
    {
      id: 1,
      date: new Date("2024-02-18T12:00:00Z"),
      employee: {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        company: "Empresa Aeronáutica",
        dni: "V-12345678",
        job_title: {
          id: 1,
          name: "Analista de Sistemas",
          description: "Encargado del análisis y diseño de soluciones de software",
          department: {
            id: 2,
            name: "Tecnología",
            email: "tecnologia@empresa.com",
          },
        },
        department: {
          id: 2,
          name: "Tecnología",
          email: "tecnologia@empresa.com",
        },
        location: {
          id: 1,
          address: "Av. Principal, Caracas, Venezuela",
          type: "Oficina Central",
          isMainBase: true,
          cod_iata: "CCS",
          companies: [
            {
              id: 1,
              name: "Empresa Aeronáutica",
              description: "Empresa dedicada al sector aeronáutico",
              rif: "J-12345678-9",
              cod_inac: "E123",
              fiscal_address: "Av. Principal, Caracas, Venezuela",
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-10T00:00:00Z",
            },
          ],
        },
      },
      activities: [
        {
          id: 1,
          initial_hour: "09:14",  // <-- Aquí cambia de Date a string
          final_hour: "10:17",     // <-- Aquí cambia de Date a string
          employee: {
            id: 1,
            first_name: "Juan",
            last_name: "Pérez",
            company: "Empresa Aeronáutica",
            dni: "V-12345678",
            job_title: {
              id: 1,
              name: "Analista de Sistemas",
              description: "Encargado del análisis y diseño de soluciones de software",
              department: {
                id: 2,
                name: "Tecnología",
                email: "tecnologia@empresa.com",
              },
            },
            department: {
              id: 2,
              name: "Tecnología",
              email: "tecnologia@empresa.com",
            },
            location: {
              id: 1,
              address: "Av. Principal, Caracas, Venezuela",
              type: "Oficina Central",
              isMainBase: true,
              cod_iata: "CCS",
              companies: [
                {
                  id: 1,
                  name: "Empresa Aeronáutica",
                  description: "Empresa dedicada al sector aeronáutico",
                  rif: "J-12345678-9",
                  cod_inac: "E123",
                  fiscal_address: "Av. Principal, Caracas, Venezuela",
                  created_at: "2024-01-01T00:00:00Z",
                  updated_at: "2024-01-10T00:00:00Z",
                },
              ],
            },
          },
          description: "Revisión de sistemas internos",
          result: "Hola",
        },
      ],
    },
  ],
};

export default mockData;