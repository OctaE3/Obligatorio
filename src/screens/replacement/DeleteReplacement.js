import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import ReplacementDropDown from '../../components/ReplacementDropDown';
const db = DatabaseConnection.getConnection();


const DeleteReplacement = ({navigation}) => {
    const [id, setId] = useState("");

  const deleteReplacement = () => {
    console.log("deleteReplacement");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM replacement WHERE replacement_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto eliminado");
            navigation.navigate("ReplacementManagement");
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
                <ScrollView >
                    <CustomText text="Busqueda de repuesto" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <ReplacementDropDown
                                defaultButtonText={"Codigo"}
                                onSelect={setId}
                            />
                            <CustomSingleButton title="Eliminar" customPress={deleteReplacement} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteReplacement

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