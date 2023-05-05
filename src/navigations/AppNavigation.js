import React, { useContext, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import BillScreen from '../screens/BillPayment/BillPayment';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import AddOrder from '../screens/AddOrder/AddOrder';
import DetailPayment from '../screens/DetailPayment/DetailPayment';
import ActiveTableScreen from '../screens/ActiveTable/ActiveTableScreen';
import ToastNotification from '../Toast/toast';
import { SocketContext } from '../context/SocketContext';
import History from '../screens/History/History';

const Stack = createStackNavigator();

function MainNavigator() {

  return (
    //lib slide nav left in pages
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='ActiveTable' component={ActiveTableScreen} />
      <Stack.Screen name='Recipe' component={RecipeScreen} />
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='BillPayment' component={BillScreen} />
      <Stack.Screen name='Account' component={AccountScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
      <Stack.Screen name='AddOrder' component={AddOrder} />
      <Stack.Screen name='DetailPayment' component={DetailPayment} />
      <Stack.Screen name='History' component={History}/>




    </Stack.Navigator>
  )
}



const Drawer = createDrawerNavigator();

function DrawerStack() {
  // create nav-left 
  // component of this is a stack
  return (
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{ headerShown: false }}
      //drawer containner this is main nav left with navigation that is a item
      drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
}


export default function AppContainer() {
  const [visiableToast, setVisiableToast] = useState(false);
  const [backgroundToast, setBackgroundToast] = useState('#20639B');
  const { server } = useContext(SocketContext);

  useEffect(() => {
    console.log("server-respone-realtime: ", server)
    if (server) {
      if (server.target == 'add-order-successfuly') {
        setBackgroundToast('#20639B');
      } else if (server.target == 'payments-order-successfuly') {
        setBackgroundToast('green');
      } else if (server.target == 'update-order-successfuly') {
        setBackgroundToast('#f4c05f');
      }
      setVisiableToast(true)
    }
    setTimeout(function () {
      setVisiableToast(false)
    }, 4000)
  }, [server])

  return (
    <NavigationContainer>
      {!visiableToast ? <>

      </> : <ToastNotification data={server.message} background={backgroundToast}>

      </ToastNotification>}

      <DrawerStack />
    </NavigationContainer>
  )
}


console.disableYellowBox = true;