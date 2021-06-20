import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VehicleTypeService} from '../../../service/vehicle-type/vehicle-type.service';
import {VehicleType} from '../../../model/vehicle-type';
import {LocationService} from '../../../service/location/location.service';
import {NgForm} from '@angular/forms';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../../../service/vehicle/vehicle.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Image} from '../../../model/image';
import {ImageService} from '../../../service/image/image.service';
import {Location} from '../../../model/location';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AuthService} from '../../../service/auth.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];
  locations: Location[] = [];
  vehicleForm: Vehicle = {};
  files: File[] = [];
  currentUserId: number;
  isLoggedIn: boolean;
  username: string;

  @ViewChild('imageInput', {static: false})
  myFileInput: ElementRef;

  constructor(private vehicleTypeService: VehicleTypeService,
              private locationService: LocationService,
              private vehicleService: VehicleService,
              private storage: AngularFireStorage,
              private imageService: ImageService,
              private authService: AuthService,
              private userService: UserService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.currentUserId = data);
  }

  ngOnInit() {
    this.vehicleTypeService.getAll().subscribe(vehicleTypes => {
      this.vehicleTypes = vehicleTypes;
    });
    this.locationService.getAll().subscribe(locations => {
      // @ts-ignore
      this.locations = locations
    })
    this.username = this.authService.getUserName();
    this.currentUserId = this.authService.getUserId();
    if (this.username != null){
      this.isLoggedIn = true;
    }
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
      for (let file of this.files) {
        console.log(file)
        const url = await this.uploadImage(file);
        console.log("done upload image")
        const img: Image = {
          imgUrl: url,
          vehicle: vehicle
        }
        await this.addImageToDB(img);
        if(!coverChosen) {
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
      Swal.fire(
        'Success!',
        'success',
        'success'
      )
      this.myFileInput.nativeElement.value = '';
    })
  }



  async handleSubmit(addVehicleForm: NgForm) {
    let timerInterval
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
    this.vehicleService.add(addVehicleForm.value).subscribe(vehicle => {
      if (this.files.length > 0) {
        this.uploadAllImages(vehicle)
        addVehicleForm.reset();
      }
    }, error => {
      console.log("error")
    })
  }
}
