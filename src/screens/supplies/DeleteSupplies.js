import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import SuppliesDropDown from '../../components/SuppliesDropDown';
const db = DatabaseConnection.getConnection();


const DeleteSupplies = ({navigation}) => {
    const [id, setId] = useState("");

  const deleteSupplies = () => {
    console.log("deleteSupplies");
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
                    <CustomText text="Busqueda de insumos" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <SuppliesDropDown
                                defaultButtonText={"Codigo"}
                                onSelect={setId}
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