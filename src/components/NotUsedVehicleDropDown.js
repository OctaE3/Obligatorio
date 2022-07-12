import React, { useState, useEffect } from "react";
import { StyleSheet, Text} from 'react-native'
import SelectDropdown from "react-native-select-dropdown";
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const NotUsedVehicleDropDown = (props, {navigation}) => {
    const [vehiculos, setVehiculos] = useState([]);
    
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM vehicle v where v.matricula NOT IN (SELECT vehicle FROM users)`, [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setVehiculos(temp);
          } else {
            Alert.alert(
              "Mensaje",
              "No hay Vehiculos!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("VehiclesManagement"),
                },
              ],
              { cancelable: false }
            );
          }
        });
      });
    }, []);


    return (
      <SelectDropdown
	data={vehiculos.map(vehiculos => vehiculos.matricula)}
  onSelect={props.onSelect}
  buttonStyle={styles.btn}
  defaultValue={props.defaultValue}
  defaultButtonText={props.defaultButtonText}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>
  )
}

export default NotUsedVehicleDropDown

const styles = StyleSheet.create({
  btn:{
    alignSelf: "center",
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  }

})