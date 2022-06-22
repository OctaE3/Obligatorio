/* import React, { useState, useEffect } from "react";
import { StyleSheet, Text} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from "react-native-web";
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const VehicleDropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [vehicle, setVehicle] = useState([]);
    
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT vehicle_id, matricula FROM vehicle`, [], (tx, results) => {
            console.log("results", results);
            if (results.rows.length > 0) {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i){
              let {id, matricula} = results.row[i]
              let element = {id: id, label: matricula} 
              console.log(element)
              temp.push(element);
              setVehicle(temp);
            }
           
        }else {
            Alert.alert(
                "Mensaje",
                "No hay vehiculos agrege uno!!!",
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
    //     <DropDownPicker
    //     open={open}
    //     value={value}
    //     item={vehicle}
    //     setOpen={setOpen}
    //     setValue={setValue}
    //     setItems={setVehicle}
    //   /> 
    <Text> 
        66666
    </Text>
  )
}

export default VehicleDropDown

const styles = StyleSheet.create({}) */