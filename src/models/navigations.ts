import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type ScreenParamList = {
  list: undefined,
  detail: {
    id: string
  },
  form: {
    id?: string,
    isEdit?: boolean
  }
}

export type NavigationProps<T extends keyof ScreenParamList> = NativeStackScreenProps<ScreenParamList, T>