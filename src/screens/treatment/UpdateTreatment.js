import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import VehicleDropDown from '../../components/VehicleDropDown'
import TreatmentDropDown from '../../components/TreatmentDropDown'
const db = DatabaseConnection.getConnection();


const UpdateTreatment = ({ navigation }) => {
  const [searchId, setSearchId] = useState("");
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [inDate, setInDate] = useState("");
  const [finDate, setFinDate] = useState("");
  const [price, setPrice] = useState("");
  //Da formato a el codigo y las fechas
  const idRegex = /\bT-[0-9]{4}\b/;
  const dateRegex = /\b[0-9]{2}-[0-9]{2}-[0-9]{4}\b/;

  const SearchTreatment = () => {
    console.log("searchTreatment");
    //Verifica que la Id este cargada
    if (!searchId.trim()) {
      Alert.alert("La Id es requerida");
      return;
    }
    //Selecciona los datos mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM treatment WHERE treatment_id = ?",
        [searchId],
        (tx, results) => {
          //Verifica resultado y carga los datos
          if (results.rows.length > 0) {
            setName(results.rows.item(0).treatment_name);
            setVehicle(results.rows.item(0).vehicle);
            setInDate(results.rows.item(0).inDate);
            setFinDate(results.rows.item(0).finDate);
            setPrice(results.rows.item(0).price.toString());
          } else {
            Alert.alert("Tratamiento no encontrado");
          }
        }
      );
    });
  };

  const updateTreatment = () => {
    console.log("updateTreatment");
    //Comprueba que no falten datos
    if (!name.trim() || !vehicle.trim() || !inDate.trim() || !finDate.trim() || !price.trim()) {
      Alert.alert("Faltan datos");
      return;
    }
    if (!idRegex.test(id)) {
      Alert.alert("Codigo no valido");
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
    //Modifica los datos mediante un consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE treatment SET treatment_name = ?, vehicle = ?, inDate = ?, finDate = ?, price = ?  WHERE treatment_id = ?",
        [name, vehicle, inDate, finDate, price, searchId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento modificado");
            navigation.navigate("TreatmentManagement");
          } else {
            Alert.alert("No se pudo modificar el Tratamiento");
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
              <CustomText text="Buscar tratamiento" style={styles.text} />
              <TreatmentDropDown
                defaultButtonText={"Tratamiento"}
                onSelect={setSearchId}
              />
              <CustomSingleButton title="Buscar" customPress={SearchTreatment} />
              <CustomInputText
                placeholder="Ingrese nombre de tartamiento"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <VehicleDropDown
                defaultButtonText={"Matricula"}
                onSelect={setVehicle}
                defaultValue={vehicle}
              />
              <CustomInputText
                placeholder="Ingrese fecha inicio (01-01-0001)"
                value={inDate}
                keyboardType="number-pad"
                onChangeText={(text) => setInDate(text)}
              />
              <CustomInputText
                placeholder="Ingrese fecha final (01-01-0001)"
                value={finDate}
                keyboardType="number-pad"
                onChangeText={(text) => setFinDate(text)}
              />
              <CustomInputText
                placeholder="Ingrese costo"
                value={price}
                keyboardType="number-pad"
                onChangeText={(text) => setPrice(text)}
              />
              <CustomSingleButton title="Modificar" customPress={updateTreatment} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UpdateTreatment

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