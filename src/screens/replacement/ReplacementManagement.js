import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

//Creacion de la tabla de repuestos
const TreatmentManagement = ({ navigation }) => {
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='replacement'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS replacement', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS replacement(replacement_id INTEGER PRIMARY KEY AUTOINCREMENT, replacement_name VARCHAR(25), amount INTEGER , treatment VARCHAR(9))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM replacement', []);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <CustomButtons
              title="Registro de Repuesto"
              btnColor="#AD6FD6"
              btnIcon="check"
              customPress={() => navigation.navigate("AddReplacement")}
            />
            <CustomButtons
              title="Ver Repuestos"
              btnColor="#AD6FD6"
              btnIcon="search"
              customPress={() => navigation.navigate("ViewAllReplacements")}
            />
            <CustomButtons
              title="Buscar Repuestos"
              btnColor="#AD6FD6"
              btnIcon="search-plus"
              customPress={() => navigation.navigate("SearchReplacement")}
            />
            <CustomButtons
              title="Modificar Repuestos"
              btnColor="#AD6FD6"
              btnIcon="gear"
              customPress={() => navigation.navigate("UpdateReplacement")}
            />
            <CustomButtons
              title="Eliminar Repuestos"
              btnColor="#AD6FD6"
              btnIcon="close"
              customPress={() => navigation.navigate("DeleteReplacement")}
            />

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default TreatmentManagement

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