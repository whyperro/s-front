import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { VoluntaryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Container } from "postcss";
import { Bold } from "lucide-react";

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JS comienzan desde 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
// ... (your formatDate function and styles remain the same)

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 35,
    height: 35,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline", // Asegura que el texto y la línea estén en la misma línea
    marginBottom: 10,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 900,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  table: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  cell: {
    display: "flex",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 4,
    textAlign: "center",
    fontFamily: "Helvetica",
    fontSize: 8,
  },
  cellHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 4,
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "black",
    fontSize: 8,
  },
  tableHeader: {
    backgroundColor: "#e3f4ff",
    fontWeight: "extrabold",
  },
  tableContent: {
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    marginTop: 10,
    fontSize: 9,
  },
  inputLine: {
    borderBottomWidth: 1,
    width: "20%",
    marginLeft: 5,
  },
  label: {
    fontSize: 9,
  },
  name: {
    fontSize: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 90,
  },
  dateLabel: {
    fontSize: 10,
  },
  dateText: {
    fontSize: 8,
    marginLeft: 40,
    marginTop: 1,
  },
  observationContainer: {
    borderWidth: 1,
    padding: 5,
    minHeight: 50,
  },
  observationText: {
    fontSize: 8,
    margin: 5,
  },
  check: {
    borderRightWidth: 1,
    backgroundColor: "#fff",
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: "5",
    textAlign: "center",
    fontSize: 8,
  },
  cell2: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    textAlign: "center",
    fontSize: 8,
  },

  container: {
    borderStyle: "solid",
    borderLeft: "1",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch", // Asegurar que los hijos ocupen toda la altura
  },

  containerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#e3f4ff",
  },

  Container2: {
    display: "flex",
    flexDirection: "row",
  },

  Container3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f4ff",
  },

  ContainerAreaType: { width: "100%" },

  lineContainer: {
    borderTop: "1px",
    width: "100%",
  },
  secondColumnTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "100%",
    paddingHorizontal: 5,
  },
  secondColumnBottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  thirdColumnRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "100%",
  },
  thirdColumnLastRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  firstColumn: {
    width: "30%",
  },
  secondColumn: {
    width: "40%",
    height: 60,
    alignSelf: "stretch",
  },
  thirdColumn: {
    width: "30%",
    borderRightWidth: 0,
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 10,
    textAlign: "center",
    whiteSpace: "normal", // Permitir que el texto se divida en varias líneas
  },
  blackText: {
    fontFamily: "Helvetica",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "black",
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
  },
  lineContainerDescription: {
    marginBottom: 5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "100%",
    marginBottom: 18,
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

  footerContainer: {
    position: "absolute",
    bottom: 10,
    left: 30,
    right: 30,
    borderTop: 1,
    borderRight: 1,
    borderColor: "#000",
  },
  rowFooter: {
    alignItems: "stretch",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  cellLarge: {
    alignSelf: "stretch",
    flex: 2,
    borderRightWidth: 1,
    borderLeft: 1,
    borderRightColor: "#000",
    padding: 4,
    fontSize: 8,
    textAlign: "center",
  },
  cellSmall: {
    alignSelf: "stretch",
    flex: 0.5,
    borderRight: 1,
    padding: 4,
    fontSize: 8,
    textAlign: "center",
  },
  lastCellSmall: {
    flex: 0.314,
    justifyContent: "center",
    padding: 4,
    fontSize: 8,
    alignSelf: "stretch",
    textAlign: "center",
  },
  doubleRowCell: {
    flex: 0.7,
    padding: 2,
    fontSize: 8,
    textAlign: "center",
    borderLeftWidth: 1,
  },
  lastDoubleRowCell: {
    flex: 0.28,
    padding: 2,
    margin: 0,
    fontSize: 8,
    textAlign: "center",
    borderLeftWidth: 1,
  },
});

const Footer = () => (
  <View style={styles.footerContainer}>
    {/* Primera fila */}
    <View style={styles.rowFooter}>
      <Text style={styles.cellLarge}>
        DEPENDENCIA: DIRECCIÓN DE GESTIÓN DE LA SEGURIDAD OPERACIONAL{"\n"}(SMS)
      </Text>
      <Text style={styles.cellSmall}>REVISIÓN N°: 00</Text>
      <Text style={styles.lastCellSmall}>SMS</Text>
    </View>

    {/* Segunda fila */}
    <View style={styles.rowFooter}>
      <Text style={styles.doubleRowCell}>
        ELABORADO POR: {"\n"} ASISTENTE DE SMS
      </Text>

      <Text style={styles.doubleRowCell}>
        REVISADO POR: {"\n"} DIRECTOR DE SMS
      </Text>

      <Text style={styles.doubleRowCell}>
        APROBADO POR: {"\n"} DIRECTOR DE OPERACIONES
      </Text>

      <Text style={styles.lastDoubleRowCell}>NRO. PÁGINA {"\n"} 1 DE 2</Text>
    </View>
  </View>
);

const VoluntaryReportPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    {/* Change the Page size and remove or change orientation */}
    <Page size="LETTER" style={styles.page}>






      {/* Primera fila del encabezado */}
      <View style={[styles.headerRow, { marginTop: 40 }]}>
        {/* Primera columna (logo) */}
        <View style={[styles.column, styles.firstColumn]}>
          {/* <Image src="/LOGO_TRD.png" style={styles.logo} /> */}
        </View>

        {/* Segunda columna */}
        <View style={[styles.column, styles.secondColumn]}>
          <View style={styles.secondColumnTop}>
            <Text style={[styles.text, { width: "100%" }]}>
              SISTEMA DE GESTIÓN DE SEGURIDAD OPERACIONAL SMS
            </Text>
          </View>
          <View style={styles.secondColumnBottom}>
            <Text style={[styles.text, { width: "100%" }]}>
              REPORTE VOLUNTARIO DE PELIGROS
            </Text>
          </View>
        </View>

        {/* Tercera columna */}
        <View style={[styles.column, styles.thirdColumn]}>
          <View style={styles.thirdColumnRow}>
            <Text style={[styles.text, { width: "100%" }]}>EDICIÓN N°: 01</Text>
          </View>
          <View style={styles.thirdColumnRow}>
            <Text style={[styles.text, { width: "100%" }]}>
              FECHA DE EDICIÓN: 12/10/2023
            </Text>
          </View>
          <View style={styles.thirdColumnLastRow}>
            <Text style={[styles.text, { width: "100%" }]}>
              CÓDIGO: TMD-FOR-SMS-002
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.blackText, { width: "100%" }]}>
        <Text style={[styles.blackText]}>
          <Text style={{ textDecoration: "underline" }}>IMPORTANTE </Text>
        </Text>
        : EL REPORTE VOLUNTARIO DE
      </Text>
      <Text style={[styles.blackText]}>
        PELIGRO PUEDE SER ANONIMO, ES CONFIDENCIAL Y NO PUNITIVO.
      </Text>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "15%" }]}>
          FECHA DEL{"\n"}REPORTE
        </Text>
        <Text style={[styles.cell, { width: "25%" }]}>
          FECHA EN QUE SE{"\n"}IDENTIFICO EL PELIGRO
        </Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          LUGAR DONDE DETECTO EL PELIGRO
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>Nº DE REPORTE</Text>
      </View>
      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.cell, { width: "15%" }]}>
          {format(report.report_date, "dd-MM-yyyy", {
            locale: es,
          })}
        </Text>
        <Text style={[styles.cell, { width: "25%" }]}>
          {format(report.identification_date, "dd-MM-yyyy", {
            locale: es,
          })}
        </Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          {report.airport_location}
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          RVP-{report.report_number}
        </Text>
      </View>
      {/* HEADER PARA PRESENTAICON DE UNA TABLA (OPCIONALES)*/}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          I. DATOS DE QUIEN REPORTA
        </Text>
      </View>
      {/* HEADER PARA DATOS PERSONALES (OPCIONALES)*/}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "50%" }]}>NOMBRES (OPCIONAL)</Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          APELLIDOS (OPCIONAL)
        </Text>
      </View>
      {/* CONTENIDO PARA DATOS PERSONALES (OPCIONALES)*/}
      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.cell, { width: "50%" }]}>
          {report.reporter_name ?? "N/A"}
        </Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          {report.reporter_last_name ?? "N/A"}
        </Text>
      </View>
      {/* HEADER PARA DATOS OPCIONALES DE CONTACTO (OPCIONALES)*/}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "50%" }]}>TELEFONO (OPCIONAL)</Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          CORREO ELECTRONICO (OPCIONAL)
        </Text>
      </View>
      {/* CONTENIDO PARA DATOS DE CONTACTO  (OPCIONALES)*/}
      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.cell, { width: "50%" }]}>
          {report.reporter_phone ?? "N/A"}
        </Text>
        <Text style={[styles.cell, { width: "50%" }]}>
          {report.reporter_email ?? "N/A"}
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text
          style={[
            styles.cellHeader,
            { width: "100%", borderBottom: 1, borderBottomColor: "#000" },
          ]}
        >
          II. PELIGRO IDENTIFICADO
        </Text>
      </View>

      {/* SECCIÓN DE OBSERVACIONES */}
      <View style={[styles.container]}>
        {/* CONTAINER = ROW */}

        <View style={[styles.containerArea, styles.cell2, { height: "100%" }]}>
          <Text>AREA AFECTADA</Text>
        </View>

        <View style={[styles.Container2, { width: "100%" }]}>
          <View style={[styles.Container3, styles.cell2, { width: "100%" }]}>
            <Text>OPERACIONES</Text>
            <View style={[styles.lineContainer]}>
              <Text>ADMINISTRACION Y RECURSOS{"\n"}HUMANOS</Text>
            </View>
          </View>

          <View style={[styles.Container3]}>
            <Text style={[styles.check]}>X</Text>
            <Text style={[styles.check]}>_</Text>
          </View>
        </View>

        <View style={[styles.Container2, { width: "100%" }]}>
          <View style={[styles.Container3, styles.cell2, { width: "100%" }]}>
            <Text>MATENIMIENTO</Text>
            <View style={[styles.lineContainer, { width: "100%" }]}>
              <Text>CONTROL Y ASEGURAMIENTO DE LA{"\n"}CALIDAD</Text>
            </View>
          </View>

          <View style={[styles.Container3]}>
            <Text style={[styles.check]}>X</Text>
            <Text style={[styles.check]}>_</Text>
          </View>
        </View>
      </View>
      <View style={styles.observationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            A continuación, describa claramente el peligro que está reportando:
          </Text>
          <View style={styles.firstLine} />
        </View>

        {/* Líneas adicionales con interlineado de 1.5 */}
        <View style={styles.linesContainer}>
          {[...Array(16)].map((_, index) => (
            <View key={index} style={styles.line} />
          ))}
        </View>
      </View>
      <View style={styles.footerContainer}>
        {/* Primera fila */}
        <View style={[styles.rowFooter, { alignItems: "center" }]}>
          <Text style={styles.cellLarge}>
            DEPENDENCIA: DIRECCIÓN DE GESTIÓN DE LA SEGURIDAD OPERACIONAL{"\n"}
            (SMS)
          </Text>
          <Text style={styles.cellSmall}>REVISIÓN N°: 00</Text>
          <Text style={[styles.lastCellSmall]}>SMS</Text>
        </View>

        {/* Segunda fila */}
        <View style={styles.rowFooter}>
          <Text style={styles.doubleRowCell}>
            ELABORADO POR: {"\n"} ASISTENTE DE SMS
          </Text>
          <Text style={styles.doubleRowCell}>
            REVISADO POR: {"\n"} DIRECTOR DE SMS
          </Text>
          <Text style={styles.doubleRowCell}>
            APROBADO POR: {"\n"} DIRECTOR DE OPERACIONES
          </Text>
          <Text style={styles.lastDoubleRowCell}>
            NRO. PÁGINA {"\n"} 1 DE 2
          </Text>
        </View>
      </View>
    </Page>
    <Page style={styles.page} size="LETTER">
      {/* Primera fila del encabezado */}
      <View style={[styles.headerRow, { marginTop: 40 }]}>
        {/* Primera columna (logo) */}
        <View style={[styles.column, styles.firstColumn]}>
          {/* <Image src="/LOGO_TRD.png" style={styles.logo} /> */}
        </View>

        {/* Segunda columna */}
        <View style={[styles.column, styles.secondColumn]}>
          <View style={styles.secondColumnTop}>
            <Text style={[styles.text, { width: "100%" }]}>
              SISTEMA DE GESTIÓN DE SEGURIDAD OPERACIONAL SMS
            </Text>
          </View>
          <View style={styles.secondColumnBottom}>
            <Text style={[styles.text, { width: "100%" }]}>
              REPORTE VOLUNTARIO DE PELIGROS
            </Text>
          </View>
        </View>

        {/* Tercera columna */}
        <View style={[styles.column, styles.thirdColumn]}>
          <View style={styles.thirdColumnRow}>
            <Text style={[styles.text, { width: "100%" }]}>EDICIÓN N°: 01</Text>
          </View>
          <View style={styles.thirdColumnRow}>
            <Text style={[styles.text, { width: "100%" }]}>
              FECHA DE EDICIÓN: 12/10/2023
            </Text>
          </View>
          <View style={styles.thirdColumnLastRow}>
            <Text style={[styles.text, { width: "100%" }]}>
              CÓDIGO:{"\n"}TMD-FOR-SMS-002
            </Text>
          </View>
        </View>
      </View>

      {/* HEADER PARA PRESENTAICON DE UNA TABLA (OPCIONALES)*/}
      <View
        style={[
          styles.row,
          styles.table,
          styles.tableHeader,
          { marginTop: 20 },
        ]}
      >
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          III. RIESGOS (CONSECUENCIAS)
        </Text>
      </View>

      <View style={styles.observationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            A continuación, describa las consecuencias de ese peligro:
          </Text>
          <View style={styles.firstLine} />
        </View>

        {/* Líneas adicionales con interlineado de 1.5 */}
        <View style={styles.linesContainer}>
          {[...Array(8)].map((_, index) => (
            <View key={index} style={styles.line} />
          ))}
        </View>
      </View>

      <View style={styles.footerContainer}>
        {/* Primera fila */}
        <View style={[styles.rowFooter, { alignItems: "center" }]}>
          <Text style={styles.cellLarge}>
            DEPENDENCIA: DIRECCIÓN DE GESTIÓN DE LA SEGURIDAD OPERACIONAL{"\n"}
            (SMS)
          </Text>
          <Text style={styles.cellSmall}>REVISIÓN N°: 00</Text>
          <Text style={[styles.lastCellSmall]}>SMS</Text>
        </View>

        {/* Segunda fila */}
        <View style={styles.rowFooter}>
          <Text style={styles.doubleRowCell}>
            ELABORADO POR: {"\n"} ASISTENTE DE SMS
          </Text>
          <Text style={styles.doubleRowCell}>
            REVISADO POR: {"\n"} DIRECTOR DE SMS
          </Text>
          <Text style={styles.doubleRowCell}>
            APROBADO POR: {"\n"} DIRECTOR DE OPERACIONES
          </Text>
          <Text style={styles.lastDoubleRowCell}>
            NRO. PÁGINA {"\n"} 2 DE 2
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default VoluntaryReportPdf;
