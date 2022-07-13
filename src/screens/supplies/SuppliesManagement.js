import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

//Creacion de la tabla de insumos
const SuppliesManagement = ({ navigation }) => {
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='supplies'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS supplies', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS supplies(supplies_id INTEGER PRIMARY KEY AUTOINCREMENT, supplies_name VARCHAR(25), amount INTEGER, treatment VARCHAR(9))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM supplies', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <CustomButtons
              title="Registro de Insumos"
              btnColor="#AD6FD6"
              btnIcon="check"
              customPress={() => navigation.navigate("AddSupplies")}
            />
            <CustomButtons
              title="Ver Insumos"
              btnColor="#AD6FD6"
              btnIcon="search"
              customPress={() => navigation.navigate("ViewAllSupplies")}
            />
            <CustomButtons
              title="Buscar Insumos"
              btnColor="#AD6FD6"
              btnIcon="search-plus"
              customPress={() => navigation.navigate("SearchSupplies")}
            />
            <CustomButtons
              title="Modificar Insumos"
              btnColor="#AD6FD6"
              btnIcon="gear"
              customPress={() => navigation.navigate("UpdateSupplies")}
            />
            <CustomButtons
              title="Eliminar Insumos"
              btnColor="#AD6FD6"
              btnIcon="close"
              customPress={() => navigation.navigate("DeleteSupplies")}
            />

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SuppliesManagement

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
    justifyContent: "center",
  },
})