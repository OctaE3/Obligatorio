import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

//Creacion de la tabla de vehiculos
const VehiclesManagement = ({ navigation }) => {
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='vehicle'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS vehicle', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS vehicle(vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(7), marca VARCHAR(20), color VARCHAR(20), serial VARCHAR(17))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM vehicle', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <CustomButtons
              title="Registro de Vehiculos"
              btnColor="#AD6FD6"
              btnIcon="check"
              customPress={() => navigation.navigate("AddVehicle")}
            />
            <CustomButtons
              title="Ver Vehiculos"
              btnColor="#AD6FD6"
              btnIcon="search"
              customPress={() => navigation.navigate("ViewAllVehicles")}
            />
            <CustomButtons
              title="Buscar Vehiculos"
              btnColor="#AD6FD6"
              btnIcon="search-plus"
              customPress={() => navigation.navigate("SearchVehicle")}
            />
            <CustomButtons
              title="Modificar Vehiculos"
              btnColor="#AD6FD6"
              btnIcon="gear"
              customPress={() => navigation.navigate("UpdateVehicle")}
            />
            <CustomButtons
              title="Eliminar Vehiculos"
              btnColor="#AD6FD6"
              btnIcon="close"
              customPress={() => navigation.navigate("DeleteVehicle")}
            />

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VehiclesManagement

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