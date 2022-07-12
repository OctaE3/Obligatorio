import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import SuppliesDropDown from '../../components/SuppliesDropDown';
import TreatmentDropDown from '../../components/TreatmentDropDown' 
const db = DatabaseConnection.getConnection();


const UpdateSupplies = ({navigation}) => {
    const [searchId, setSearchId] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [treatment, setTreatment] = useState("");
  
    const searchSupplies = () => {
        console.log("searchSupplies");
    
        if (!searchId.toString().trim()) {
          Alert.alert("El codigo es requerido");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM supplies WHERE supplies_id = ?",
            [searchId],
            (tx, results) => {
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
  
      const updateSupplies = () => {
        console.log("updateSupplies");
    
        if (!name.trim() || !amount.trim() || !treatment.trim()) {
          Alert.alert("Faltan datos");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE supplies SET supplies_name = ?, amount = ?, treatment = ? WHERE supplies_id = ?",
            [name, amount, treatment, searchId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Insumo modificado");
                navigation.navigate("SuppliesManagement");
              } else {
                Alert.alert("No se pudo modificar el insumo");
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
                <CustomText text="Buscar Insumo" style={styles.text}/>
                <SuppliesDropDown
                          defaultButtonText={"Codigo"}
                            onSelect={setSearchId}
                />
                <CustomSingleButton title="Buscar" customPress={searchSupplies} />
                <CustomInputText
                  placeholder="Ingrese el nombre de insumo"
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
                <CustomSingleButton title="Modificar" customPress={updateSupplies} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default UpdateSupplies

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