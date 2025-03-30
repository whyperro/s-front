import { dateFormat, timeFormat } from "@/lib/utils";
import { ObligatoryReport, VoluntaryReport } from "@/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const BLUE = "#d6eaf8";
const RED = "#fc0a0a";
const GREEN = "#0ebe36";
const WHITE = "#fff";
const GRAY = "#ebebeb";

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
    marginBottom: 30,
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
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    borderRight: 1,
    borderLeft: 1,
  },
  tableCell: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderTop: 1,
    borderRight: 1,
    borderColor: "#000", // Establecemos el color del borde
  },
  cellText: {
    fontSize: 9,
  },
  cellText2: {
    fontSize: 10,
  },
  cellText3: {
    fontSize: 8,
  },
  cellTextHeader: {
    fontSize: 12,
    fontWeight: "extrabold",
  },
});

const SafetyRiskManagementPdf = ({ report }: { report: VoluntaryReport }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/*Encabezado de la pagina */}
      <Header />
      <View style={[styles.tableRow, { marginTop: 8 }]}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellTextHeader}>1. NOTIFICACION DE PELIGROS</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "37%", backgroundColor: BLUE }}
        >
          <Text style={[styles.cellText]}>
            FECHA DE LA IDENTIFICACION DEL{"\n"}PELIGRO
          </Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "63%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText2}>TIPO DE PELIGRO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "37%" }}>
          <Text style={styles.cellText}>
            {dateFormat(report.report_date, "dd-MM-yyyy")}
          </Text>
        </View>

        {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

        <View
          style={{
            ...styles.tableCell,
            width: "18.75%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={styles.cellText2}>NATURAL</Text>
        </View>

        {/*LOCALIZACION DEL REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "12.75%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={styles.cellText2}>TECNICO</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "18.75%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={styles.cellText2}>ORGNIZACIONAL</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "12.75%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={styles.cellText2}>HUMANO</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "27%", backgroundColor: BLUE }}
        >
          <Text style={[styles.cellText]}>
            FECHA DE LA RECEPCION DEL{"\n"}PELIGRO
          </Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "10%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText2}>N CASO</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "18.75%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        {/*LOCALIZACION DEL REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "12.75%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "18.75%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "12.75%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}>{report.report_number}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "27%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "10%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}>X</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "63%", backgroundColor: BLUE }}
        >
          <Text style={[styles.cellText]}>
            METODO Y FUENTE DE LA IDENTIFICACION DE PELIGROS
          </Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "37%",
            backgroundColor: BLUE,
          }}
        >
          <Text style={[styles.cellText]}>
            AREA DONDE FUE IDENTIFICADO EL{"\n"}EL PELIGRO:
          </Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "31.5%",
            backgroundColor: GREEN,
          }}
        >
          <Text style={styles.cellText2}>PROACTIVO</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "31.5%",
            backgroundColor: RED,
            color: WHITE,
            fontWeight: "extrabold",
          }}
        >
          <Text style={[styles.cellText]}>REACTIVO</Text>
        </View>
      </View>

      {/* ESTA ES LA FILA EXTR*A QUE UAN NO SE SI FUNCIONARA*/}
      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "32%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>OPERACIONES</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
          }}
        >
          <Text style={[styles.cellText, { paddingLeft: 2 }]}>
            REPORTE
          </Text>
          <Text style={[styles.cellText, { paddingLeft: 2 }]}>
            VOLUNTARIO
          </Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>
      </View>

      {/* ESTA ES LA FILA EXTR*A QUE UAN NO SE SI FUNCIONARA*/}
      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "32%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>MANTENIMIENTO</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>AUDITORIA</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            borderTop: 0,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>REPORTE OBLIGATORIO</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>
      </View>

      {/* ESTA ES LA FILA EXTR*A QUE UAN NO SE SI FUNCIONARA*/}
      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "32%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>ADMINISTRACION Y RRHH</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>ENCUESTAS</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            borderTop: 0,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>
      </View>

      {/* ESTA ES LA FILA EXTR*A QUE UAN NO SE SI FUNCIONARA*/}
      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "32%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>
            GERENCIA DE CONTROL Y
          </Text>
          <Text style={[styles.cellText]}>
           CALIDAD
          </Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>INSPECCION</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>INVESTIGACION INTERNA</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>
      </View>

      {/* ESTA ES LA FILA EXTR*A QUE UAN NO SE SI FUNCIONARA*/}
      <View style={styles.tableRow}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "32%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>OTROS</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText2}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellText]}>ENTREVISTA</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "26.5%",
            backgroundColor: GRAY,
            borderWidth: 0,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText]}></Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellTextHeader}>
            BREVE DESCRIPCION DEL PELIGRO
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellTextHeader}>{"\n"}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellTextHeader}>{"\n"}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellTextHeader}>{"\n"}</Text>
        </View>
      </View>
      <View style={[styles.tableRow, { borderBottom: 1 }]}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellTextHeader}>{"\n"}</Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginTop: 15 }]}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellTextHeader}>ANALISIS CAUSA RAIZ</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellTextHeader]}>Por que Sucedio?</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellTextHeader]}>Por que</Text>
        </View>
      </View>
      <View style={[styles.tableRow]}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellTextHeader]}>Por que</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellTextHeader]}>Por que</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={[styles.cellTextHeader]}>Por que</Text>
        </View>
      </View>
      <View style={[styles.tableRow]}>
        <View
          style={{
            ...styles.tableCell,
            width: "100%",
            backgroundColor: WHITE,
            alignItems: "flex-start",
            paddingLeft: 4,
          }}
        >
          <Text style={styles.cellTextHeader}>
            Si el porque final no tiene una solucion controlable, vuelva al
            "porque" anterior
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellTextHeader}>2. GESTION DE RIESGOS</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellTextHeader}>
            AREA RESPONSABLE DE LA MITIGACION
          </Text>
        </View>
      </View>

      {/* FILA PARA LOS DATOS DEL AREA RESPONSABLE DE LA MITIGACION*/}

      <View style={[styles.tableRow, { borderBottom: 1, textAlign: "left" }]}>
        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "12%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText3]}>DIRECCION{"\n"}SMS</Text>
        </View>

        {/*NUMERO DE REPORTE*/}
        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={styles.cellText3}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "15%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText3]}>OPERACIONES</Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText3]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "20%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText3]}>
            MANTENIMIENTO Y{"\n"}PLANIFICACION
          </Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText3]}></Text>
        </View>
        <View
          style={{
            ...styles.tableCell,
            width: "18%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText3]}>
            GERENCIA DE{"\n"}ADMINISTRACION Y{"\n"}RRHH
          </Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText3]}></Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "15%",
            backgroundColor: GRAY,
          }}
        >
          <Text style={[styles.cellText3]}>
            GERENCIA DE{"\n"}CONTROL DE{"\n"}CALIDAD
          </Text>
        </View>

        <View
          style={{
            ...styles.tableCell,
            width: "5%",
            backgroundColor: WHITE,
          }}
        >
          <Text style={[styles.cellText3]}></Text>
        </View>
      </View>
      {Footer(1, 5)}
    </Page>
  </Document>
);

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

export default SafetyRiskManagementPdf;
