import { Activity } from "@/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { es } from "date-fns/locale";


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    backgroundColor: "#f7f7f7",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  sectionHeader: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionInfo: {
    fontSize: 12,
    color: "#555",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    backgroundColor: "#e0e0e0",
    padding: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  column: {
    width: "20%",
    textAlign: "center",
    padding: 5,
  },
  noRecords: {
    textAlign: "center",
    fontSize: 12,
    marginVertical: 10,
    color: "#f44336",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#777",
  },
});

const ActivitiesReportPdf = ({ activities }: { activities: Activity[] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Actividades</Text>
          <Text style={styles.subtitle}>{format(new Date(), "PPP", { locale: es })}</Text>
        </View>

        {/* Report Content */}
        {activities.length > 0 ? (
          <>
            <View style={styles.tableHeader}>
              <Text style={styles.column}>Hora Inicial</Text>
              <Text style={styles.column}>Hora Final</Text>
              <Text style={styles.column}>Empleado</Text>
              <Text style={styles.column}>Descripción</Text>
              <Text style={styles.column}>Resultado</Text>
            </View>
            {activities.map((activity, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.column}>{activity.initial_hour}</Text>
                <Text style={styles.column}>{activity.final_hour}</Text>
                <Text style={styles.column}>
                  {activity.employee.first_name} {activity.employee.last_name}
                </Text>
                <Text style={styles.column}>{activity.description}</Text>
                <Text style={styles.column}>{activity.result || "Pendiente"}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noRecords}>No hay actividades registradas.</Text>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Documento generado automáticamente. Guárdelo para su referencia.
        </Text>
      </Page>
    </Document>
  );
};

export default ActivitiesReportPdf;
