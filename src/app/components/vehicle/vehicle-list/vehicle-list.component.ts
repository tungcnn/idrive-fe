import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../../service/vehicle/vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ImageService} from '../../../service/image/image.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = []
  currentUserId: number = 1;

  constructor(private vehicleService: VehicleService,
              private imageService: ImageService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.vehicleService.getAllByUser(this.currentUserId, 1).subscribe(vehicles => {
      this.vehicles = vehicles;
    })
  }

  async deletePhotoFromFireBase() {

  }

  async deletePhotoOfVehicle(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.imageService.deletePhotoOfVehicle(id).subscribe(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  async deleteVehicle(id: number) {
    await this.deletePhotoOfVehicle(id);
    this.vehicleService.delete(id).subscribe(
      (response: void) => {
        this.getAll();
      },
      error => {
        alert(error.message);
      }
    );
  }

  async deleteConfirm(id: number) {
    Swal.fire({
      title: `Are you sure want to remove this listing?`,
      text: 'You will not be able to recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.value) {
        await this.deleteVehicle(id);
        Swal.fire(
          'Deleted!',
          'Your listing has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your listing is safe :)',
          'error'
        );
      }
    });
  }
}
