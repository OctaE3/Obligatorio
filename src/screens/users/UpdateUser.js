import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import VehicleDropDown from '../../components/VehicleDropDown'
import UserDropDown from '../../components/UserDropDown'
const db = DatabaseConnection.getConnection();


const UpdateUser = ({navigation}) => {
    const [searchCi, setSearchCi] = useState("");
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [ci, setCi] = useState("");
    const [vehicle, setVehicle] = useState("");
    const ciRegex = /\b[1-9]{1}.[0-9]{3}.[0-9]{3}-[0-9]{1}\b/;

    const searchUser = () => {
        console.log("searchUser");
    
        if (!searchCi.trim()) {
          Alert.alert("La cedula es requerida");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM users WHERE ci = ?",
            [searchCi],
            (tx, results) => {
              if (results.rows.length > 0) {
                setUserName(results.rows.item(0).user_name);
                setUserSurname(results.rows.item(0).user_surname);
                setCi(results.rows.item(0).ci);
                setVehicle(results.rows.item(0).vehicle);
              } else {
                Alert.alert("Usuario no encontrado");
              }
            }
          );
        });
      };
  
      const updateUser = () => {
        console.log("updateUser");
    
        if (!userName.trim() || !userSurname.trim() || !ci.trim() || !vehicle.trim()) {
          Alert.alert("Faltan datos");
          return;
        }
        if (!ciRegex.test(ci)) {
          Alert.alert("Cedula invalida");
          return;
        }
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE users SET user_name = ?, user_surname = ?, ci = ?, vehicle = ? WHERE ci = ?",
            [userName, userSurname, ci, vehicle, searchCi],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Usuario modificado");
                navigation.navigate("UserManagement");
              } else {
                Alert.alert("No se pudo modificar el usuario");
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
                <CustomText text="Buscar Usuario" style={styles.text}/>
                <UserDropDown
                          defaultButtonText={"Cedula"}
                            onSelect={setSearchCi}
                />
                <CustomSingleButton title="Buscar" customPress={searchUser} />
                <CustomInputText
                  placeholder="Ingrese el nombre de Usuario"
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                />
                <CustomInputText
                  placeholder="Ingrese el apellido"
                  value={userSurname}
                  onChangeText={(text) => setUserSurname(text)}
                />
                <CustomInputText
                  placeholder="Ingrese la cedula"
                  value={ci}
                  keyboardType="number-pad"
                  onChangeText={(text) => setCi(text)}
                />                 
               <CustomInputText
                  placeholder="Matricula"
                  value={vehicle}
                  editable={false}
                /> 
                <CustomSingleButton title="Modificar" customPress={updateUser} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default UpdateUser

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