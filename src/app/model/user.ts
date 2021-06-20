import {Role} from './role';

export interface User {
  userId?: number,
  username?: string,
  fullName?: string,
  about?: string,
  avatar?: string,
  phone?: string,
  address?: string,
  birthDay?: string,
  password?: string,
  email?: string,
  created?: number,
  role?: Role
}
