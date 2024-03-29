import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from '../../database/database-connection';
import VehicleDropDown from '../../components/NotUsedVehicleDropDown';
const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [ci, setCi] = useState('');
  const [vehicle, setVehicle] = useState('');
  //Da formato a la cedula
  const ciRegex = /\b[1-9]{1}.[0-9]{3}.[0-9]{3}-[0-9]{1}\b/;


  const clearData = () => {
    setUserName("");
    setUserSurname("");
    setCi("");
    setVehicle("");
  };

  const registerUser = () => {
    //Verifica que esten todos los datos
    console.log("state", userName, userSurname, ci, vehicle)
    debugger;
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre");
      return;
    }
    if (!userSurname.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }
    if (!ciRegex.test(ci)) {
      Alert.alert("Cedula invalida");
      return;
    }
    if (!vehicle.trim()) {
      Alert.alert("Ingrese la matricula de su vehiculo");
      return;
    }
    //Inserta en la tabla usuarios mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (user_name, user_surname, ci, vehicle) VALUES (?, ?, ?,?)`,
        [userName, userSurname, ci, vehicle],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Usuario registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("UserManagement"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar usuario");
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
              <CustomInputText
                placeholder="Nombre"
                onChangeText={setUserName}
                style={styles.Input}
                value={userName}
              />
              <CustomInputText
                placeholder="Apellido"
                onChangeText={setUserSurname}
                style={styles.Input}
                value={userSurname}
              />
              <CustomInputText
                placeholder="Cédula X.XXX.XXX-X"
                onChangeText={setCi}
                keyboardType="number-pad"
                style={styles.Input}
                value={ci}
              />
              <VehicleDropDown
                defaultButtonText={"Matricula"}
                onSelect={setVehicle}
              />
              <CustomSingleButton
                title="Registrar"
                customPress={registerUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterUser

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  Input: {
    padding: 15,
    textAlignVertical: "top",
  },

})