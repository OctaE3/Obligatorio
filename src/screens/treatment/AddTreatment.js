import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Dimensions } from 'react-native'
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from '../../database/database-connection';
import VehicleDropDown from '../../components/VehicleDropDown';
const db = DatabaseConnection.getConnection();

const AddTreatment = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [inDate, setInDate] = useState('');
  const [finDate, setFinDate] = useState('');
  const [price, setPrice] = useState('');
  //Da formato a el codigo y las fechas
  const idRegex = /\bT-[0-9]{4}\b/;
  const dateRegex = /\b[0-9]{2}-[0-9]{2}-[0-9]{4}\b/;


  const clearData = () => {
    setId("");
    setName("");
    setVehicle("");
    setInDate("");
    setFinDate("");
    setPrice("");
  };

  const addTreatment = () => {
    //Verifica que esten todos los datos
    console.log("state", id, name, vehicle, inDate, finDate, price)
    if (!idRegex.test(id)) {
      Alert.alert("Codigo no valido");
      return;
    }
    if (!name.trim()) {
      Alert.alert("Ingrese nombre");
      return;
    }
    if (!vehicle.trim()) {
      Alert.alert("Ingrese matricula");
      return;
    }
    if (!dateRegex.test(inDate)) {
      Alert.alert("Ingrese fecha inicio valida");
      return;
    }
    if (!dateRegex.test(finDate)) {
      Alert.alert("Ingrese fecha final valida");
      return;
    }
    if (!price.trim()) {
      Alert.alert("Ingrese precio");
      return;
    }
    //Inserta en la tabla tratamientos mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO treatment (treatment_id, treatment_name, vehicle, inDate, finDate, price) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, vehicle, inDate, finDate, price],
        (tx, results) => {
          console.log("results", results);
          //Verificar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Tratamiento Añadido!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("TreatmentManagement"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al Añadir el Tratamiento");
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
                placeholder="Codigo Tratamiento(T-1234)"
                onChangeText={setId}
                style={styles.Input}
                value={id}
              />
              <CustomInputText
                placeholder="Nombre Tratamiento"
                onChangeText={setName}
                style={styles.Input}
                value={name}
              />
              <VehicleDropDown
                defaultButtonText={"Matricula"}
                onSelect={setVehicle}
              />
              <CustomInputText
                placeholder="Fecha inicio (01-01-0001)"
                onChangeText={setInDate}
                keyboardType="number-pad"
                style={styles.Input}
                value={inDate}
              />
              <CustomInputText
                placeholder="Fecha final (01-01-0001)"
                onChangeText={setFinDate}
                keyboardType="number-pad"
                style={styles.Input}
                value={finDate}
              />
              <CustomInputText
                placeholder="Costo"
                onChangeText={setPrice}
                keyboardType="number-pad"
                style={styles.Input}
                value={price}
              />
              <CustomSingleButton
                title="Registrar"
                customPress={addTreatment}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddTreatment

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