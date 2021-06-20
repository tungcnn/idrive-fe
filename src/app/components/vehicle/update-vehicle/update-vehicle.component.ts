import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VehicleService} from '../../../service/vehicle/vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import {ActivatedRoute} from '@angular/router';
import {VehicleTypeService} from '../../../service/vehicle-type/vehicle-type.service';
import {LocationService} from '../../../service/location/location.service';
import {VehicleType} from '../../../model/vehicle-type';
import {Location} from '../../../model/location';
import {Image} from '../../../model/image';
import {ImageService} from '../../../service/image/image.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  vehicleForm: Vehicle = {};
  vehicleId: number;
  vehicleTypes: VehicleType[] = [];
  locations: Location[] = [];
  images: Image[] = [];
  files: File[] = [];
  currentUserId: number = 1;

  @ViewChild('imageInput', {static: false})
  myFileInput: ElementRef;

  constructor(private vehicleService: VehicleService,
              private activeRoute: ActivatedRoute,
              private vehicleTypeService: VehicleTypeService,
              private locationService: LocationService,
              private imageService: ImageService,
              private storage: AngularFireStorage) {
    this.activeRoute.paramMap.subscribe(paramMap=>{
      this.vehicleId = +paramMap.get("id");
    })
  }

  ngOnInit() {
    this.files = [];
    this.vehicleService.findById(this.vehicleId).subscribe(vehicle => {
      this.vehicleForm = vehicle;
    })
    this.vehicleTypeService.getAll().subscribe(vehicleTypes => {
      this.vehicleTypes = vehicleTypes;
    });
    this.locationService.getAll().subscribe(locations => {
      // @ts-ignore
      this.locations = locations
    })
    this.getAllImage();
  }

  getAllImage() {
    this.imageService.getAll(this.vehicleId).subscribe(images => {
      this.images = images;
    })
  }

  public onFileSelected(event) {
    const file = event.target.files[0];
    if (file.type !== "image/jpeg") {
      console.log("Failed");
      this.myFileInput.nativeElement.value = '';
    } else {
      this.files.push(event.target.files[0]);
    }
  }

  async deleteImage(id: number) {
    this.imageService.delete(id).subscribe(
      (response: void) => {
        Swal.fire(
          'Deleted!',
          'success',
          'success'
        )
        this.getAllImage();
      },
      error => {
        alert(error.message);
      }
    );
  }

  async deleteConfirm(id: number) {
    Swal.fire({
      title: `Are you sure want to remove this image?`,
      text: 'You will not be able to recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.value) {
        await this.deleteImage(id);
        Swal.fire(
          'Deleted!',
          'Your image has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your image is safe :)',
          'error'
        );
      }
    });
  }

  public async uploadImage(file: File) {
    return new Promise<any>((resolve, reject) => {
      const fileName = file.name.split('.')[0].replace(/[^\w\s]/gi, '');
      const filePath = `idrive/${fileName}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(res),
          err => reject(err))
        )
      ).subscribe();
    });
  }

  async addImageToDB(image: Image) {
    return new Promise<any>((resolve, reject) => {
      this.imageService.add(image).subscribe(
        res => resolve(res),
        err => reject(err))
    })
  }

  async addCoverPhoto(vehicle: Vehicle) {
    return new Promise<any>((resolve, reject) => {
      this.vehicleService.edit(vehicle).subscribe(
        res => resolve(res),
        err => reject(err))
    })
  }

  async uploadAllImages(vehicle: Vehicle) {
    let coverChosen = false;
    return new Promise<any>(async (resolve, reject) => {
      console.log(this.files)
      if (this.files.length > 0) {
        for (let file of this.files) {
          console.log(file)
          const url = await this.uploadImage(file);
          console.log("done upload image")
          const img: Image = {
            imgUrl: url,
            vehicle: vehicle
          }
          await this.addImageToDB(img);
          if(!coverChosen && this.images.length <= 0) {
            vehicle.cover = url;
            vehicle.owner = {
              userId: this.currentUserId
            }
            console.log(vehicle);
            await this.addCoverPhoto(vehicle)
            coverChosen = true;
          }
          console.log("done add to DB")
        }
      }

      Swal.fire(
        'Updated!',
        'success',
        'success'
      )
      this.getAllImage();
    })
  }

  async handleSubmit(addVehicleForm: NgForm) {
    let timerInterval;
    Swal.fire({
      title: 'Uploading!',
      html: 'Please wait for about <b></b> milliseconds.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    this.vehicleService.edit(addVehicleForm.value).subscribe(() => {
        this.uploadAllImages(this.vehicleForm)
    }, error => {
      console.log("error")
    })
  }
}
