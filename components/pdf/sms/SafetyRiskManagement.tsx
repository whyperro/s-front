import { dateFormat, timeFormat } from "@/lib/utils";
import { ObligatoryReport, VoluntaryReport } from "@/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

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
  innerCell: {
    display: "flex",
    justifyContent: "center",
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
  tableContent: {
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#e3f4ff",
    fontWeight: "extrabold",
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableHeaderGray: {
    backgroundColor: "#e1dfe1",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableHeaderRed: {
    backgroundColor: "#ff1111",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableHeaderGreen: {
    backgroundColor: "#03b945",
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
    borderTop: 0,
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
    fontSize: 8,
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
    marginBottom: 40,
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
  gridContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  gridRow: {
    flexDirection: "row",
  },
  gridCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 10,
  },
  incidentText: {
    fontSize: 9,
    flex: 1,
    textAlign: "left",
  },
  checkCell: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    marginLeft: 10,
  },
  signatureContainer: {
    alignItems: "center", // Centra la línea y el texto horizontalmente
    marginTop: 140, // Espacio entre la tabla y la firma
  },
  signatureLine: {
    width: 160, // Ajusta el ancho para que sea aproximadamente 5.5 cm (dependiendo de la densidad de píxeles)
    height: 0.5, // Grosor de la línea
    backgroundColor: "black", // Color de la línea
  },
  signatureText: {
    fontSize: 10,
    fontFamily: "Helvetica",
    marginTop: 20, // Espacio entre la línea y el texto
  },
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

const SafetyRiskManagementPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/*Encabezado de la pagina */}
      <Header />

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          1. NOTIFICACION DE PELIGROS
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "35%" }]}>
          FECHA DE LA IDENTIFICACION DEL PELIGRO
        </Text>
        <Text style={[styles.cellHeader, { width: "65%" }]}>
          TIPO DE PELIGRO
        </Text>
      </View>

      <View>
        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.cellHeader, { width: "35%" }]}>
            {dateFormat(report.identification_date, "dd-MM-yyyy")}
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderGray,
              { width: "16.25%" },
            ]}
          >
            NATURAL
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderGray,
              { width: "16.25%" },
            ]}
          >
            TECNICO
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderGray,
              { width: "16.25%" },
            ]}
          >
            ORGANIZACIONAL
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderGray,
              { width: "16.25%" },
            ]}
          >
            HUMANO
          </Text>
        </View>
      </View>

      <View>
        <View style={[styles.row, styles.table, styles.tableContent ,{justifyContent: "center"}] }>
          <Text
            style={[styles.cellHeader, styles.tableHeader, { width: "25%" }]}
          >
            FECHA DE LA RECEPCION DEL PELIGRO
          </Text>
          <Text
            style={[styles.cellHeader, styles.tableHeader, { width: "10%" }]}
          >
            N DE CASO
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "16.25%" },
            ]}
          >
            NATURAL
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "16.25%" },
            ]}
          >
            TECNICO
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "16.25%" },
            ]}
          >
            ORGANIZACIONAL
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "16.25%" },
            ]}
          >
            HUMANO
          </Text>
        </View>
      </View>

      <View>
        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "25%" },
            ]}
          >
            {dateFormat(report.report_date, "dd-MM-yyyy")}
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderText,
              { width: "10%" },
            ]}
          >
            {report.report_number}
          </Text>
          <Text
            style={[styles.cellHeader, styles.tableHeader, { width: "65%" }]}
          >
            METODO Y FUENTE DE LA IDENTIFICACION DE PELIGROS
          </Text>
        </View>
      </View>

      <View>
        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text
            style={[styles.cellHeader, styles.tableHeader, { width: "25%" }]}
          >
            AREA DONDE FUE IDENTIFICADO EL PELIGRO
          </Text>
          <Text
            style={[styles.cellHeader, styles.tableHeader, { width: "10%" }]}
          >
            N DE CASO
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderGreen,
              { width: "32.5%" ,fontWeight:"extrabold" },
            ]}
          >
            PROACTIVO
          </Text>
          <Text
            style={[
              styles.cellHeader,
              styles.tableHeaderRed,
              { width: "32.5%", textDecorationColor: "white", color:"#fff" , fontWeight:"bold" },
            ]}
          >
            REACTIVO
          </Text>
        </View>
      </View>

      {Footer(1)}
    </Page>
  </Document>
);

export default SafetyRiskManagementPdf;

const Header = () => (
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
          CÓDIGO: TMD-FOR-SMS-003
        </Text>
      </View>
    </View>
  </View>
);

const Footer = (pageNumber: number, pages: number = 3) => (
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
        NRO. PÁGINA {"\n"} {pageNumber} DE {pages}
      </Text>
    </View>
  </View>
);
