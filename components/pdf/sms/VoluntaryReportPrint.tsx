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
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  table: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 5,
    textAlign: "center",
    fontSize: 8,
  },
  tableHeader: {
    backgroundColor: "#abdbe3",
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
    // marginTop: 10,
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
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    textAlign: "center",
    fontSize: 8,
  },

  container: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch", // Asegurar que los hijos ocupen toda la altura
  },

  containerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#abdbe3",
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
    backgroundColor: "#abdbe3",
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
    borderLeftWidth: 1,
    borderLeftColor: "#000",
    borderLeftStyle: "solid",
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
    bottom: 20,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  rowFooter: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  cellLarge: {
    flex: 3,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 4,
    fontSize: 8,
    textAlign: "center",
  },
  cellSmall: {
    flex: 0.5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 4,
    fontSize: 8,
    textAlign: "center",
  },
  lastCellSmall: {
    flex: 0.4,
    padding: 4,
    fontSize: 8,
    textAlign: "center",
  },
  doubleRowCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 2,
    fontSize: 8,
    textAlign: "center",
  },
  lastDoubleRowCell: {
    flex: 1,
    padding: 2,
    fontSize: 8,
    textAlign: "center",
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

const ActivitiesReportPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    {/* Change the Page size and remove or change orientation */}
    <Page style={styles.page}>
      {/* Primera fila del encabezado */}
      <View style={styles.headerRow}>
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

      {/* TABLA DE ACTIVIDADES */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "12%" }]}>FECHA DEL REPORTE</Text>
        <Text style={[styles.cell, { width: "20%" }]}>
          FECHA EN QUE SE IDENTIFICO EL PELIGRO
        </Text>
        <Text style={[styles.cell, { width: "55%" }]}>
          LUGAR DONDE DETECTO EL PELIGRO
        </Text>
        <Text style={[styles.cell, { width: "13%" }]}>Nº DE REPORTE</Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.cell, { width: "12%" }]}>
          {format(report.report_date, "dd-MM-yyyy", {
            locale: es,
          })}
        </Text>
        <Text style={[styles.cell, { width: "20%" }]}>
          {format(report.identification_date, "dd-MM-yyyy", {
            locale: es,
          })}
        </Text>
        <Text style={[styles.cell, { width: "55%" }]}>
          {report.airport_location}
        </Text>
        <Text style={[styles.cell, { width: "13%" }]}>
          RVP-{report.report_number}
        </Text>
      </View>

      {/* HEADER PARA PRESENTAICON DE UNA TABLA (OPCIONALES)*/}

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "100%" }]}>
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
        <Text style={[styles.cell, { width: "50%" }]}>EMAIL (OPCIONAL)</Text>
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

      {/* ENCABEZADO PARA PRESENTAR "II. PELIGRO IDENTIFICADO" */}

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
              <Text>ADMINISTRACION Y RECURSOS HUMANOS</Text>
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
              <Text>CONTROL Y ASEGURAMIENTO DE LA CALIDAD</Text>
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

      <Footer />
    </Page>
  </Document>
);

export default ActivitiesReportPdf;
