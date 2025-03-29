import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ObligatoryReport, VoluntaryReport } from "@/types";
import { dateFormat, timeFormat } from "@/lib/utils";

const BLUE = "#d6eaf8";
const RED = "#fc0a0a";
const GREEN = "#0ebe36";
const WHITE = "#fff";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFF",
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    borderTop: 1,
    borderLeft: 1,
  },
  tableCell: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderRight: 1,
    borderColor: "#000", // Establecemos el color del borde
  },
  cellText: {
    fontSize: 8,
  },
  cellText2: {
    fontSize: 9,
  },

  // Estilo para celdas de texto (más anchas)
  textCell: {
    width: "45%", // Ajusta este valor según necesites
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRight: 1,
    borderBottom: 1,
    borderColor: "#000",
    backgroundColor: BLUE,
  },

  observationContainer: {
    borderRight: 1,
    borderLeft: 1,
    padding: 5,
    minHeight: 50,
    borderBottom: 1,
    //FALTA POSIBLE LINEA INFERIOR
  },

  observationText: {
    fontSize: 8,
    margin: 5,
  },

  firstLine: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginLeft: 5, // Espacio entre el texto y la primera línea
  },
  linesContainer: {
    marginTop: 5,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "100%",
    marginBottom: 18,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline", // Asegura que el texto y la línea estén en la misma línea
    marginBottom: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerContainer: {
    position: "absolute",
    bottom: 35,
    left: 30,
    right: 30,
    borderBottom: 1,
    borderColor: "#000",
  },

  blackText: {
    fontFamily: "Helvetica",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "black",
  },

  // ESTILOS PARA EL HEADER DE LA PAGINA
  tableRowHeader: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 20,
  },
  tableCellHeader: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cellTextHeader: {
    fontSize: 10,
    textAlign: "center",
  },
  column2Header: {
    width: "55%",
    flexDirection: "column",
    borderTop: 1,
    borderRight: 1,
  },
  column3Header: {
    width: "25%",
    flexDirection: "column",
    borderTop: 1,
    borderRight: 1,
  },
  rowColumnHeader: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  // ESTILOS PARA EL INSTRUTIVO DE COMO LLENAR EL REPORTE PAGINA 2 / 2

  instructiveContainer: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
  },
  instructiveText: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  instructiveTitle: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    lineHeight: 1.15,
  },
  underlinedTTitle: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    textDecoration: "underline",
    marginVertical: 20,
  },
});

const Footer = (currentPage: number, pageNumber: number) => (
  <View style={styles.footerContainer}>
    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCell, width: "67%" }}>
        <Text style={styles.cellText2}>
          DEPENDENCIA: DIRECCION DE GESTION DE LA SEGURIDAD OPERACIONAL
          {"\n"}(SMS)
        </Text>
      </View>
      <View style={{ ...styles.tableCell, width: "20%" }}>
        <Text style={styles.cellText2}>REVISION N:00</Text>
      </View>
      <View style={{ ...styles.tableCell, width: "13%" }}>
        <Text style={styles.cellText2}>SMS</Text>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText2}>
          ELABORADO POR:{"\n"}ASISTENTE DE SMS
        </Text>
      </View>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText2}>REVISADO POR:{"\n"}DIRECTOR DE SMS</Text>
      </View>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText2}>
          APROBADO POR:{"\n"}DIRECTOR DE OPERACIONES
        </Text>
      </View>

      <View style={{ ...styles.tableCell, width: "13%" }}>
        <Text style={styles.cellText2}>
          NRO. PAGINA{"\n"}
          {currentPage} DE {pageNumber}
        </Text>
      </View>
    </View>
  </View>
);

const Header = () => (
  <View style={styles.tableRowHeader}>
    <View style={{ ...styles.tableCellHeader, width: "20%" }}>
      <Text style={styles.cellTextHeader}>Recuadro 1</Text>
    </View>
    <View style={styles.column2Header}>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>
          SISTEMA DE GESTION DE SEGURIDAD OPERACIONAL{"\n"}SMS
        </Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>
          REPORTE VOLUNTARIO DE PELIGROS
        </Text>
      </View>
    </View>
    <View style={styles.column3Header}>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>EDICION N: 01</Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>FECHA EDICION{"\n"}12/10/2023</Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>CODIGO:{"\n"}TMD-FOR-SMS-002</Text>
      </View>
    </View>
  </View>
);

