import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomText from '../../components/CustomText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from "../../database/database-connection";
import ReplacementDropDown from '../../components/ReplacementDropDown';
const db = DatabaseConnection.getConnection();

const SearchReplacement = ({ navigation }) => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const getData = () => {
    console.log("getData");
    setData({});
    //Comprueba que el Id este cargado    
    if (!id.trim()) {
      Alert.alert("La codigo es requerido");
      return;
    }
    //Selecciona los datos mediante una consulta SQL  
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM replacement WHERE replacement_id = ?`,
        [id],
        (tx, results) => {
          //Validar resultado y carga datos
          console.log("results", results);
          if (results.rows.length > 0) {
            setData(results.rows.item(0));
          } else {
            Alert.alert("El repuesto no existe");
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
              <CustomText text="Filtro de repuestos" style={styles.text} />
              <ReplacementDropDown
                defaultButtonText={"Codigo"}
                onSelect={setId}
              />
              <CustomSingleButton title="Buscar" customPress={getData} />
              <View style={styles.presenterView}>
                <CustomText text={`Nombre: ${!data ? '' : data.replacement_name}`} style={styles.presenterText} />
                <CustomText text={`Cantidad: ${!data ? '' : data.amount}`} style={styles.presenterText} />
                <CustomText text={`Tratamiento: ${!data ? '' : data.treatment}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchReplacement

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