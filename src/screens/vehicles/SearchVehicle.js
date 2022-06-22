import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomText from '../../components/CustomText';
import CustomInputText from '../../components/CustomInputText';
import CustomSingleButton from '../../components/CustomSingleButton';
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const SearchUser = ({navigation}) => {
    const [vehicleMatricula, setVehicleMatricula] = useState("");
    const [vehicleData, setVehicleData] = useState(null);
    
    const getVehicleData = () => {
        console.log("getVehicleData");
        setVehicleData({});
    
        if (!vehicleMatricula.trim()) {
          Alert.alert("La matricula es requerida");
          return;
        }  
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM vehicle WHERE matricula = ?`,
            [vehicleMatricula],
            (tx, results) => {
              console.log("results", results);
              if (results.rows.length > 0) {
                setVehicleData(results.rows.item(0));
              } else {
                Alert.alert("El vehiculo no existe");
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
                    <CustomText  text="Filtro de vehiculos" style={styles.text}/>
                    <CustomInputText
                     style={styles.inputStyle}
                     placeholder="Matricula"
                     onChangeText={(text) => setVehicleMatricula(text)}
                    />
                    <CustomSingleButton title="Buscar" customPress={getVehicleData}/>
                    <View style={styles.presenterView}>
                        <CustomText text={`Marca: ${!vehicleData ? '' : vehicleData.marca}`} style={styles.presenterText}/>
                        <CustomText text={`Color: ${!vehicleData ? '' : vehicleData.color}`} style={styles.presenterText}/>
                        <CustomText text={`Serial: ${!vehicleData ? '' : vehicleData.serial}`} style={styles.presenterText}/>
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
        flex:2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30,
      },
      presenterText: {
        fontSize:20
      }
})