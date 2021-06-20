import {VehicleType} from './vehicle-type';
import {User} from './user';
import {Location} from './location';

export interface Vehicle {
  id?: number,
  owner?: User,
  vehicleType?: VehicleType,
  location?: Location,
  price?: number,
  description?: string,
  license?: string,
  brand?: string,
  cover?: string
}
