import { toast } from 'sonner'
import type { AppDispatch } from '../store'
import api from '../api/axios'
import { getApiErrorMessage } from '../utils/apiMessage'
import * as T from '../constants/adminUserTypes'
import type { PortalPagedResult } from '../types/portal'
import type { AdminUserListItemDto } from '../types/portal'

export interface FetchAdminUsersParams {
  page?: number
  pageSize?: number
  role?: string
  status?: string
  search?: string
}

export const fetchAdminUsers = (params: FetchAdminUsersParams = {}) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: T.ADMIN_USERS_LOADING })
    try {
      const { data } = await api.get<PortalPagedResult<AdminUserListItemDto>>('/api/admin/users', {
        params: {
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 20,
          role: params.role || undefined,
          status: params.status || undefined,
          search: params.search || undefined,
        },
      })
      dispatch({
        type: T.ADMIN_USERS_SUCCESS,
        payload: {
          items: data.items ?? [],
          page: data.page,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
        },
      })
    } catch (e: unknown) {
      const msg = getApiErrorMessage(e, 'Lỗi mạng')
      dispatch({ type: T.ADMIN_USERS_ERROR, payload: msg })
      toast.error(msg)
    }
  }
}
