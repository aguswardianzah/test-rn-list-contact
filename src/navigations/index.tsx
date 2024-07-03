import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import List from "../screens/list"
import Form from "../screens/form"
import Detail from "../screens/detail"
import navigationConstant from "../constants/navigation"

const { screenName } = navigationConstant

const Stack = createNativeStackNavigator()

const Navigations = (): React.ReactNode => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="list">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="list"
            component={ List } />
          <Stack.Screen
            name="detail"
            component={ Detail } />
          <Stack.Screen
            name="form"
            component={ Form } />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations