import { combineReducers } from 'redux'
import authReducer from './authReducer'
import adminUsersReducer from './adminUsersReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  adminUsers: adminUsersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
