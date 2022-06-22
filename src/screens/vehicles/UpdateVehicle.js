import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();


const UpdateVehicle = ({navigation}) => {
    const [searchMatricula, setSearchMatricula] = useState("");
    const [matricula, setMatricula] = useState("");
    const [marca, setMarca] = useState("");
    const [color, setColor] = useState("");
    const [serial, setSerial] = useState("");
  
    const SearchVehicle = () => {
        console.log("searchVehicle");
    
        if (!searchMatricula.trim()) {
          Alert.alert("La matricula es requerida");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM vehicle WHERE matricula = ?",
            [searchMatricula],
            (tx, results) => {
              if (results.rows.length > 0) {
                setMatricula(results.rows.item(0).matricula);
                setMarca(results.rows.item(0).marca);
                setColor(results.rows.item(0).color);
                setSerial(results.rows.item(0).serial);
              } else {
                Alert.alert("Vehiculo no encontrado");
              }
            }
          );
        });
      };
  
      const UpdateVehicle = () => {
        console.log("updateVehicle");
    
        if (!matricula.trim() || !marca.trim() || !color.trim() || !serial.trim()) {
          Alert.alert("Faltan datos");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE vehicle SET matricula = ?, marca = ?, color = ?, serial = ? WHERE matricula = ?",
            [matricula, marca, color, serial, searchMatricula],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Vehiculo modificado");
                navigation.navigate("VehiclesManagement");
              } else {
                Alert.alert("No se pudo modificar el vehiculo");
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
                <CustomText text="Buscar vehiculo" style={styles.text}/>
                <CustomInputText
                  placeholder="Matricula"
                  style={styles.inputStyle}
                  onChangeText={(text) => setSearchMatricula(text)}
                />
                <CustomSingleButton title="Buscar" customPress={SearchVehicle} />
                <CustomInputText
                  placeholder="Ingrese la matricula"
                  value={matricula}
                  onChangeText={(text) => setMatricula(text)}
                />
                <CustomInputText
                  placeholder="Ingrese la marca"
                  value={marca}
                  onChangeText={(text) => setMarca(text)}
                />
                <CustomInputText
                  placeholder="Ingrese el color"
                  value={color}
                  onChangeText={(text) => setColor(text)}
                />  
                <CustomInputText
                  placeholder="Ingrese la serial"
                  value={serial}
                  onChangeText={(text) => setSerial(text)}
                />  
                <CustomSingleButton title="Modificar" customPress={UpdateVehicle} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default UpdateVehicle

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