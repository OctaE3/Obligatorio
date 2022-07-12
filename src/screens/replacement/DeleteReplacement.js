import React, {useState} from 'react'
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import CustomSingleButton from '../../components/CustomSingleButton'
import CustomText from '../../components/CustomText'
import DatabaseConnection from "../../database/database-connection";
import ReplacementDropDown from '../../components/ReplacementDropDown';
import CustomInputText from '../../components/CustomInputText'
const db = DatabaseConnection.getConnection();


const DeleteReplacement = ({navigation}) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [treatment, setTreatment] = useState("");

    const searchSupplies = () => {
      console.log("searchSupplies");
  
      if (!id.toString().trim()) {
        Alert.alert("El codigo es requerido");
        return;
      }
  
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM replacement WHERE replacement_id = ?",
          [id],
          (tx, results) => {
            if (results.rows.length > 0) {
              setName(results.rows.item(0).replacement_name);
              setAmount(results.rows.item(0).amount.toString());
              setTreatment(results.rows.item(0).treatment);
            } else {
              Alert.alert("Insumo no encontrado");
            }
          }
        );
      });
    };

  const deleteReplacement = () => {
    console.log("deleteReplacement");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM replacement WHERE replacement_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto eliminado");
            navigation.navigate("ReplacementManagement");
          } else {
            Alert.alert("El repuesto no existe");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <View style={styles.generalView}>
                <ScrollView >
                    <CustomText text="Busqueda de repuesto" style={styles.text}/>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <ReplacementDropDown
                                defaultButtonText={"Codigo"}
                                onSelect={setId}
                            />
                             <CustomSingleButton title="Buscar" customPress={searchSupplies} />
                <CustomInputText
                  placeholder="Nombre de insumo"
                  value={name}
                  editable={false}
                />
                <CustomInputText
                  placeholder="Cantidad"
                  value={amount}
                  editable={false}
                /> 
                 <CustomInputText
                  placeholder="Tratamiento"
                  value={treatment}
                  editable={false}
                />
                            <CustomSingleButton title="Eliminar" customPress={deleteReplacement} />
                        </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DeleteReplacement

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