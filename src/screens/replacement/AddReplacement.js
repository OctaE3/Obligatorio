import React, { useState } from 'react'
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert} from 'react-native'
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from '../../database/database-connection';
import TreatmentDropDown from '../../components/TreatmentDropDown';
const db = DatabaseConnection.getConnection();

const AddReplacement = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [treatment, setTreatment] = useState('');

  const clearData = () => {
    setName("");
    setAmount("");
    setTreatment("");
  };

  const addReplacement = () => {
    console.log("state", name, amount, treatment)
    if (!name.trim()) {
      Alert.alert("Ingrese la nombre");
      return;
    }
    if (!amount.trim()) {
      Alert.alert("Ingrese la cantidad");
      return;
    }
    if (!treatment.trim()) {
      Alert.alert("Ingrese el tratamiento");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO replacement(replacement_name, amount, treatment) VALUES (?, ?, ?)`,
        [name, amount, treatment],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Repuesto Añadido!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("ReplacementManagement"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al Añadir el Repuesto");
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
                placeholder="Nombre"
                onChangeText={setName}
                style={styles.Input}
                value={name}
              />
              <CustomInputText
                placeholder="Cantidad"
                onChangeText={setAmount}
                keyboardType="number-pad"
                style={styles.Input}
                value={amount}
              />
             <TreatmentDropDown
             defaultButtonText={"Tratamiento"}
             onSelect={setTreatment}
             />
              <CustomSingleButton
                title="Registrar"
                customPress={addReplacement}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddReplacement

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