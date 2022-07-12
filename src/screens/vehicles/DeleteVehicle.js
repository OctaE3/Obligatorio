import React, {useState, useEffect} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import CustomInputText from '../../components/CustomInputText'
import DatabaseConnection from "../../database/database-connection";
import VehicleDropDown from '../../components/VehicleDropDown';
const db = DatabaseConnection.getConnection();


const DeleteVehicle = ({navigation}) => {
    const [matricula, setMatricula] = useState("");
    const [marca, setMarca] = useState("");
    const [color, setColor] = useState("");
    const [serial, setSerial] = useState("");
    const [incluido, setIncluido] = useState("");
    const [incluidoR, setIncluidoR] = useState("");

  const vehiculosIncluidos = () => {
    if (!matricula.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }
    db.transaction((tx) =>{
      tx.executeSql(`SELECT vehicle FROM users WHERE vehicle = ?`,[matricula],      
      (tx, results) => {
        if (results.rows.length > 0) {
          setIncluido("Si");
        } else {
          setIncluido("No");
        }
      }
      );
    });
    db.transaction((tx) =>{
      tx.executeSql(`SELECT vehicle FROM treatment WHERE vehicle = ?`,[matricula],      
      (tx, results) => {
        if (results.rows.length > 0) {
          setIncluidoR("Si");
        } else {
          setIncluidoR("No");
        }
      }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM vehicle WHERE matricula = ?",
        [matricula],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMarca(results.rows.item(0).marca);
            setColor(results.rows.item(0).color);
            setSerial(results.rows.item(0).serial);
          } else {
            Alert.alert("Vehiculo no encontrado");
          }
        }
      );
    });
  }
  
const deletevehicle = () => {
  
    console.log("Incluidos", incluido, incluidoR)
    if(incluido == "No" && incluidoR == "No"){
    console.log("deletevehicle");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM vehicle WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo eliminado");
            navigation.navigate("VehiclesManagement");
          } else {
            Alert.alert("El vehiculo no existe");
          }
        }
      );
    });
  }
  else{
    Alert.alert("Este vehiculo esta incluido en un usuario o reparacion");
  }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <ScrollView >
                    <CustomText text="Busqueda de vehiculo" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                        <VehicleDropDown
                             defaultButtonText={"Matricula"}
                            onSelect={setMatricula}
                             />
                  <CustomSingleButton title="Buscar" customPress={vehiculosIncluidos} />
                <CustomInputText
                  placeholder="Ingrese la marca"
                  value={marca}
                  editable={false}
                />
                <CustomInputText
                  placeholder="Ingrese el color"
                  value={color}
                  editable={false}
                />  
                <CustomInputText
                  placeholder="Ingrese la serial"
                  value={serial}
                  editable={false}
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