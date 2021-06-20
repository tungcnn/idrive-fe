import {User} from './user';
import {Vehicle} from './vehicle';

export interface OrderDetail {
  id?:number;
  renter?:User[];
  own?:User[];
  vehicle?:Vehicle[];
  startTime?:Date;
  endTime?:Date;
  totalPrice?:number;
  status?:number;
}
