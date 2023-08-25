import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpense from './screens/RecentExpense';
import { GlobalStyles } from './constants/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import IconBtn from './components/UI/IconBtn';
import ExpenseContextProvider from './store/expense-context';


const Stack = createNativeStackNavigator()
const Bottom = createBottomTabNavigator()



const AddBtnHandler = (navigation) => {
  console.log('expense added')
  navigation.navigate('ManageExpense')
}


const ExpenseOverview = () => {
  return <Bottom.Navigator screenOptions={({ navigation }) => ({

    headerStyle: { backgroundColor: GlobalStyles.colors.primary500, },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: () => { return <IconBtn icon="add" size={24} color='white' onTap={() => { AddBtnHandler(navigation) }} /> }

  })}>
    <Bottom.Screen name="RecentExpense" component={RecentExpense} options={{ title: 'Recent Expenses', tabBarLabel: 'Recent', tabBarIcon: ({ color, size }) => { return <Ionicons name='hourglass' size={size} color={color} /> } }} />
    <Bottom.Screen name="AllExpense" component={AllExpenses} options={{ title: 'All Expenses', tabBarLabel: 'All', tabBarIcon: ({ color, size }) => { return <Ionicons name='calendar' size={size} color={color} /> } }} />
  </Bottom.Navigator>
}

export default function App() {
  return (

    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500, }, headerTintColor: 'white',


          }} >
            <Stack.Screen name="ExpenseOverview" component={ExpenseOverview} options={{ headerShown: false }} />
            <Stack.Screen options={{ presentation: 'modal' }} name="ManageExpense" component={ManageExpense} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>


  );
}


