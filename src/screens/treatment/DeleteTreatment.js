import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import CustomInputText from '../../components/CustomInputText'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import TreatmentDropDown from '../../components/TreatmentDropDown'
const db = DatabaseConnection.getConnection();


const DeleteTreatment = ({navigation}) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [inDate, setInDate] = useState("");
    const [finDate, setFinDate] = useState("");
    const [price, setPrice] = useState("");
    const [incluido, setIncluido] = useState("");
    const [incluidoR, setIncluidoR] = useState("");

    const SearchTreatment = () => {
      if (!id.trim()) {
        Alert.alert("La Id es requerida");
        return;
      }
      console.log("searchTreatment");
      db.transaction((tx) =>{
        tx.executeSql(`SELECT treatment FROM replacement WHERE treatment = ?`,[id],      
        (tx, results) => {
          if (results.rows.length > 0) {
            setIncluido("Si");
          } else {
            setIncluido("No");
          }
        }
        );
      });
      db.transaction((tx) =>{
        tx.executeSql(`SELECT treatment FROM supplies WHERE treatment = ?`,[id],      
        (tx, results) => {
          if (results.rows.length > 0) {
            setIncluidoR("Si");
          } else {
            setIncluidoR("No");
          }
        }
        );
      });
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM treatment WHERE treatment_id = ?",
          [id],
          (tx, results) => {
            if (results.rows.length > 0) {
              setName(results.rows.item(0).treatment_name);
              setVehicle(results.rows.item(0).vehicle);
              setInDate(results.rows.item(0).inDate);
              setFinDate(results.rows.item(0).finDate);
              setPrice(results.rows.item(0).price.toString());
            } else {
              Alert.alert("Tratamiento no encontrado");
            }
          }
        );
      });
    };
  
  
  
    const deleteTreatment = () => {
    console.log("deleteTreatment");
    if(incluido == "No" && incluidoR == "No"){
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM treatment WHERE treatment_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("TreatmentManagement");
          } else {
            Alert.alert("El tratamiento no existe");
          }
        }
      );
    });
  }
  else
  {
    Alert.alert("Este tratamiento tiene asignados repeustos o isumos");
  }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <ScrollView >
                    <CustomText text="Busqueda de tratamiento" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <TreatmentDropDown 
                              defaultButtonText={"Tratamiento"}
                              onSelect={setId}
                            />                            
                             <CustomSingleButton title="Buscar" customPress={SearchTreatment} />
                <CustomInputText
                  placeholder="Nombre de tartamiento"
                  value={name}
                  editable={false}
                />
               <CustomInputText
                  placeholder="Matriula"
                  value={vehicle}
                  editable={false}
                />
                <CustomInputText
                  placeholder="Fecha inicio"
                  value={inDate}
                  editable={false}
                />  
                <CustomInputText
                  placeholder="Fecha final"
                  value={finDate}
                  editable={false}
                />  
                 <CustomInputText
                  placeholder="Costo"
                  value={price}
                  editable={false}
                />                
                            <CustomSingleButton title="Eliminar" customPress={deleteTreatment} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteTreatment

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
      inputStyle: {
        padding: 15,
      },
      text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
      },

})