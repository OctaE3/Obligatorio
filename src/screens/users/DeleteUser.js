import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();


const DeleteUser = ({navigation}) => {
    const [userName, setUserName] = useState("");

  const deleteUser = () => {
    console.log("deleteUser");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM users WHERE user_name = ?`,
        [userName],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario eliminado");
            navigation.navigate("UserManagement");
          } else {
            Alert.alert("El usuario no existe");
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
                    <CustomText text="Busqueda de usuario" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <CustomInputText 
                             placeholder="Nombre de usuario"
                             onChangeText={(text) => setUserName(text)}
                            />
                            <CustomSingleButton title="Eliminar" customPress={deleteUser} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteUser

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