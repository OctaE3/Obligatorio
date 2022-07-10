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

  const clearData = () => {
    setId("");
    setName("");
    setVehicle("");
    setInDate("");
    setFinDate("");
    setPrice("");
  };

  const addTreatment = () => {
    console.log("state", id, name, vehicle, inDate, finDate, price)
    if (!id.trim()) {
      Alert.alert("Ingrese codigo");
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
    if (!inDate.trim()) {
      Alert.alert("Ingrese fecha inicio");
      return;
    }
    if (!finDate.trim()) {
      Alert.alert("Ingrese fecha final");
      return;
    }
    if (!price.trim()) {
      Alert.alert("Ingrese precio");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO treatment (treatment_id, treatment_name, vehicle, inDate, finDate, price) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, vehicle, inDate, finDate, price],
        (tx, results) => {
          console.log("results", results);
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
                placeholder="Codigo Tratamiento"
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
                placeholder="Fecha inicio"
                onChangeText={setInDate}
                style={styles.Input}
                value={inDate}
              />
              <CustomInputText
                placeholder="Fecha final"
                onChangeText={setFinDate}
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