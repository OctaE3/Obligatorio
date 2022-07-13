import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import VehicleDropDown from '../../components/VehicleDropDown';
const db = DatabaseConnection.getConnection();


const UpdateVehicle = ({ navigation }) => {
  const [searchMatricula, setSearchMatricula] = useState("");
  const [matricula, setMatricula] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [serial, setSerial] = useState("");
  //Da formato a la matricula y la serial del motor
  const matriculaRegex = /\b[A-Z]{3}\d{4}\b/;
  const serialRegex = /\b([A-Z0-9]){17}\b/;

  const SearchVehicle = () => {
    console.log("searchVehicle");
    //Verifica que la maticula este cargada
    if (!searchMatricula.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }
    //Selecciona los datos mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM vehicle WHERE matricula = ?",
        [searchMatricula],
        (tx, results) => {
          //Verifica resultado y carga los datos
          if (results.rows.length > 0) {
            setMatricula(results.rows.item(0).matricula);
            setMarca(results.rows.item(0).marca);
            setColor(results.rows.item(0).color);
            setSerial(results.rows.item(0).serial);
          } else {
            Alert.alert("Vehiculo no encontrado");
          }
        }
      );
    });
  };

  const UpdateVehicle = () => {
    console.log("updateVehicle");
    //Comprueba que no falten datos
    if (!matricula.trim() || !marca.trim() || !color.trim() || !serial.trim()) {
      Alert.alert("Faltan datos");
      return;
    }
    if (!matriculaRegex.test(matricula)) {
      Alert.alert("Matricula invalida")
      return;
    }
    if (!serialRegex.test(serial)) {
      Alert.alert("Serial del Motor invalida");
      return;
    }
    //Modifica los datos mediante un consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE vehicle SET matricula = ?, marca = ?, color = ?, serial = ? WHERE matricula = ?",
        [matricula, marca, color, serial, searchMatricula],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo modificado");
            navigation.navigate("VehiclesManagement");
          } else {
            Alert.alert("No se pudo modificar el vehiculo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
              <CustomText text="Buscar vehiculo" style={styles.text} />
              <VehicleDropDown
                defaultButtonText={"Matricula"}
                onSelect={setSearchMatricula}
              />
              <CustomSingleButton title="Buscar" customPress={SearchVehicle} />
              <CustomInputText
                placeholder="Ingrese la matricula"
                value={matricula}
                onChangeText={(text) => setMatricula(text)}
              />
              <CustomInputText
                placeholder="Ingrese la marca"
                value={marca}
                onChangeText={(text) => setMarca(text)}
              />
              <CustomInputText
                placeholder="Ingrese el color"
                value={color}
                onChangeText={(text) => setColor(text)}
              />
              <CustomInputText
                placeholder="Ingrese la serial"
                value={serial}
                onChangeText={(text) => setSerial(text)}
              />
              <CustomSingleButton title="Modificar" customPress={UpdateVehicle} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UpdateVehicle

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },

})