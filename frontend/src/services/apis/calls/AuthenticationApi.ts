import axios from 'axios';

import {LoginPayload} from '../types/LoginPayload';
import {LoginResponse} from '../types/LoginResponse';

export async function callLogin(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/login', payload);
  return response.data;
}

export async function callLogout(): Promise<any> {
  const response = await axios.get<any>('/api/logout');
  return response.data;
}
