import axios, { AxiosResponse } from 'axios'

import environment from '../../environment'

type LoginPayload = {
  email: string
  password: string
}

const login = async (loginPayload: LoginPayload): Promise<AxiosResponse> => axios.post(
  `${environment.truskApiBaseUrl}/login`,
  loginPayload,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
)

export default login
