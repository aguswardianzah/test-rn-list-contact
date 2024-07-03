import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { contactApi } from "./contact"

const middlewares = [ contactApi.middleware ]

export const store = configureStore({
  reducer: { 
    [contactApi.reducerPath]: contactApi.reducer  
  },
  middleware: getDefMiddleware => getDefMiddleware().concat(middlewares)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>