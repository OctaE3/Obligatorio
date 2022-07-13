import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import SuppliesDropDown from '../../components/SuppliesDropDown';
import CustomInputText from '../../components/CustomInputText'
const db = DatabaseConnection.getConnection();


const DeleteSupplies = ({ navigation }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [treatment, setTreatment] = useState("");

  const searchSupplies = () => {
    console.log("searchSupplies");

    if (!id.toString().trim()) {
      Alert.alert("El codigo es requerido");
      return;
    }
    //selecciona los datos mediante una consulta sql
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM supplies WHERE supplies_id = ?",
        [id],
        (tx, results) => {
          //validar resultado y los carga
          if (results.rows.length > 0) {
            setName(results.rows.item(0).supplies_name);
            setAmount(results.rows.item(0).amount.toString());
            setTreatment(results.rows.item(0).treatment);
          } else {
            Alert.alert("Insumo no encontrado");
          }
        }
      );
    });
  };


  const deleteSupplies = () => {
    //verifica que los datos esten cargados
    if (!name.trim()) {
      Alert.alert("Se requiere mostrar el insumo a eliminar");
      return;
    }

    console.log("deleteSupplies");
    //Elimina mediante una consulta sql  
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM supplies WHERE supplies_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo eliminado");
            navigation.navigate("SuppliesManagement");
          } else {
            Alert.alert("El insumo no existe");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView >
            <CustomText text="Busqueda de insumos" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <SuppliesDropDown
                defaultButtonText={"Codigo"}
                onSelect={setId}
              />
              <CustomSingleButton title="Buscar" customPress={searchSupplies} />
              <CustomInputText
                placeholder="Nombre de insumo"
                value={name}
                editable={false}
              />
              <CustomInputText
                placeholder="Cantidad"
                value={amount}
                editable={false}
              />
              <CustomInputText
                placeholder="Tratamiento"
                value={treatment}
                editable={false}
              />
              <CustomSingleButton title="Eliminar" customPress={deleteSupplies} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteSupplies

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },

})