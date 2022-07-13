import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import ReplacementDropDown from '../../components/ReplacementDropDown';
import TreatmentDropDown from '../../components/TreatmentDropDown'
const db = DatabaseConnection.getConnection();

const UpdateReplacement = ({ navigation }) => {
  const [searchId, setSearchId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [treatment, setTreatment] = useState("");

  const searchReplacement = () => {
    console.log("searchReplacement");
    //Verifica que la Id este cargada
    if (!searchId.trim()) {
      Alert.alert("El codigo es requerido");
      return;
    }
    //Selecciona los datos mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM replacement WHERE replacement_id = ?",
        [searchId],
        (tx, results) => {
          //Verifica resultado y carga los datos
          if (results.rows.length > 0) {
            setName(results.rows.item(0).replacement_name);
            setAmount(results.rows.item(0).amount);
            setTreatment(results.rows.item(0).treatment);
          } else {
            Alert.alert("Repuesto no encontrado");
          }
        }
      );
    });
  };

  const updateReplacement = () => {
    console.log("updateReplacement");
    //Comprueba que no falten datos
    if (!name.trim() || !amount.trim() || !treatment.trim()) {
      Alert.alert("Faltan datos");
      return;
    }
    //Modifica los datos mediante un consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE replacement SET replacement_name = ?, amount = ?, treatment = ? WHERE replacement_id = ?",
        [name, amount, treatment, searchId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto modificado");
            navigation.navigate("ReplacementManagement");
          } else {
            Alert.alert("No se pudo modificar el repuesto");
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
              <CustomText text="Buscar repuesto" style={styles.text} />
              <ReplacementDropDown
                defaultButtonText={"Codigo"}
                onSelect={setSearchId}
              />
              <CustomSingleButton title="Buscar" customPress={searchReplacement} />
              <CustomInputText
                placeholder="Ingrese el nombre de repuesto"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <CustomInputText
                placeholder="Ingrese la cantidad"
                value={amount}
                keyboardType="number-pad"
                onChangeText={(text) => setAmount(text)}
              />
              <TreatmentDropDown
                defaultButtonText={"Tratamiento"}
                onSelect={setTreatment}
                defaultValue={treatment}
              />
              <CustomSingleButton title="Modificar" customPress={updateReplacement} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UpdateReplacement

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