import { dateFormat, timeFormat } from "@/lib/utils";
import { ObligatoryReport } from "@/types";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

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

const LIST = [
  "LA AEREONAVE ATERRIZA QUEDÁNDOSE SOLO CON EL COMBUSTIBLE DE RESERVA O MENOS",
  "SALIDA DE PISTA - RUNAWAY INCURSION",
  "DESPEGUE ABORTADO(REJETED TAKE OFF-RTO)",
  "ATERRIZAJE FUERTE (HARD LANDING)",
  "EL AVION ES EVACUADO",
  "INCURSION EN PISTA O CALLE DE RODAJE ( RUNAWAY INCURSION-RI)",
  "DERRAME DE COMBUSTIBLE",
  "FALLA DE MOTOR",
  "ALERTA DE FUEGO O HUMO",
  "FALLO EN LOS CONTROLES DE VUELO",
  "APROXIMACION NO ESTABILIZADA POR DEBAJO DE LOS 500 PIES VRF O 1000 PIES IRF",
  "ERROR  DE NAVEGACION CON DESVIACION SIGNIFICATIVA DE LA RUTA",
  "TAIL STRIKE",
  "WIND SHEAR",
  "PARAMETROS DE VUELO ANORMALES",
  "DESPREZURIZACION",
  "CASI COLISION (RESOLUCION ACVSORY-RA)",
  "IMPACTO CON AVES",
];

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

