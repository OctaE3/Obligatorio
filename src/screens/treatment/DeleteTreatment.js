import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import TreatmentDropDown from '../../components/TreatmentDropDown'
const db = DatabaseConnection.getConnection();


const DeleteTreatment = ({navigation}) => {
    const [id, setId] = useState("");

  const deleteTreatment = () => {
    console.log("deleteTreatment");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM treatment WHERE treatment_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("TreatmentManagement");
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
                <ScrollView >
                    <CustomText text="Busqueda de tratamiento" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <TreatmentDropDown 
                              defaultButtonText={"Tratamiento"}
                              onSelect={setId}
                            />                            
                            <CustomSingleButton title="Eliminar" customPress={deleteTreatment} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteTreatment

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