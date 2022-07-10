import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import CustomText from '../../components/CustomText';
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllSupplies = ({navigation}) => {
    const [supplies, setSupplies] = useState([]);
    
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM supplies`, [], (tx, results) => {
            console.log("results", results);
            if (results.rows.length > 0) {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setSupplies(temp);
            } else {
              Alert.alert(
                "Mensaje",
                "No hay Insumos!!!",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("SuppliesManagement"),
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
            <CustomText text="Nombre" style={styles.text}/>
            <CustomText text={item.supplies_name} style={styles.text}/>
            <CustomText text="Cantidad" style={styles.text}/>
            <CustomText text={item.amount} style={styles.text}/>
            <CustomText text="Tratamiento" style={styles.text}/>
            <CustomText text={item.treatment} style={styles.text}/>
        </View>
    );
};

return (
    <SafeAreaView style={styles.container}>
      <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={supplies}
            key={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
    </SafeAreaView>
  );
 
}

export default ViewAllSupplies

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