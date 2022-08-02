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

const createUser = async (userPayload: CreateUserPayload): Promise<AxiosResponse> => {
  const url = `${environment.truskApiBaseUrl}/user`
  console.log('Send create user request with url', url)
  return axios.put(
    url,
    userPayload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

export default createUser
