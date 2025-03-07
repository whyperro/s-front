import { ActivityReport } from "@/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JS comienzan desde 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    flexDirection: "row", // Mantiene la imagen y el título en la misma fila
    alignItems: "center",
    justifyContent: "center", // Centra el contenido
    marginBottom: 10,
  },
  logo: {
    width: 50, // Ajusta según el tamaño del logo
    height: 50,
    position: "absolute",
    left: 0, // Fijado en la esquina superior izquierda
  },
  titleContainer: {
    flexDirection: "column", // Asegura que el texto esté en dos líneas
    alignItems: "center", // Centra el texto
  },
  titleText: {
    fontSize: 14,
    fontWeight: 900, // Extra negrita
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
  name: {
    fontSize: 10,
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
    fontSize: 10,
    marginLeft: 40, // Movido más a la derecha
    marginTop: -8,
  },
});

const ActivitiesReportPdf = ({
  activities,
}: {
  activities: ActivityReport[];
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* HEADER CON LOGO Y TÍTULO */}
      <View style={styles.headerContainer}>
        {/* Logo en la esquina superior izquierda */}
        {/* <Image src="/ruta/del/logo.png" style={styles.logo} /> */}

        {/* Título en dos líneas */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>REGISTRO DE</Text>
          <Text style={styles.titleText}>ACTIVIDADES DIARIAS</Text>
        </View>
      </View>

      {/* INFORMACIÓN DEL ANALISTA, FIRMA Y FECHA */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={styles.label}>ANALISTA:</Text>
        <View style={{ width: "15%" }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              marginHorizontal: 0,
            }}
          >
            <Text style={[ styles.name, { paddingHorizontal: 10 }]}>
              {activities[0].user?.first_name} {activities[0].user?.last_name}
            </Text>
          </View>
        </View>
        <Text style={[styles.label, { marginLeft: 20 }]}>FIRMA: </Text>
        <View style={styles.inputLine}></View>

        {/* FECHA se mantiene en su posición, la línea se movió más a la derecha */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>FECHA:</Text>
          <Text style={styles.dateText}>{activities[0].date}</Text>
        </View>
      </View>

      {/* TABLA DE ACTIVIDADES */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "5%" }]}>N°</Text>
        <Text style={[styles.cell, { width: "40%" }]}>ACTIVIDAD</Text>
        <Text style={[styles.cell, { width: "10%" }]}>HORA</Text>
        <Text style={[styles.cell, { width: "45%" }]}>RESULTADO</Text>
      </View>

      {/* Iterar sobre cada ActivityReport y sus actividades */}
      {activities.map((activityReport, reportIndex) => (
        <View key={activityReport.id}>
          {activityReport.activities.map((activity, activityIndex) => (
            <View style={[styles.row, styles.table]} key={activity.id}>
              <Text style={[styles.cell, { width: "5%" }]}>
                {reportIndex * activityReport.activities.length +
                  activityIndex +
                  1}
              </Text>
              <Text style={[styles.cell, { width: "40%" }]}>
                {activity.description}
              </Text>
              <Text style={[styles.cell, { width: "10%" }]}>
                {activity.start_hour} - {activity.final_hour}
              </Text>
              <Text style={[styles.cell, { width: "45%" }]}>
                {activity.result || "N/A"}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {/* SECCIÓN DE OBSERVACIONES */}
      <Text style={[styles.footer, { marginTop: 20 }]}>OBSERVACIONES:</Text>
      <View style={{ borderWidth: 1, height: 50 }}></View>
    </Page>
  </Document>
);

export default ActivitiesReportPdf;
