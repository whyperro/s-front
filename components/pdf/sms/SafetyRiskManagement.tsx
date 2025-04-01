import { dateFormat, timeFormat } from "@/lib/utils";
import { DangerIdentificationWithAll, MitigationTable, VoluntaryReport } from "@/types";
import { Document, Page, StyleSheet, Text, View ,Image} from "@react-pdf/renderer";

const BLUE = "#d6eaf8";
const RED = "#fc0a0a";
const GREEN = "#0ebe36";
const WHITE = "#fff";
const GRAY = "#ebebeb";

// ... (your formatDate function and styles remain the same)

const styles = StyleSheet.create({
  logo: {
    width: 102,
    height: 43,
    position: "relative",
  },
  page: {
    padding: 30,
    backgroundColor: "#FFF",
  },

  footerContainer: {
    position: "absolute",
    bottom: 35,
    left: 30,
    right: 30,
    borderBottom: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    borderTop: 1,
    borderLeft: 1,
  },
  tableCell: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderRight: 1,
    borderColor: "#000", // Establecemos el color del borde
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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

  boldTitle: {
    fontFamily: "Helvetica-Bold",
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
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
  },
  instructiveSubTitle: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
  },
  underlinedTTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    textAlign: "center",
    textDecoration: "underline",
    marginVertical: 20,
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
  cellText4: {
    fontSize: 7,
  },
  cellTextHeader: {
    fontSize: 10,
    textAlign: "center",
  },
  column2Header: {
    width: "55%",
    flexDirection: "column",
    borderTop: 1,
    borderRight: 1,
  },
  column3Header: {
    width: "25%",
    flexDirection: "column",
    borderTop: 1,
    borderRight: 1,
  },
  rowColumnHeader: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRowHeader: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 20,
  },
  tableCellHeader: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const InstructiveFirstPart = () => (
  <View>
    <View style={{ marginTop: 10 }}>
      <Text style={styles.underlinedTTitle}>INSTRUCTIVO DE LLENADO</Text>
    </View>

    <View style={[styles.instructiveContainer, { marginBottom: 10 }]}>
      <Text style={styles.instructiveSubTitle}>
        1. NOTIFICACION DE PELIGROS
      </Text>
    </View>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>
        • Fecha de la identificación del peligro (DD/MM/AAAA):
      </Text>
      <Text style={styles.instructiveText}> Colocar el día, mes y año que</Text>
    </View>
    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveText}>se identifica el peligro.</Text>
    </View>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>
        • Fecha de la recepción del peligro (DD/MM/AAAA):
      </Text>
      <Text style={styles.instructiveText}> Colocar día, mes y año que se</Text>
    </View>
    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveText}>
        realizó la apertura del caso en el departamento de SMS.
      </Text>
    </View>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>• N° Caso: </Text>
      <Text style={styles.instructiveText}>
        Colocar el número correlativo a los casos
      </Text>
    </View>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>• Tipo de peligro: </Text>
      <Text style={styles.instructiveText}>
        Marcar con una (X) el tipo de peligro que se identificó.
      </Text>
    </View>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>
        • Área donde fue identificado el peligro:{" "}
      </Text>
      <Text style={styles.instructiveText}>
        Marcar con una (X) el área donde fue identificado
      </Text>
    </View>
    <Text style={styles.instructiveText}>el peligro.</Text>

    <View style={styles.instructiveContainer}>
      <Text style={styles.instructiveSubTitle}>
        • Método y fuente de la identificación de peligros:
      </Text>
      <Text style={styles.instructiveText}>
        Marcar con una (X) la(s) fuente(s) con
      </Text>
    </View>
    <Text style={[styles.instructiveText,{paddingLeft:8}]}>que se identificó el peligro.</Text>
  </View>
);

