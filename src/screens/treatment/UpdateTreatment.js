import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import VehicleDropDown from '../../components/VehicleDropDown'
const db = DatabaseConnection.getConnection();


const UpdateTreatment = ({navigation}) => {
    const [searchId, setSearchId] = useState("");
    const [name, setName] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [inDate, setInDate] = useState("");
    const [finDate, setFinDate] = useState("");
    const [price, setPrice] = useState("");
  
    const SearchTreatment = () => {
        console.log("searchTreatment");
    
        if (!searchId.trim()) {
          Alert.alert("La Id es requerida");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM treatment WHERE treatment_id = ?",
            [searchId],
            (tx, results) => {
              if (results.rows.length > 0) {
                setName(results.rows.item(0).treatment_name);
                setVehicle(results.rows.item(0).vehicle);
                setInDate(results.rows.item(0).inDate);
                setFinDate(results.rows.item(0).finDate);
                setPrice(results.rows.item(0).price.toString());
              } else {
                Alert.alert("Tratamiento no encontrado");
              }
            }
          );
        });
      };
  
      const updateTreatment = () => {
        console.log("updateTreatment");
    
        if (!name.trim() || !vehicle.trim() || !inDate.trim() || !finDate.trim() || !price.trim()) {
          Alert.alert("Faltan datos");
          return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE treatment SET treatment_name = ?, vehicle = ?, inDate = ?, finDate = ?, price = ?  WHERE treatment_id = ?",
            [name, vehicle, inDate, finDate, price, searchId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Tratamiento modificado");
                navigation.navigate("TreatmentManagement");
              } else {
                Alert.alert("No se pudo modificar el Tratamiento");
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
                <CustomText text="Buscar tratamiento" style={styles.text}/>
                <CustomInputText
                  placeholder="Id"
                  style={styles.inputStyle}
                  onChangeText={(text) => setSearchId(text)}
                />
                <CustomSingleButton title="Buscar" customPress={SearchTreatment} />
                <CustomInputText
                  placeholder="Ingrese nombre de tartamiento"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
               <VehicleDropDown
               defaultButtonText={"Matricula"}
               onSelect={setVehicle}
               defaultValue={vehicle}
              />
                <CustomInputText
                  placeholder="Ingrese fecha inicio"
                  value={inDate}
                  onChangeText={(text) => setInDate(text)}
                />  
                <CustomInputText
                  placeholder="Ingrese fecha final"
                  value={finDate}
                  onChangeText={(text) => setFinDate(text)}
                />  
                 <CustomInputText
                  placeholder="Ingrese costo"
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                />  
                <CustomSingleButton title="Modificar" customPress={updateTreatment} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default UpdateTreatment

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