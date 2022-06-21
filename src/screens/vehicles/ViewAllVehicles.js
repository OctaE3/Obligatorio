import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import CustomText from '../../components/CustomText';
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllVehicles = ({navigation}) => {
    const [vehiculos, setVehiculos] = useState([]);
    
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM vehicle`, [], (tx, results) => {
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
    

const listItemView = (item) => {
    return(
        <View key={item.id} style={styles.listItemView}>
            <CustomText text="Matricula" style={styles.text}/>
            <CustomText text={item.matricula} style={styles.text}/>
            <CustomText text="Marca" style={styles.text}/>
            <CustomText text={item.marca} style={styles.text}/>
            <CustomText text="Color" style={styles.text}/>
            <CustomText text={item.color} style={styles.text}/>
            <CustomText text="Serial del Motor" style={styles.text}/>
            <CustomText text={item.serial} style={styles.text}/>
        </View>
    );
};

return (
    <SafeAreaView style={styles.container}>
      <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={vehiculos}
            key={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View> 
    </SafeAreaView>
  );
 
}

export default ViewAllVehicles

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
      listView: {
        marginTop: 20,
      },
      listItemView: {
        backgroundColor: "white",
        margin: 5,
        padding: 10,
        borderRadius: 10,
      },
      text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
      }

})