export const FirstPage = ({ report }: { report: VoluntaryReport },{ identification }: { identification: DangerIdentificationWithAll }) => (
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
        style={{
          ...styles.tableCell,
          width: "37%",
          backgroundColor: BLUE,
          alignItems: "flex-start",
          paddingLeft: 6,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
          FECHA DE LA IDENTIFICACION DEL
        </Text>
        <Text style={[styles.cellText, styles.boldTitle]}>PELIGRO:</Text>
      </View>
      <View
        style={{ ...styles.tableCell, width: "63%", backgroundColor: BLUE }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>
          TIPO DE PELIGRO
        </Text>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCell, width: "37%" }}>
        <Text style={styles.cellText}>
          {dateFormat(report.identification_date, "dd-MM-yyyy")}
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
        <Text style={[styles.cellText2, styles.boldTitle]}>NATURAL</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12.75%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>TECNICO</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18.75%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>ORGNIZACIONAL</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12.75%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>HUMANO</Text>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View
        style={{
          ...styles.tableCell,
          width: "27%",
          backgroundColor: BLUE,
          paddingLeft: 6,
          alignItems: "flex-start",
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
          FECHA DE LA RECEPCION DEL
        </Text>
        <Text style={[styles.cellText, styles.boldTitle]}>PELIGRO</Text>
      </View>
      <View
        style={{ ...styles.tableCell, width: "10%", backgroundColor: BLUE }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>N° CASO</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "18.75%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}>
          {report.danger_identification?.danger_type === "NATURAL" ? "X" : ""}
        </Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12.75%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}>
          {report.danger_identification?.danger_type === "TECNICO" ? "X" : ""}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18.75%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}>
          {report.danger_identification?.danger_type === "ORGANIZACIONAL"
            ? "X"
            : ""}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12.75%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}>
          {" "}
          {report.danger_identification?.danger_type === "HUMANO"
            ? "X"
            : ""}{" "}
        </Text>
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
        <Text style={styles.cellText2}>
          {dateFormat(report.report_date, "dd-MM-yyy")}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}>{report.report_number}</Text>
      </View>

      <View
        style={{ ...styles.tableCell, width: "63%", backgroundColor: BLUE }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
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
        <Text style={[styles.cellText, styles.boldTitle]}>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>PROACTIVO</Text>
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
        <Text style={[styles.cellText, styles.boldTitle]}>REACTIVO</Text>
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
        <Text style={[styles.cellText, { paddingLeft: 2 }]}>REPORTE</Text>
        <Text style={[styles.cellText, { paddingLeft: 2 }]}>VOLUNTARIO</Text>
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
        <Text style={[styles.cellText]}>GERENCIA DE CONTROL Y</Text>
        <Text style={[styles.cellText]}>CALIDAD</Text>
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
        <Text style={styles.cellTextHeader}>BREVE DESCRIPCION DEL PELIGRO</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>
          Por que Sucedio?
        </Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>Por que</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>Por que</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>Por que</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>Por que</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>
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

    <View style={[styles.tableRow, { borderBottom: 1 }]}>
      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          DIRECCION{"\n"}SMS
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
        <Text style={[styles.cellText3, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "15%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>OPERACIONES</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "5%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "20%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
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
        <Text style={[styles.cellText3, styles.boldTitle]}></Text>
      </View>
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
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
        <Text style={[styles.cellText3, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "15%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
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
        <Text style={[styles.cellText3, styles.boldTitle]}></Text>
      </View>
    </View>
    {Footer(1, 5)}
  </Page>
);

export const SecondPage = ({ report }: { report: VoluntaryReport }) => (
  <Page size={"LETTER"} style={styles.page}>
    <Header />

    <View style={[styles.tableRow, { marginTop: 6 }]}>
      <View
        style={{
          ...styles.tableCell,
          width: "100%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>
          {"\n"}
          FECHA DE INICIO DE LA GESTION:
          {"\n"}
          {"\n"}
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={styles.cellTextHeader}>POSIBLES CONSECUENCIAS:</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>1.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>2.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>3.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>4.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>5.</Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={styles.cellTextHeader}>DEFENSAS ACTUALES</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>1.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>2.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>3.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>4.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>5.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>6.</Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={styles.cellTextHeader}>
          CONSECUENCIA A EVALUAR PARA ESTABLECER LAS MEDIDAS DE MITIGACION:
        </Text>
      </View>
    </View>

    <View style={styles.tableRow}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>1</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>2</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>3</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>4</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>5</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "10%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText2}></Text>
      </View>
    </View>

    <View style={[styles.tableRow, { borderBottom: 1 }]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>PROBABILIDAD</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>SEVERIDAD</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>
          INDICE DE RIESGO{"\n"}INICIAL
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>
          TOLERABILIDAD DEL{"\n"}RIESGO
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow, { marginTop: 15 }]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={styles.cellTextHeader}>
          MEDIDAS DE MITIGACION A IMPLEMENTAR
        </Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>1.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>2.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>3.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>4.</Text>
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
        <Text style={[styles.cellText2, styles.boldTitle]}>5.</Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
          RESPONSABLE DE LA
        </Text>
        <Text style={[styles.cellText, styles.boldTitle]}>IMPLEMENTACION</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>FIRMA</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>RESPONSABLE</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>DEL</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>SEGUIMIENTO</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>FIRMA</Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>FECHA</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>ESTIMADA DE</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>EJECUCION</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>FECHA</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>REAL DE</Text>
        <Text style={[styles.cellText, styles.boldTitle]}>EJECUCION</Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>1.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>2.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>3.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>4.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>

    <View style={[styles.tableRow, { borderBottom: 1 }]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          paddingLeft: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>5.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "18%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      <View
        style={{
          ...styles.tableCell,
          width: "21%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>
    {Footer(2, 5)}
  </Page>
);

export const ThirdPage = ({ report }: { report: VoluntaryReport }) => (
  <Page size={"LETTER"} style={styles.page}>
    <Header />
    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>PROBABILIDAD</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>SEVERIDAD</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          INDICE DE RIESGO RESIDUAL
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          TOLERABILIDAD DEL{"\n"}RIESGO RESIDUAL
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "25%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText3, styles.boldTitle]}>
          {"\n"}
          {"\n"}
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={[styles.cellTextHeader, styles.boldTitle]}>
          3. CONTROL DE SEGUIMIENTO
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>
          FECHA DE{"\n"}SEGUIMIENTO DE{"\n"}LAS MEDIDAS DE{"\n"}MITIGACION
        </Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>OBSERVACIONES</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>
          RESPONSABLE DE{"\n"}LA{"\n"}IMPLEMENTACION
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>FIRMA</Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>
          RESPONSABLE DEL{"\n"}SEGUIMIENTO
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText4, styles.boldTitle]}>FIRMA</Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          padding: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>1.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>
    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          padding: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>2.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>
    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          padding: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>3.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>
    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          padding: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>4.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>
    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
          alignItems: "flex-start",
          padding: 4,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}>5.</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "17%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "19%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "12%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "23%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "14%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={[styles.cellText2, styles.boldTitle]}></Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      <View
        style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
      >
        <Text style={[styles.cellTextHeader, styles.boldTitle]}>
          4. CIERRE DEL CASO
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>FECHA DE CIERRE</Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
          FIRMA DEL REPRESENTANTE DE{"\n"}SMS
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: GRAY,
        }}
      >
        <Text style={[styles.cellText, styles.boldTitle]}>
          FIRMA DEL JEFE DEL AREA{"\n"}RESPONSABLE DE LA{"\n"}MITIGACION
        </Text>
      </View>
    </View>

    <View style={[styles.tableRow, { borderBottom: 1 }]}>
      {/*FECHA DE IDENTIFICACION DEL REPORTE*/}

      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText3}>
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/*LOCALIZACION DEL REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText3}>
          {"\n"}
          {"\n"}
        </Text>
      </View>

      {/*NUMERO DE REPORTE*/}
      <View
        style={{
          ...styles.tableCell,
          width: "33.33%",
          backgroundColor: WHITE,
        }}
      >
        <Text style={styles.cellText3}>
          {"\n"}
          {"\n"}
        </Text>
      </View>
    </View>
    <InstructiveFirstPart />
    {Footer(3, 5)}
  </Page>
);

/*
const FourthPage = ({ report }: { report: VoluntaryReport }) => (

)
*/
const SafetyRiskManagementPdf = ({ report }: { report: VoluntaryReport },{ identification }: { identification?: MitigationTable }) => (
  <Document>
    
  </Document>
);

const Header = () => (
  <View style={styles.tableRowHeader}>
    <View style={{ ...styles.tableCellHeader, width: "20%" }}>
      <Image src="/tmd_sms_header.jpg" style={styles.logo} />
    </View>
    <View style={styles.column2Header}>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>
          SISTEMA DE GESTION DE SEGURIDAD OPERACIONAL{"\n"}SMS
        </Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>
          REPORTE VOLUNTARIO DE PELIGROS
        </Text>
      </View>
    </View>
    <View style={styles.column3Header}>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>EDICION N: 01</Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={styles.cellTextHeader}>FECHA EDICION{"\n"}12/10/2023</Text>
      </View>
      <View style={styles.rowColumnHeader}>
        <Text style={[styles.cellTextHeader,{paddingTop:1}]}>CODIGO:{"\n"}TMD-FOR-SMS-002</Text>
      </View>
    </View>
  </View>
);

const Footer = (currentPage: number, pageNumber: number) => (
  <View style={styles.footerContainer}>
    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCell, width: "67%" }}>
        <Text style={styles.cellText}>
          DEPENDENCIA: DIRECCION DE GESTION DE LA SEGURIDAD OPERACIONAL
          {"\n"}(SMS)
        </Text>
      </View>

      <View style={{ ...styles.tableCell, width: "20%" }}>
        <Text style={styles.cellText}>REVISION N: 0</Text>
      </View>
      <View style={{ ...styles.tableCell, width: "13%" }}>
        <Text style={styles.cellText}>SMS</Text>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText}>
          ELABORADO POR:{"\n"}
          {"\n"}ASISTENTE DE SMS{"\n"}
        </Text>
      </View>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText}>
          REVISADO POR:{"\n"}
          {"\n"}DIRECTOR DE SMS{"\n"}
        </Text>
      </View>
      <View style={{ ...styles.tableCell, width: "29%" }}>
        <Text style={styles.cellText}>
          APROBADO POR:{"\n"}
          {"\n"}DIRECTOR DE OPERACIONES{"\n"}
        </Text>
      </View>

      <View style={{ ...styles.tableCell, width: "13%" }}>
        <Text style={styles.cellText}>
          NRO. PAGINA{"\n"}
          {"\n"}
          {currentPage} DE {pageNumber}
        </Text>
      </View>
    </View>
  </View>
);

export default SafetyRiskManagementPdf;
