import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();


const DeleteVehicle = ({navigation}) => {
    const [matricula, setMatricula] = useState("");

  const deletevehicle = () => {
    console.log("deletevehicle");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM vehicle WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo eliminado");
            navigation.navigate("VehiclesManagement");
          } else {
            Alert.alert("El vehiculo no existe");
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
                    <CustomText text="Busqueda de vehiculo" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <CustomInputText 
                             placeholder="Matricula del Auto"
                             onChangeText={(text) => setMatricula(text)}
                            />
                            <CustomSingleButton title="Eliminar" customPress={deletevehicle} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteVehicle

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