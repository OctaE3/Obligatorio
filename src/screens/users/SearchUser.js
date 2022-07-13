import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomText from '../../components/CustomText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from "../../database/database-connection";
import UserDropDown from '../../components/UserDropDown';
const db = DatabaseConnection.getConnection();

const SearchUser = ({ navigation }) => {
  const [userCi, setUserCi] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserData = () => {
    console.log("getUserData");
    setUserData({});
    //Comprueba que la cedula este cargada
    if (!userCi.trim()) {
      Alert.alert("La cedula del usuario es requerida");
      return;
    }
    //Selecciona los datos mediante una consulta SQL  
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE ci = ?`,
        [userCi],
        (tx, results) => {
          console.log("results", results);
          //Validar resultado y carga datos
          if (results.rows.length > 0) {
            setUserData(results.rows.item(0));
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
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <CustomText text="Filtro de usuario" style={styles.text} />
              <UserDropDown
                defaultButtonText={"Cedula"}
                onSelect={setUserCi}
              />
              <CustomSingleButton title="Buscar" customPress={getUserData} />
              <View style={styles.presenterView}>
                <CustomText text={`Nombre: ${!userData ? '' : userData.user_name}`} style={styles.presenterText} />
                <CustomText text={`Apellido: ${!userData ? '' : userData.user_surname}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchUser

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
    margin: 10,
    color: "black",
  },
  presenterView: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
  },
  presenterText: {
    fontSize: 20
  }
})