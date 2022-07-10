import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import UserManagement from "../screens/users/UserManagement";
import VehiclesManagement from "../screens/vehicles/VehiclesManagement";
import TreatmentManagement from "../screens/treatment/TreatmentManagement";
import RegisterUser from "../screens/users/RegisterUser";
import ViewAllUsers from "../screens/users/ViewAllUsers";
import DeleteUser from "../screens/users/DeleteUser";
import AddVehicle from "../screens/vehicles/AddVehicle";
import DeleteVehicle from "../screens/vehicles/DeleteVehicle";
import ViewAllVehicles from "../screens/vehicles/ViewAllVehicles";
import SearchUser from "../screens/users/SearchUser";
import SearchVehicle from "../screens/vehicles/SearchVehicle";
import UpdateUser from "../screens/users/UpdateUser";
import UpdateVehicle from "../screens/vehicles/UpdateVehicle";
import AddTreatment from "../screens/treatment/AddTreatment";
import DeleteTreatment from "../screens/treatment/DeleteTreatment";
import SearchTreatment from "../screens/treatment/SearchTreatment";
import UpdateTreatment from "../screens/treatment/UpdateTreatment";
import ViewAllTreatments from "../screens/treatment/ViewAllTreatments";
import ReplacementManagement from "../screens/replacement/ReplacementManagement";
import AddReplacement from "../screens/replacement/AddReplacement";
import DeleteReplacement from "../screens/replacement/DeleteReplacement";
import SearchReplacement from "../screens/replacement/SearchReplacement";
import UpdateReplacement from "../screens/replacement/UpdateReplacement";
import ViewAllReplacements from "../screens/replacement/ViewAllReplacements";
import SuppliesManagement from "../screens/supplies/SuppliesManagement";
import AddSupplies from "../screens/supplies/AddSupplies";
import DeleteSupplies from "../screens/supplies/DeleteSupplies";
import SearchSupplies from "../screens/supplies/SearchSupplies";
import UpdateSupplies from "../screens/supplies/UpdateSupplies";
import ViewAllSupplies from "../screens/supplies/ViewAllSupplies";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
          {/* Usuarios */}

        <Stack.Screen
          name="UserManagement"
          component={UserManagement}
          options={{
            title: "Gestión de usuarios",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{
            title: "Registrar",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUsers}
          options={{
            title: "Lista de usuarios",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
               <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            title: "Buscar vehiculo",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: "Modificar usuarios",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
         <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title: "Eliminar usuarios",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

          {/* Vehiculos */}

        <Stack.Screen
          name="VehiclesManagement"
          component={VehiclesManagement}
          options={{
            title: "Gestión de vehiculos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddVehicle"
          component={AddVehicle}
          options={{
            title: "Añadir Vehiculos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllVehicles"
          component={ViewAllVehicles}
          options={{
            title: "Lista de Vehiculos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SearchVehicle"
          component={SearchVehicle}
          options={{
            title: "Buscar vehiculo",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateVehicle"
          component={UpdateVehicle}
          options={{
            title: "Modificar Vehiculos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteVehicle"
          component={DeleteVehicle}
          options={{
            title: "Eliminar Vehiculos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        {/* Tratamientos*/}

        <Stack.Screen
          name="TreatmentManagement"
          component={TreatmentManagement}
          options={{
            title: "Gestión de tratamientos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 
        <Stack.Screen
          name="AddTreatment"
          component={AddTreatment}
          options={{
            title: "Añadir Tratamiento",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllTreatments"
          component={ViewAllTreatments}
          options={{
            title: "Lista de Tratamientos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SearchTreatment"
          component={SearchTreatment}
          options={{
            title: "Buscar tratamiento",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateTreatment"
          component={UpdateTreatment}
          options={{
            title: "Modificar Tratamiento",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteTreatment"
          component={DeleteTreatment}
          options={{
            title: "Eliminar tratamiento",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />              
        {/* Repuestos*/}
        <Stack.Screen
          name="ReplacementManagement"
          component={ReplacementManagement}
          options={{
            title: "Gestión de repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 
         <Stack.Screen
          name="AddReplacement"
          component={AddReplacement}
          options={{
            title: "Agregar Repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 
          <Stack.Screen
          name="DeleteReplacement"
          component={DeleteReplacement}
          options={{
            title: "Borrar Repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SearchReplacement"
          component={SearchReplacement}
          options={{
            title: "Buscar Repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />  
        <Stack.Screen
          name="UpdateReplacement"
          component={UpdateReplacement}
          options={{
            title: "Modificar Repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllReplacements"
          component={ViewAllReplacements}
          options={{
            title: "Ver Repuestos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
          {/* Insumos*/}
          <Stack.Screen
          name="SuppliesManagement"
          component={SuppliesManagement}
          options={{
            title: "Gestión de insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddSupplies"
          component={AddSupplies}
          options={{
            title: "Agregar insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 
        <Stack.Screen
          name="DeleteSupplies"
          component={DeleteSupplies}
          options={{
            title: "Eliminar insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 
        <Stack.Screen
          name="SearchSupplies"
          component={SearchSupplies}
          options={{
            title: "Buscar insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />  
        <Stack.Screen
          name="UpdateSupplies"
          component={UpdateSupplies}
          options={{
            title: "Modificar insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />  
        <Stack.Screen
          name="ViewAllSupplies"
          component={ViewAllSupplies}
          options={{
            title: "Ver insumos",
            headerStyle: {
              backgroundColor: "#474747",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
