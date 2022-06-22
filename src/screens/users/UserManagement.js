import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView} from "react-native";
import CustomButtons from "../../components/CustomButtons";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();


const UserManagement = ({navigation}) => {
    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS users', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_surname VARCHAR(20), ci VARCHAR(11), vehicle VARCHAR(7))',
                  []
                );
              }
            }
          );
        });
      }, []);
    
      const removeElementsOnDatabase = () => {
        db.transaction( (txn) => {
          txn.executeSql('DELETE FROM users', []);
        });
      }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <ScrollView>
                   <CustomButtons
                     title="Registro de Usuarios"
                     btnColor="#474747"
                     btnIcon="check"
                     customPress={() => navigation.navigate("RegisterUser")}
                   />
                   <CustomButtons
                     title="Ver usuarios"
                     btnColor="#474747"
                     btnIcon="search"
                     customPress={() => navigation.navigate("ViewAllUsers")}
                   />
                   <CustomButtons
                     title="Buscar usuario"
                     btnColor="#474747"
                     btnIcon="search-plus"
                     customPress={() => navigation.navigate("SearchUser")}
                   />
                    <CustomButtons
                     title="Modificar usuarios"
                     btnColor="#474747"
                     btnIcon="gear"
                     customPress={() => navigation.navigate("UpdateUser")}
                   />
                   <CustomButtons
                     title="Eliminar usuarios"
                     btnColor="#474747"
                     btnIcon="close"
                     customPress={() => navigation.navigate("DeleteUser")}
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