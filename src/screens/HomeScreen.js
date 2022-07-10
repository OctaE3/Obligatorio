import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import CustomButtons from "../components/CustomButtons";


const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <CustomButtons 
              title="Zona usuarios"
              btnColor="#474747"
              btnIcon="user"
              customPress={() => navigation.navigate("UserManagement")}
            />
            <CustomButtons 
              title="Zona vehiculos"
              btnColor="#474747"
              btnIcon="car"
              customPress={() => navigation.navigate("VehiclesManagement")}
            />
            <CustomButtons 
              title="Zona tratamientos"
              btnColor="#474747"
              btnIcon="wrench"
              customPress={() => navigation.navigate("TreatmentManagement")}
            />
            <CustomButtons 
              title="Zona Repuestos"
              btnColor="#474747"
              btnIcon="gear"
              customPress={() => navigation.navigate("ReplacementManagement")}
            />
             <CustomButtons 
              title="Zona Insumos"
              btnColor="#474747"
              btnIcon="tint"
              customPress={() => navigation.navigate("SuppliesManagement")}
            />


          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

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