import axios from 'axios'

//! AUTH
export const LOGIN = '/api/auth/login'
export const SIGNUP = '/api/auth/signup'
export const LOGOUT = '/api/auth/logout'
export const REFRESH_ACCESS_TOKEN = '/api/auth/refresh-access-token'
export const GET_CURRENT_USER = '/api/auth/get-current-user'

//! USERS
export const GET_ALL_USERS = '/api/users'

export const BASE_URL = 'http://localhost:3001'

export const API = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "Content-Type,Authorization",
  //   "Access-Control-Allow-Credentials": true,
  //   "Content-Type": "application/json",
  // },
  withCredentials: true
})

export const API_PRIVATE = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
