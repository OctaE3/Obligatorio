import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const TreatmentDropDown = (props) => {
    const [treatment, setTreatment] = useState([]);
    
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM treatment`, [], (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setTreatment(temp);
          } else {
            Alert.alert(
              "Mensaje",
              "No hay tratamientos!!!",
              [
                {
                  text: "Ok",
                },
              ],
              { cancelable: false }
            );
          }
        });
      });
    }, []);


    return (
  <SafeAreaView> 
  <View>
      <SelectDropdown
	data={treatment.map(treatment => treatment.treatment_id)}
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
</View>
</SafeAreaView>
  );
};

export default TreatmentDropDown;

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