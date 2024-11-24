import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import GlobalReducer from './reducers'
import DashboardReducer from '../pages/Frontend/DashboardPage/reducer'
import MartReducer from '../pages/Frontend/MartPage/reducer'
import InventoryReducer from '../pages/Frontend/InventoryPage/reducer'

export const store = configureStore({
    reducer: {
        global: GlobalReducer,
        dashboard: DashboardReducer,
        mart: MartReducer,
        inventory: InventoryReducer,
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })]
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
