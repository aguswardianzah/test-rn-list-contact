import Toast from "react-native-toast-message"
import { Provider } from "react-redux"
import { store } from "./src/store"
import Navigations from "./src/navigations"
import toastConfig from "./src/components/toast"

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <Navigations />
      <Toast config={toastConfig} />
    </Provider>
  )
}

export default App