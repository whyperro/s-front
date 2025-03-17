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
    paddingTop: 2,
    width: 165,
    height: 30,
    position: "absolute",
    left: 0,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
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
    marginTop: 10,
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
    padding: "5",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    textAlign: "center",
    fontSize: 8,
  },

  container: {
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "row",
  },

  containerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    backgroundColor:"#abdbe3",
  },

  Container2: { display: "flex", flexDirection: "row" },

  Container3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#abdbe3",
  },

  ContainerAreaType: { width: "100%" },

  lineContainer: {
    borderTop: "1px",
  },
});

const ActivitiesReportPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    {/* Change the Page size and remove or change orientation */}
    <Page style={styles.page}>
      {/* HEADER CON LOGO Y TÍTULO */}
      <View style={styles.headerContainer}>
        <Image src="/tmd_nombre.png" style={styles.logo} />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            IMPORTANTE: EL REPORTE VOLUNTARIO DE
          </Text>
          <Text style={styles.titleText}>
            PELIGRO PUEDE SER ANONIMO, ES CONFIDENCIAL Y NO PUNITIVO.
          </Text>
        </View>
      </View>

      {/* INFORMACIÓN DEL ANALISTA, FIRMA Y FECHA */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={styles.label}>ANALISTA:</Text>
        <View style={{ width: "50%" }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              marginHorizontal: 0,
            }}
          >
            <Text style={[styles.name, { paddingHorizontal: 10 }]}>
              {report.danger_area} {report.danger_location}
            </Text>
          </View>
        </View>
        <Text style={[styles.label, { marginLeft: 20 }]}>FIRMA: </Text>
        <View style={styles.inputLine}></View>

        {/* FECHA se mantiene en su posición, la línea se movió más a la derecha */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>FECHA:</Text>
          <Text style={styles.dateText}>{report.report_number}</Text>
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
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "20%" }]}>AREA AFECTADAS</Text>
        <Text style={[styles.cell, { width: "35%" }]}>OPERACIONES</Text>
        <Text style={[styles.check, { width: "5%" }]}></Text>
        <Text style={[styles.cell, { width: "35%" }]}>MANTENIMIENTO</Text>
        <Text style={[styles.check, { width: "5%" }]}></Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "20%" }]}>AREA AFECTADAS</Text>
        <Text style={[styles.cell, { width: "35%" }]}>
          ADMINISTRACION Y RECURSOS{"\n"}HUMANOS
        </Text>
        <Text style={[styles.check, { width: "5%" }]}></Text>
        <Text style={[styles.cell, { width: "35%" }]}>
          CONTROL Y ASEGURAMIENTO DE LA{"\n"}CALIDAD
        </Text>
        <Text style={[styles.check, { width: "5%" }]}></Text>
      </View>

      {/* SECCIÓN DE OBSERVACIONES */}
      <Text style={[styles.footer, { marginBottom: 5 }]}>OBSERVACIONES:</Text>
      <View style={styles.observationContainer}>
        <Text style={styles.observationText}>{report.status}</Text>
      </View>

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
            <Text>MANTENIMIENTO</Text>
            <View style={[styles.lineContainer]}>
              <Text>CONTROL Y ASEGURAMIENTO DE LA CALIDAD</Text>
            </View>
          </View>

          <View style={[styles.Container3]}>
            <Text style={[styles.check]}>_</Text>
            <Text style={[styles.check]}>_</Text>
          </View>
        </View>
      </View>
    </Page>




    
  </Document>
);

export default ActivitiesReportPdf;
