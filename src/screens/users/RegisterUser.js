import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();


const RegisterUser = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [ci, setCi] = useState('');
  const [vehicle, setVehicle] = useState('');

  const clearData = () => {
    setUserName("");
    setUserSurname("");
    setCi("");
    setVehicle("");
  };

  const registerUser = () => {
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
      if (!ci.trim()) {
        Alert.alert("Ingrese su cedula");
        return;
      }
      if (!vehicle.trim()) {
        Alert.alert("Ingrese la matricula de su vehiculo");
        return;
      }
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
                        placeholder="X.XXX.XXX-X"
                        onChangeText={setCi}
                        style={styles.Input}
                        value={ci}
                        />
                        <CustomInputText
                        placeholder="Matricula"
                        onChangeText={setVehicle}
                        style={styles.Input}
                        value={vehicle}
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