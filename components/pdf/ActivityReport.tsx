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
  header: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
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
  rightAlign: {
    position: "absolute",
    right: 50, // Moví la fecha más a la izquierda
  },
});

const ActivitiesReportPdf = ({ activities }: { activities: Activity[] }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.header}>REGISTRO DE ACTIVIDADES DIARIAS</Text>
      
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={styles.label}>ANALISTA: </Text>
        <View style={styles.inputLine}></View>
        <Text style={[styles.label, { marginLeft: 20 }]}>FIRMA: </Text>
        <View style={styles.inputLine}></View>
        <Text style={[styles.label, styles.rightAlign]}>FECHA: ____/____/____</Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "5%" }]}>N°</Text>
        <Text style={[styles.cell, { width: "30%" }]}>ACTIVIDAD</Text>
        <Text style={[styles.cell, { width: "15%" }]}>INICIO</Text>
        <Text style={[styles.cell, { width: "15%" }]}>FIN</Text>
        <Text style={[styles.cell, { width: "35%" }]}>RESULTADO</Text>
      </View>

      {[...Array(10)].map((_, index) => (
        <View style={[styles.row, styles.table]} key={index}>
          <Text style={[styles.cell, { width: "5%" }]}>{index + 1}</Text>
          <Text style={[styles.cell, { width: "30%" }]}></Text>
          <Text style={[styles.cell, { width: "15%" }]}></Text>
          <Text style={[styles.cell, { width: "15%" }]}></Text>
          <Text style={[styles.cell, { width: "35%" }]}></Text>
        </View>
      ))}

      <Text style={[styles.footer, { marginTop: 20 }]}>OBSERVACIONES:</Text>
      <View style={{ borderWidth: 1, height: 50 }}></View>
    </Page>
  </Document>
);

export default ActivitiesReportPdf;