const ObligatoryReportPdf = ({ report }: { report: ObligatoryReport }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/*Encabezado de la pagina */}
      <Header />

      {/*Datos de la pagina*/}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "15%" }]}>
          FECHA DEL{"\n"}REPORTE
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          FECHA DEL{"\n"}SUCESO
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          HORA DEL{"\n"}SUCESO
        </Text>
        <Text style={[styles.cell, { width: "40%" }]}>
          LUGAR DONDE OCURRIO EL SUCESO
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>Nº DE REPORTE</Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.cell, { width: "15%" }]}>
          {dateFormat(report.report_date, "dd-MM-yyyy")}
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          {dateFormat(report.incident_date, "dd-MM-yyyy")}
        </Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          {timeFormat(report.incident_time)}
        </Text>
        <Text style={[styles.cell, { width: "40%" }]}>Pista de Aterrizaje</Text>
        <Text style={[styles.cell, { width: "15%" }]}>
          ROS-{report.report_code}
        </Text>
      </View>

      {/*ENCABEZADO PARA DATOS DE QUIEN REPORTE */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          I. DATOS DE QUIEN REPORTA
        </Text>
      </View>
      {/* ENCABEZADO PARA NOMBRE, LICENCIA Y VIA DE CONTACTO*/}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "35%" }]}>NOMBRE Y APELLIDOS</Text>
        <Text style={[styles.cell, { width: "17%" }]}>N° DE LICENCIA</Text>
        <Text style={[styles.cell, { width: "48%" }]}>VIA DE CONTACTO</Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "10%" }]}>PILOTO</Text>

        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.innerCell, { width: "25%" }]}>
            {report.pilot.first_name} {report.pilot.last_name}
          </Text>
        </View>

        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.innerCell, { width: "17%" }]}>
            {report.pilot.license_number}
          </Text>
        </View>
        <Text
          style={[
            styles.cell,
            { width: "24%", borderLeft: 1, borderBottom: 0 },
          ]}
        >
          TELEFONO
        </Text>
        <Text style={[styles.cell, { width: "24%", borderBottom: 0 }]}>
          CORREO ELECTRONICO
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "10%" }]}>COPILOTO</Text>

        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.innerCell, { width: "25%", borderWidth: 0 }]}>
            {report.copilot.first_name} {report.copilot.last_name}
          </Text>
        </View>

        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.innerCell, { width: "17%", borderWidth: 0 }]}>
            {report.copilot.license_number}
          </Text>
        </View>

        <View style={[styles.row, styles.table, styles.tableContent]}>
          <Text style={[styles.cell, { width: "24%", borderWidth: 0 }]}>
            {report.pilot.phone}
          </Text>
        </View>

        <View
          style={[
            styles.row,
            styles.table,
            styles.tableContent,
            { borderWidth: 1 },
          ]}
        >
          <Text style={[styles.cell, { width: "24%", borderWidth: 0 }]}>
            {report.pilot.email}
          </Text>
        </View>
      </View>

      {/*ENCABEZADO PARA DATOS DE VUELO */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          II. DATOS DEL VUELO
        </Text>
      </View>

      {/*COLUMNA PARA EL ENVABEZADO DE DATOS DE VUELO */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "13.33%" }]}>HORA</Text>
        <Text style={[styles.cell, { width: "19.98%" }]}>MATRICULA</Text>
        <Text style={[styles.cell, { width: "23.36%" }]}>N° DE VUELO</Text>
        <Text style={[styles.cell, { width: "43.33%" }]}>AEREONAVE</Text>
      </View>

      {/*CELDAS PARA MOSTRAR LOS DATOS DEL VUELO*/}
      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.innerCell, { width: "13.33%" }]}>
          {timeFormat(report.flight_time)}
        </Text>
        <Text style={[styles.cell, { width: "19.98%" }]}>
          {report.aircraft_acronym}
        </Text>
        <Text style={[styles.cell, { width: "23.36%" }]}>
          {report.flight_number}
        </Text>
        <Text style={[styles.cell, { width: "43.33%" }]}>
          {report.aircraft_model}
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cell, { width: "33.33%" }]}>ORIGEN</Text>
        <Text style={[styles.cell, { width: "33.33%" }]}>DESTINO</Text>
        <Text style={[styles.cell, { width: "33.33%" }]}>ALTERNO</Text>
      </View>

      {/*CELDAS PARA MOSTRAR LOS DATOS DEL VUELO - ORGIGEN / DESTINO / ALTERNO*/}
      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.innerCell, { width: "33.33%" }]}>
          {report.flight_origin}
        </Text>
        <Text style={[styles.cell, { width: "33.33%" }]}>
          {report.flight_destiny}
        </Text>
        <Text style={[styles.cell, { width: "33.33%" }]}>
          {report.flight_alt_destiny}
        </Text>
      </View>

      {/*ENCABEZADO PARA PRESENTAR LA LISTA DE POSIBLES INCIDENTES */}
      <View style={[styles.row, styles.table, styles.tableHeader]}>
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          III. SUCESOS DE OBLIGAORIO REPORTE
        </Text>
      </View>
      {/* CUADROS PARA CADA UNO DE LOS POSIBLES INSIDENTES CON SU CHECK BOX*/}

      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.innerCell, { width: "25%", borderRight: 1 }]}>
          LA AEREONAVE ATERRIZA{"\n"}QUEDÁNDOSE SOLO{"\n"}CON EL{"\n"}
          COMBUSTIBLE DE{"\n"}RESERVA O MENOS
        </Text>

        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          SALIDA DE{"\n"}PISTA{"\n"}(RUNAWAY INCURSION)
        </Text>
        <Text style={[styles.innerCell, { width: "16.66%", borderRight: 1 }]}>
          DESPEGUE{"\n"}ABORTADO{"\n"}(REJETED{"\n"}TAKE OFF-{"\n"}RTO)
        </Text>
        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          ATERRIZAJE{"\n"}FUERTE (HARD{"\n"}LANDING)
        </Text>
        <Text style={[styles.innerCell, { width: "18.45%", borderRight: 1 }]}>
          EL AVION ES{"\n"}EVACUADO
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.innerCell, { width: "25%", borderRight: 1 }]}>
          INCURSION EN PISTA{"\n"}O CALLE DE RODAJE{"\n"}(RUNAWAY INCURSION)
        </Text>

        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          DERRAME DE COMBUSTIBLE
        </Text>
        <Text style={[styles.innerCell, { width: "16.66%", borderRight: 1 }]}>
          FALLA DE UN MOTOR
        </Text>
        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          ALERTA DE FUEGO O HUMO
        </Text>
        <Text style={[styles.innerCell, { width: "18.45%", borderRight: 1 }]}>
          FALLO DE CONTROLES DE VUELO
        </Text>
      </View>

      <View style={[styles.row, styles.table, styles.tableContent]}>
        <Text style={[styles.innerCell, { width: "25%", borderRight: 1 }]}>
          APROXIMACION NO ESTABILIZADA POR DEBAJO DE LOS 500 PIES VRF O 1000
          PIES IFR
        </Text>

        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          ERROR DE NAVEGACION CON DESVIACION SIGNIFICATIVA DE LA RUTA
        </Text>
        <Text style={[styles.innerCell, { width: "16.66%", borderRight: 1 }]}>
          TAIL STRIKE
        </Text>
        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          WIND SHEAR
        </Text>
        <Text style={[styles.innerCell, { width: "18.45%", borderRight: 1 }]}>
          PARAMETROS DE VUELOS ANORMALES
        </Text>
      </View>

      <View
        style={[
          styles.row,
          styles.table,
          styles.tableContent,
          { borderBottom: 1 },
        ]}
      >
        <Text style={[styles.innerCell, { width: "25%", borderRight: 1 }]}>
          DESPREZURIZACION
        </Text>

        <Text style={[styles.innerCell, { width: "19.64%", borderRight: 1 }]}>
          CASI COLISION (RESOLUCION ACVESORYRA)
        </Text>
        <Text style={[styles.innerCell, { width: "16.66%", borderRight: 1 }]}>
          IMPACTO CON AVES
        </Text>
        <Text style={[styles.innerCell, { width: "38.1%", borderRight: 1 }]}>
          OTRO
        </Text>
      </View>

      <View style={styles.observationContainer}>
        <Text style={styles.title}>
          EN CASO DE HABER SELECCIONADO EL ITEM "OTRO", POR FAVOR, ESPECIFIQUE A
          CONTINUACION,A QUE TIPO DE{"\n"}
        </Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SUCESO SE REFIERE:</Text>
          <View style={styles.firstLine} />
        </View>

        {/* Líneas adicionales con interlineado de 1.5 */}
        <View style={styles.linesContainer}>
          {[...Array(2)].map((_, index) => (
            <View key={index} style={styles.line} />
          ))}
        </View>
      </View>
      {Footer(1)}
    </Page>

    <Page size="LETTER" style={styles.page}>
      <Header />
      <View
        style={[
          styles.row,
          styles.table,
          styles.tableHeader,
          { borderBottom: 1 },
        ]}
      >
        <Text style={[styles.cellHeader, { width: "100%" }]}>
          IV. DESCRIPCION DEL SUCESO
        </Text>
      </View>
      <View style={styles.observationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            A continuacion, describa claramentente el suceso que esta
            reportando:{" "}
          </Text>
          <View style={styles.firstLine} />
        </View>

        {/* Líneas adicionales con interlineado de 1.5 */}
        <View style={styles.linesContainer}>
          {[...Array(15)].map((_, index) => (
            <View key={index} style={styles.line} />
          ))}
        </View>
      </View>

      {/* Línea de firma */}

      <View style={styles.signatureContainer}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureText}>FIRMA</Text>
      </View>

      {Footer(2)}
    </Page>

    <Page size={"LETTER"} style={styles.page}>
      <Header />
      <View>
        <Text style={styles.underlinedTTitle}>INSTRUCTIVO DE LLENADO</Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveTitle}>
          • Fecha del reporte (DD/MM/AAAA):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar día, mes, año en que se realiza el reporte.
        </Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          • Fecha del suceso (DD/MM/AAAA):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar día, mes, año en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>• Hora del suceso (HLV):</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar la hora en la que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          • Lugar donde ocurrió el suceso:{" "}
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el lugar donde ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>• N° de reporte:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el número correlativo asignado al reporte por la Gerencia del
          SMS.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> I. DATOS DE QUIEN REPORTA </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>• Nombres y Apellidos:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar nombres y apellidos de la persona que realiza el reporte.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>• N° de Licencia: </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar número de licencia de la persona que realiza el reporte.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          • Vía de contacto (Teléfono/ Correo electrónico):
        </Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el número telefónico y/o el correo
        </Text>
      </View>
      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          electrónico de la persona que realiza el reporte.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>II. DATOS DE VUELO</Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Hora (HLV):</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar la hora real de despegue.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Matrícula: (HLV):</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar la matrícula de la aeronave en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • N° de vuelo:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar el número de vuelo en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Aeronave:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar modelo de la aeronave en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Origen:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar estación de origen del vuelo en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Destino:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar estación de destino del vuelo en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Alterno:</Text>
        <Text style={styles.instructiveText}>
          {" "}
          Colocar estación alterna del vuelo en que ocurrió el suceso.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          III. Sucesos de obligatorio reporte:{" "}
        </Text>
        <Text style={styles.instructiveText}>
          Marcar con una (X) el suceso obligatorio que se está
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          {"         "}reportando, en caso de no encontrarse dentro de las
          opciones, se deberá seleccionar el
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>
          {"         "}ítem “otro” y seguidamente especificar a qué suceso se
          refiere.
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>IV. Descripción del suceso:</Text>
        <Text style={styles.instructiveText}>
          {""}
          Colocar una descripción de los hechos ocurridos del suceso que
        </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}>se está reportando. </Text>
      </View>

      <View style={styles.instructiveContainer}>
        <Text style={styles.instructiveText}> • Firma: </Text>
        <Text style={styles.instructiveText}>
          {""}
          Colocar firma de la persona que realiza el reporte.{" "}
        </Text>
      </View>


      
      {Footer(3)}
    </Page>
  </Document>
);

export default ObligatoryReportPdf;
