import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const BLUE = "#d6eaf8";
const RED = "#fc0a0a";
const GREEN = "#0ebe36";
const WHITE = "#fff";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFF",
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
  cellText: {
    fontSize: 8,
  },
  cellText2: {
    fontSize: 9,
  },
  areaContainer: {
    flexDirection: "row",
    height: "5%",
    borderTop: 1,
  },
  areaLeftColumn: {
    width: "15%",
  },
  areaRightColumns: {
    width: "85%",
    flexDirection: "column",
  },
  areaRow: {
    flexDirection: "row",
    flex: 1,
  },
  areaSubCell: {
    flex: 1,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRight: 1,
    borderBottom: 1,
    borderColor: "#000",
    backgroundColor: BLUE,
  },
  // Nuevo estilo para celdas con X
  xCell: {
    width: "5%", // Ancho fijo pequeño para celdas con X
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRight: 1,
    borderBottom: 1,
    borderColor: "#000",
    backgroundColor: WHITE,
  },
  // Estilo para celdas de texto (más anchas)
  textCell: {
    width: "45%", // Ajusta este valor según necesites
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRight: 1,
    borderBottom: 1,
    borderColor: "#000",
    backgroundColor: BLUE,
  },

  observationContainer: {
    borderRight: 1,
    borderLeft: 1,
    padding: 5,
    minHeight: 50,
    borderBottom: 1,
    //FALTA POSIBLE LINEA INFERIOR
  },

  observationText: {
    fontSize: 8,
    margin: 5,
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

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    width: "100%",
    marginBottom: 18,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline", // Asegura que el texto y la línea estén en la misma línea
    marginBottom: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerContainer: {
    position: "absolute",
    bottom: 35,
    left: 30,
    right: 30,
    borderBottom: 1,
    borderColor: "#000",
  },

  blackText: {
    fontFamily: "Helvetica",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "black",
  },

  // ESTILOS PARA EL HEADER DE LA PAGINA
  tableRowHeader: {
    flexDirection: "row",
    marginTop:40,
    marginBottom:20,
  },
  tableCellHeader: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
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
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page} size={"LETTER"}>
      <View style={styles.tableRowHeader}>
        <View style={{ ...styles.tableCellHeader, width: "20%" }}>
          <Text style={styles.cellTextHeader}>Recuadro 1</Text>
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
            <Text style={styles.cellTextHeader}>
              FECHA EDICION{"\n"}12/10/2023
            </Text>
          </View>
          <View style={styles.rowColumnHeader}>
            <Text style={styles.cellTextHeader}>
              CODIGO:{"\n"}TMD-FOR-SMS-002
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.blackText, { width: "100%" }]}>
        <Text style={[styles.blackText]}>
          <Text style={{ textDecoration: "underline" }}>IMPORTANTE </Text>
        </Text>
        : EL REPORTE VOLUNTARIO DE
      </Text>
      <Text style={[styles.blackText]}>
        PELIGRO PUEDE SER ANONIMO, ES CONFIDENCIAL Y NO PUNITIVO.
      </Text>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>FECHA DEL{"\n"}REPORTE</Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "20%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>
            FECHA EN QUE SE{"\n"}IDENTIFICO EL PELIGRO{" "}
          </Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>
            LUGAR DONDE SE IDENTIFICO EL PELIGRO
          </Text>
        </View>
        <View
          style={{ ...styles.tableCell, width: "15%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>N DE REPORTE</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>12/10/2025</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "20%" }}>
          <Text style={styles.cellText}>12/10/2025</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "50%" }}>
          <Text style={styles.cellText}>HANGAR13B</Text>
        </View>
        <View style={{ ...styles.tableCell, width: "15%" }}>
          <Text style={styles.cellText}>123</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>I. DATOS DE QUIEN REPORTA</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>NOMBRES (OPCIONAL)</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>APELLIDOS (OPCIONAL)</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellText}>ALVARO</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellText}>AGUINAGALDE</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>TELEFONO (OPCIONAL)</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>CORREO ELECTRONICO (OPCIONAL)</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellText}>04129321507</Text>
        </View>

        <View
          style={{ ...styles.tableCell, width: "50%", backgroundColor: WHITE }}
        >
          <Text style={styles.cellText}>ALVARO@GMAIL.COM</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View
          style={{ ...styles.tableCell, width: "100%", backgroundColor: BLUE }}
        >
          <Text style={styles.cellText}>II. PELIGRO IDENTIFICADO</Text>
        </View>
      </View>

      <View style={styles.areaContainer}>
        <View
          style={[
            styles.tableCell,
            styles.areaLeftColumn,
            {
              backgroundColor: BLUE,
              height: "100%",
              borderLeft: 1,
              borderBottom: 1,
            },
          ]}
        >
          <Text style={styles.cellText}>AREA AFECTADA</Text>
        </View>

        <View style={styles.areaRightColumns}>
          <View style={styles.areaRow}>
            <View style={styles.textCell}>
              <Text style={styles.cellText}>OPERACIONES</Text>
            </View>
            <View style={styles.xCell}>
              <Text style={styles.cellText}>X</Text>
            </View>
            <View style={styles.textCell}>
              <Text style={styles.cellText}>MANTENIMIENTO</Text>
            </View>
            <View style={styles.xCell}>
              <Text style={styles.cellText}>X</Text>
            </View>
          </View>

          <View style={styles.areaRow}>
            <View style={styles.textCell}>
              <Text style={styles.cellText}>
                ADMINISTRACION Y RECURSOS HUMANOS
              </Text>
            </View>
            <View style={styles.xCell}>
              <Text style={styles.cellText}>X</Text>
            </View>
            <View style={styles.textCell}>
              <Text style={styles.cellText}>
                CONTROL Y ASEGURAMIENTO DE LA CALIDAD
              </Text>
            </View>
            <View style={styles.xCell}>
              <Text style={styles.cellText}>X</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.observationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            A continuación, describa claramente el peligro que esta reportando:
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

      <View style={styles.footerContainer}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCell, width: "67%" }}>
            <Text style={styles.cellText2}>
              DEPENDENCIA: DIRECCION DE GESTION DE LA SEGURIDAD OPERACIONAL
              {"\n"}(SMS)
            </Text>
          </View>
          <View style={{ ...styles.tableCell, width: "20%" }}>
            <Text style={styles.cellText2}>REVISION N:00</Text>
          </View>
          <View style={{ ...styles.tableCell, width: "13%" }}>
            <Text style={styles.cellText2}>SMS</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCell, width: "29%" }}>
            <Text style={styles.cellText2}>
              ELABORADO POR:{"\n"}ASISTENTE DE SMS
            </Text>
          </View>
          <View style={{ ...styles.tableCell, width: "29%" }}>
            <Text style={styles.cellText2}>
              REVISADO POR:{"\n"}DIRECTOR DE SMS
            </Text>
          </View>
          <View style={{ ...styles.tableCell, width: "29%" }}>
            <Text style={styles.cellText2}>
              APROBADO POR:{"\n"}DIRECTOR DE OPERACIONES
            </Text>
          </View>

          <View style={{ ...styles.tableCell, width: "13%" }}>
            <Text style={styles.cellText2}>NRO. PAGINA{"\n"}1 DE 2</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