const ObligatoryReportPdf = ({ report }: { report: ObligatoryReport }) => (
  <Document>
    <Page style={styles.page} size={"LETTER"}>
      <Header />

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>FECHA DEL{"\n"}REPORTE</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>FECHA DEL{"\n"}SUCESO </Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>HORA DEL{"\n"}SUCESO</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "40%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>LUGAR DONDE OCURRIO EL SUCESO</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>N DE REPORTE</Text>
        </View>
      </View>

      {/*FECHA DE REPORTE DEL SUCESO*/}

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>
            {dateFormat(report.report_date, "dd-MM-yyyy")}
          </Text>
        </View>

        {/*FECHA DE IDENTIFICACION DEL SUCESO*/}

        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>
            {dateFormat(report.incident_date, "dd-MM-yyyy")}
          </Text>
        </View>

        {/*HORA DEL INCIDENTE*/}
        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>
            {timeFormat(report.incident_time)}
          </Text>
        </View>
        {/*LUGAR DEL SUCESO DEL REPORTE*/}
        <View style={{ ...styles.tableCell, width: "40%" }}>
          <Text style={styles.cellText}>{report.aircraft_acronym}</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>{report.report_code}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>I. DATOS DE QUIEN REPORTA</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "35%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>NOMBRES Y APELLIDOS</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "20%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}> N DE LICENCIA</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "45%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>VIA DE CONTACTO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "10%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>PILOTO</Text>
        </View>

        <View style={{ ...styles.tableCell, width: "25%" }}>
          <Text style={styles.cellText}>
            {report.pilot.first_name} {report.pilot.last_name}
          </Text>
        </View>

        <View style={{ ...styles.tableCell, width: "20%" }}>
          <Text style={styles.cellText}>{report.pilot.license_number}</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "22.5%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>TELEFONO</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "22.5%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>CORREO ELECTRONICO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "10%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>COPILOTO</Text>
        </View>

        <View style={{ ...styles.tableCell, width: "25%" }}>
          <Text style={styles.cellText}>
            {report.copilot.first_name} {report.copilot.last_name}
          </Text>
        </View>

        <View style={{ ...styles.tableCell, width: "20%" }}>
          <Text style={styles.cellText}>{report.copilot.license_number}</Text>
        </View>

        <View style={{ ...styles.tableCell, width: "22.5%" }}>
          <Text style={styles.cellText}>{report.pilot.phone}</Text>
        </View>

        <View style={{ ...styles.tableCell, width: "22.5%" }}>
          <Text style={styles.cellText}>{report.pilot.email}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={styles.cellText}>II. DATOS DEL VUELO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "14%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>HORA</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "19%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>MATRICULA</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "25%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>N DE VUELO</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "42%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>AERONAVE</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "14%" }}>
          <Text style={styles.cellText}>{timeFormat(report.flight_time)}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "19%" }}>
          <Text style={styles.cellText}>{report.aircraft_acronym}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "25%" }}>
          <Text style={styles.cellText}>{report.flight_number}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "42%" }}>
          <Text style={styles.cellText}>{report.aircraft_model}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "33.33%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={styles.cellText}>ORIGEN</Text>
        </View>
        <View
          style={{
            ...styles.tableCell,
            width: "33.33%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={styles.cellText}>DESTINO</Text>
        </View>
        <View
          style={{
            ...styles.tableCell,
            width: "33.33%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={styles.cellText}>ALTERNO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "33.33%" }}>
          <Text style={styles.cellText}>{report.flight_origin}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "33.33%" }}>
          <Text style={styles.cellText}>{report.flight_destiny}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "33.33%" }}>
          <Text style={styles.cellText}>{report.flight_alt_destiny}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={styles.cellText}>
            III. SUCESOS DE OBLIGATORIO REPORTE
          </Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "26%" }}>
          <Text style={styles.cellText}>
            LA AEREONAVE ATERRIZA{"\n"}QUEDÁNDOSE SOLO{"\n"}CON EL{"\n"}
            COMBUSTIBLE DE{"\n"}RESERVA O MENOS
          </Text>
        </View>
        <View style={{ ...styles.tableCell, width: "20%" }}>
          <Text style={styles.cellText}>{report.flight_destiny}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "18%" }}>
          <Text style={styles.cellText}>{report.flight_alt_destiny}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "18%" }}>
          <Text style={styles.cellText}>{report.flight_alt_destiny}</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "18%" }}>
          <Text style={styles.cellText}>{report.flight_alt_destiny}</Text>
        </View>
      </View>
      {Footer(1, 2)}
    </Page>

    <Page size={"LETTER"} style={styles.page}>
      <Header />

      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: BLUE,
            borderBottom: 1,
          }}
        >
          <Text style={styles.cellText}>III. RIESGOS (CONSECUENCIAS)</Text>
        </View>
      </View>
      <View style={styles.observationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            A continuación, describa las consecuencias de ese peligro:
          </Text>
          <View style={styles.firstLine} />
        </View>
        \{/* Líneas adicionales con interlineado de 1.5 */}
        <View style={styles.linesContainer}>
          {[...Array(7)].map((_, index) => (
            <View key={index} style={styles.line} />
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.underlinedTTitle}>INSTRUCTIVO DE LLENADO</Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          • Fecha del reporte (DD/MM/AAAA):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar día, mes, año en que se realiza el reporte.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          • Fecha en que se identificó el peligro (DD/MM/AAAA):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar día, mes, año en que se
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>identificó el peligro.</Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          • Lugar donde se identificó el peligro:{" "}
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el lugar donde se identificó el peligro que se{" "}
        </Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>esta reportando</Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>• N° de reporte:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el número correlativo asignado al reporte por la Gerencia del
          SMS
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>I. DATOS DE QUIEN REPORTA </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>• Nombres (opcional): </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar nombres de la persona que realiza el reporte, si así lo desea.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>• Apellido (opcional): </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar apellidos de la persona que realiza el reporte, si así lo
          desea.{" "}
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>• Teléfono (opcional): </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el número telefónico de la persona que realiza el reporte, si{" "}
        </Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>asi lo desea</Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          • Correo electrónico (opcional)
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el correo electrónico de la persona que realiza el{" "}
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>II. PELIGRO IDENTIFICADO:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar la descripción detallada y clara del peligro observado.{" "}
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>• Área afectada:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Seleccionar con una (X) las áreas afectadas por el peligro que se
          identificó.{" "}
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          III. RIESGOS (CONSECUENCIA):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar la descripción detallada y clara de las{" "}
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          consecuencias de este peligro
        </Text>
      </View>

      {Footer(2, 2)}
    </Page>
  </Document>
);

export default ObligatoryReportPdf;
