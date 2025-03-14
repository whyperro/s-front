import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export type VoluntaryReportPdf = {
  id: number;
  report_number: string;
  report_date: Date;
  identification_date: Date;
  danger_location: string;
  danger_area: string;
  description: string;
  airport_location: string;
  possible_consequences: string;
  danger_identification_id: number;
  status: string;
  reporter_name?: string;
  reporter_last_name?: string;
  reporter_phone?: string;
  reporter_email?: string;
};

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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  reportContainer: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flex: 1,
    padding: 5,
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
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
});

const VoluntaryReportPdf = ({ report }: { report: VoluntaryReportPdf }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte Voluntario</Text>
          <Text style={styles.subtitle}>
            {format(new Date(), "PPP", { locale: es })}
          </Text>
        </View>

        {/* Report Container */}
        <View style={styles.reportContainer}>
          {/* First Row: Header, Dates, Location, Report Number */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Encabezado</Text>
              <Text style={styles.sectionInfo}>Reporte Voluntario</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Fecha del Reporte</Text>
              <Text style={styles.sectionInfo}>
                {format(new Date(report.report_date), "dd/MM/yyyy HH:mm")}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Fecha de Identificación</Text>
              <Text style={styles.sectionInfo}>
                {format(
                  new Date(report.identification_date),
                  "dd/MM/yyyy HH:mm"
                )}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <Text style={styles.sectionInfo}>{report.airport_location}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Número de Reporte</Text>
              <Text style={styles.sectionInfo}>{report.report_number}</Text>
            </View>
          </View>

          {/* Second Row: Reporter Details */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Detalles del Reportero</Text>
              <Text style={styles.sectionInfo}>
                Nombre: {report.reporter_name || "No especificado"}
              </Text>
              <Text style={styles.sectionInfo}>
                Apellido: {report.reporter_last_name || "No especificado"}
              </Text>
              <Text style={styles.sectionInfo}>
                Teléfono: {report.reporter_phone || "No especificado"}
              </Text>
              <Text style={styles.sectionInfo}>
                Correo Electrónico: {report.reporter_email || "No especificado"}
              </Text>
            </View>
          </View>

          {/* Third Row: Rest of the Data */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Detalles del Reporte</Text>
              <Text style={styles.sectionInfo}>
                Ubicación del Peligro: {report.danger_location}
              </Text>
              <Text style={styles.sectionInfo}>
                Área del Peligro: {report.danger_area}
              </Text>
              <Text style={styles.sectionInfo}>
                Descripción: {report.description}
              </Text>
              <Text style={styles.sectionInfo}>
                Posibles Consecuencias: {report.possible_consequences}
              </Text>
              <Text style={styles.sectionInfo}>
                ID de Identificación del Peligro:{" "}
                {report.danger_identification_id}
              </Text>
              <Text style={styles.sectionInfo}>Estado: {report.status}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Este es un documento generado automáticamente. Por favor, consérvelo
          para sus registros.
        </Text>
      </Page>
    </Document>
  );
};

export default VoluntaryReportPdf;
