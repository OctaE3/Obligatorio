import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

const AddVehicle = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serial, setSerial] = useState('');
  //Da formato a la matricula y la serial del motor
  const matriculaRegex = /\b[A-Z]{3}\d{4}\b/;
  const serialRegex = /\b([A-Z0-9]){17}\b/;

  const clearData = () => {
    setMatricula("");
    setMarca("");
    setColor("");
    setSerial("");
  };

  const addvehicle = () => {
    //Verifica que esten todos los datos
    console.log("state", matricula, marca, color, serial)
    debugger;
    if (!matriculaRegex.test(matricula)) {
      Alert.alert("Matricula invalida")
      return;
    }
    if (!marca.trim()) {
      Alert.alert("Ingrese la Marca");
      return;
    }
    if (!color.trim()) {
      Alert.alert("Ingrese el Color");
      return;
    }
    if (!serialRegex.test(serial)) {
      Alert.alert("Serial del Motor invalida");
      return;
    }
    //Inserta en la tabla vehiculos mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO vehicle (matricula, marca, color, serial) VALUES (?, ?, ?,?)`,
        [matricula, marca, color, serial],
        (tx, results) => {
          console.log("results", results);
          //Verificar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Vehiculo Añadido!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("VehiclesManagement"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al Añadir el Vehiculo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <CustomInputText
                placeholder="Matricula"
                onChangeText={setMatricula}
                style={styles.Input}
                value={matricula}
              />

              <CustomInputText
                placeholder="Marca"
                onChangeText={setMarca}
                style={styles.Input}
                value={marca}
              />
              <CustomInputText
                placeholder="Color"
                onChangeText={setColor}
                style={styles.Input}
                value={color}
              />
              <CustomInputText
                placeholder="Serial del Motor"
                onChangeText={setSerial}
                style={styles.Input}
                value={serial}
              />
              <CustomSingleButton
                title="Registrar"
                customPress={addvehicle}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddVehicle

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  Input: {
    padding: 15,
    textAlignVertical: "top",
  }
})