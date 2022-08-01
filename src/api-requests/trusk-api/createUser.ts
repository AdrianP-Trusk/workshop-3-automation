import axios, { AxiosResponse } from 'axios'

import environment from '../../environment'

type CreateUserPayload = {
  completeName: string
  email: string
  phoneNumber: string
  password: string
  pricing: string
  store: {
    name: string
  }
}

const createUser = async (userPayload: CreateUserPayload): Promise<AxiosResponse> => axios.put(
  `${environment.truskApiBaseUrl}/user`,
  userPayload,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
)

export default createUser
