import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomText from '../../components/CustomText';
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from "../../database/database-connection";
import TreatmentDropDown from '../../components/TreatmentDropDown'
const db = DatabaseConnection.getConnection();

const SearchTreatment = ({ navigation }) => {
  const [id, setId] = useState("");
  const [treatmentData, setTreatmentData] = useState(null);

  const getTreatmentData = () => {
    console.log("getTreatmentData");
    setTreatmentData({});
    //Comprueba que el Id este cargado 
    if (!id.trim()) {
      Alert.alert("La Id es requerida");
      return;
    }
    //Selecciona los datos mediante una consulta SQL  
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM treatment WHERE treatment_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          //Validar resultado y carga datos
          if (results.rows.length > 0) {
            setTreatmentData(results.rows.item(0));
          } else {
            Alert.alert("El tratamiento no existe");
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
              <CustomText text="Filtro de tratamientos" style={styles.text} />
              <TreatmentDropDown
                defaultButtonText={"Tratamiento"}
                onSelect={setId}
              />
              <CustomSingleButton title="Buscar" customPress={getTreatmentData} />
              <View style={styles.presenterView}>
                <CustomText text={`Nombre: ${!treatmentData ? '' : treatmentData.treatment_name}`} style={styles.presenterText} />
                <CustomText text={`Matricula: ${!treatmentData ? '' : treatmentData.vehicle}`} style={styles.presenterText} />
                <CustomText text={`Fecha inicio: ${!treatmentData ? '' : treatmentData.inDate}`} style={styles.presenterText} />
                <CustomText text={`Fecha final: ${!treatmentData ? '' : treatmentData.finDate}`} style={styles.presenterText} />
                <CustomText text={`Costo: ${!treatmentData ? '' : treatmentData.price}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchTreatment

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
    margin: 10,
    color: "black",
  },
  presenterView: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
  },
  presenterText: {
    fontSize: 20
  }
})