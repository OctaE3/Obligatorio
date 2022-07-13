import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import CustomText from '../../components/CustomText';
import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatments = ({ navigation }) => {
  const [tratamientos, setTrataminetos] = useState([]);

  useEffect(() => {
    //Selecciona mediante una consulta SQL
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM treatment`, [], (tx, results) => {
        console.log("results", results);
        //Verifica Resultado y los carga
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTrataminetos(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Tratamientos!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("TreatmentManagement"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);


  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <CustomText text="Id" style={styles.text} />
        <CustomText text={item.treatment_id} style={styles.text} />
        <CustomText text="Nombre" style={styles.text} />
        <CustomText text={item.treatment_name} style={styles.text} />
        <CustomText text="Matricula" style={styles.text} />
        <CustomText text={item.vehicle} style={styles.text} />
        <CustomText text="Fecha inicio" style={styles.text} />
        <CustomText text={item.inDate} style={styles.text} />
        <CustomText text="Fecha final" style={styles.text} />
        <CustomText text={item.finDate} style={styles.text} />
        <CustomText text="Costo" style={styles.text} />
        <CustomText text={item.price} style={styles.text} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={tratamientos}
          key={(index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );

}

export default ViewAllTreatments

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