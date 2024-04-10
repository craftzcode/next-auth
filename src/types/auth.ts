export interface AuthType {
  accessToken?: string
}

export interface LoginType {
  usernameOrEmail: string
  password: string
}

export interface UserType {
  id: string
  name: string
  username: string
  email: string
  image?: string
  role: string
}
