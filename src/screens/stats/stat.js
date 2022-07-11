import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomText from '../../components/CustomText';
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const stat = ({navigation}) => {
    const [stat, setStat] = useState([]);
    const [replacement, setReplacement] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT u.user_name, u.vehicle, t.treatment_id, t.inDate, t.price
                         FROM users u, treatment t
                         WHERE u.vehicle = t.vehicle`, [], (tx, results) => {
            console.log("results", results);
            if (results.rows.length > 0) {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setStat(temp);
            } else {
              Alert.alert(
                "Mensaje",
                "No hay Tratamiento, Usuarios y/o Repuestos!!!",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("Stat"),
                  },
                ],
                { cancelable: false }
              );
            }
            tx.executeSql(`SELECT `)
            if ()
          });
        });
      }, []);

      const listItemView = (item) => {
        return(
            <View key={item.id} style={styles.listItemView}>
                <CustomText text="Usuario" style={styles.text}/>
                <CustomText text={item.user_name} style={styles.text}/>
                <CustomText text="Vehiculo" style={styles.text}/>
                <CustomText text={item.vehicle} style={styles.text}/>
                <CustomText text="Tratamiento" style={styles.text}/>
                <CustomText text={item.treatment_id} style={styles.text}/>
                <CustomText text="Fecha de Tratamiento" style={styles.text}/>
                <CustomText text={item.inDate} style={styles.text}/>
                <CustomText text="Precio" style={styles.text}/>
                <CustomText text={item.price} style={styles.text}/>
                <CustomText text="aaa" style={styles.text}/>
            </View>
        );
    };

  return (
    <SafeAreaView style={styles.container}>
      <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={stat}
            key={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View> 
    </SafeAreaView>
  )
}

export default stat

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