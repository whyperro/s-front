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
    fontSize: 8,
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
    backgroundColor: "#ADD8E6",
    fontWeight: "bold",
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
});

const ActivitiesReportPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    {/* Change the Page size and remove or change orientation */}
    <Page style={styles.page}>
      {/* HEADER CON LOGO Y TÍTULO */}
      <View style={styles.headerContainer}>
        <Image src="/tmd_nombre.png" style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>REGISTRO DE</Text>
          <Text style={styles.titleText}>ACTIVIDADES DIARIAS</Text>
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
        <Text style={[styles.cell, { width: "15%" }]}>Fecha del Reporte</Text>
        <Text style={[styles.cell, { width: "55%" }]}>Fecha en que se identifico el peligro</Text>
        <Text style={[styles.cell, { width: "15%" }]}>Lugar donde se detecto el peligro</Text>
        <Text style={[styles.cell, { width: "15%" }]}>Numero de Reporte</Text>
      </View>

      {/* SECCIÓN DE OBSERVACIONES */}
      <Text style={[styles.footer, { marginBottom: 5 }]}>OBSERVACIONES:</Text>
      <View style={styles.observationContainer}>
        <Text style={styles.observationText}>{report.status}</Text>
      </View>
    </Page>
  </Document>
);

export default ActivitiesReportPdf;
