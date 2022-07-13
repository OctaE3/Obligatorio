import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView} from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

//Creacion de la tabla de tratamientos
const TreatmentManagement = ({navigation}) => {
    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='treatment'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS treatment', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS treatment(treatment_id VARCHAR(9) PRIMARY KEY, treatment_name VARCHAR(25), vehicle VARCHAR(7), inDate VARCHAR(10), finDate VARCHAR(10), price INTEGER)',
                  []
                );
              }
            }
          );
        });
      }, []);
    
      const removeElementsOnDatabase = () => {
        db.transaction( (txn) => {
          txn.executeSql('DELETE FROM treatment', []);
        });
      }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <ScrollView>
                   <CustomButtons
                     title="Registro de Tratamiento"
                     btnColor="#AD6FD6"
                     btnIcon="check"
                     customPress={() => navigation.navigate("AddTreatment")}
                   />
                   <CustomButtons
                     title="Ver Trataminetos"
                     btnColor="#AD6FD6"
                     btnIcon="search"
                     customPress={() => navigation.navigate("ViewAllTreatments")}
                   />
                   <CustomButtons
                     title="Buscar Tratamiento"
                     btnColor="#AD6FD6"
                     btnIcon="search-plus"
                     customPress={() => navigation.navigate("SearchTreatment")}
                   />
                   <CustomButtons
                     title="Modificar Tratamiento"
                     btnColor="#AD6FD6"
                     btnIcon="gear"
                     customPress={() => navigation.navigate("UpdateTreatment")}
                   />
                   <CustomButtons
                     title="Eliminar Tratamiento"
                     btnColor="#AD6FD6"
                     btnIcon="close"
                     customPress={() => navigation.navigate("DeleteTreatment")}
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