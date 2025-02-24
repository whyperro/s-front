import { Activity } from "@/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: 10,
  },
  headerLine: {
    fontSize: 14,
    fontWeight: "bold",
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
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: "#ADD8E6",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 10,
    fontSize: 10,
  },
  inputLine: {
    borderBottomWidth: 1,
    width: "20%",
    marginLeft: 5,
  },
  label: {
    fontSize: 9,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 90, // FECHA se mantiene en su lugar
  },
  dateLabel: {
    fontSize: 9,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 40, // Movido más a la derecha
    marginTop: -8,
  },
});

const ActivitiesReportPdf = ({ activities }: { activities: Activity[] }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
    <View style={styles.headerContainer}>
        <Text style={styles.headerLine}>REGISTRO DE</Text>
        <Text style={styles.headerLine}>ACTIVIDADES DIARIAS</Text>
      </View>
      
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={styles.label}>ANALISTA: </Text>
        <View style={styles.inputLine}></View>
        <Text style={[styles.label, { marginLeft: 20 }]}>FIRMA: </Text>
        <View style={styles.inputLine}></View>

        {/* FECHA se mantiene en su posición, la línea se movió más a la derecha */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>FECHA:</Text>
          <Text style={styles.dateText}>____/____/____</Text>
        </View>
      </View>

      {/* ENCABEZADO DE LA TABLA (Con la columna "Hora" reducida) */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "5%" }]}>N°</Text>
        <Text style={[styles.cell, { width: "40%" }]}>ACTIVIDAD</Text>
        <Text style={[styles.cell, { width: "15%" }]}>HORA</Text>
        <Text style={[styles.cell, { width: "40%" }]}>RESULTADO</Text>
      </View>

      {/* FILAS DE LA TABLA */}
      {[...Array(10)].map((_, index) => (
        <View style={[styles.row, styles.table]} key={index}>
          <Text style={[styles.cell, { width: "5%" }]}>{index + 1}</Text>
          <Text style={[styles.cell, { width: "40%" }]}></Text>
          <Text style={[styles.cell, { width: "15%" }]}></Text>
          <Text style={[styles.cell, { width: "40%" }]}></Text>
        </View>
      ))}

      <Text style={[styles.footer, { marginTop: 20 }]}>OBSERVACIONES:</Text>
      <View style={{ borderWidth: 1, height: 50 }}></View>
    </Page>
  </Document>
);

export default ActivitiesReportPdf;