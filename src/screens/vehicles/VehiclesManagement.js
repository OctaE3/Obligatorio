import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView} from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();


const UserManagement = ({navigation}) => {
    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='vehicle'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS users', []);
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
        db.transaction( (txn) => {
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
                     btnColor="#474747"
                     btnIcon="check"
                     customPress={() => navigation.navigate("AddVehicle")}
                   />
                   <CustomButtons
                     title="Ver Vehiculos"
                     btnColor="#474747"
                     btnIcon="search"
                     customPress={() => navigation.navigate("ViewAllVehicles")}
                   />
                   <CustomButtons
                     title="Eliminar Vehiculos"
                     btnColor="#474747"
                     btnIcon="close"
                     customPress={() => navigation.navigate("DeleteVehicle")}
                   />
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default UserManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      viewContainer: {
        flex: 1,
        backgroundColor: "black",
      },
      generalView: {
        flex: 1,
        justifyContent: "center",
      },
})