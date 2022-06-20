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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
