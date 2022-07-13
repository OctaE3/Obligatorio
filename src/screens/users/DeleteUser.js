import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import UserDropDown from '../../components/UserDropDown'
const db = DatabaseConnection.getConnection();


const DeleteUser = ({ navigation }) => {
  const [userCi, setUserCi] = useState("");
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [vehicle, setVehicle] = useState("");

  const searchUser = () => {
    console.log("searchUser");

    if (!userCi.trim()) {
      Alert.alert("La cedula es requerida");
      return;
    }
    //selecciona los datos mediante una consulta sql
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE ci = ?",
        [userCi],
        (tx, results) => {
          //validar resultado y los carga
          if (results.rows.length > 0) {
            setUserName(results.rows.item(0).user_name);
            setUserSurname(results.rows.item(0).user_surname);
            setVehicle(results.rows.item(0).vehicle);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };


  const deleteUser = () => {
    //verifica que los datos esten cargados
    if (!userName.trim()) {
      Alert.alert("Se requiere mostrar el usuario a eliminar");
      return;
    }

    console.log("deleteUser");
    //Elimina mediante una consulta sql  
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM users WHERE ci = ?`,
        [userCi],
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
            <CustomText text="Busqueda de usuario" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <UserDropDown
                defaultButtonText={"Cedula"}
                onSelect={setUserCi}
              />
              <CustomSingleButton title="Buscar" customPress={searchUser} />
              <CustomInputText
                placeholder="Nombre de Usuario"
                value={userName}
                editable={false}
              />
              <CustomInputText
                placeholder="Apellido"
                value={userSurname}
                editable={false}
              />
              <CustomInputText
                placeholder="Matricula"
                value={vehicle}
                editable={false}
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