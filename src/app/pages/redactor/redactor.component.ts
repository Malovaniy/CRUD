import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICars } from 'src/app/shared/interface/ICars.interfece';
import { ToastrService } from 'ngx-toastr';
import { OwnersService } from 'src/app/shared/services/owners/owners.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarOwners } from 'src/app/shared/interface/ICarOwners.interface';

@Component({
  selector: 'app-redactor',
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.scss']
})
export class RedactorComponent implements OnInit {

  public arrayOwners: Array<ICarOwners> =[]
  public uid!: number | string
  public editedOwner!: ICarOwners
  public editStatus = false
  public ownerForm!: FormGroup;
  public carsForm!: FormGroup;
  public carsArray: Array<ICars> = []
  public submitted = false;
  public submitted2 = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private OwnersServices: OwnersService,
  ) {
    this.uid = this.activeRoute.snapshot.params.elem
  }

  ngOnInit(): void {
    this.loadOwnerForEdit()
    this.initCarForm()
    this.initOwnerForm()
  }

  initCarForm(): void {
    this.carsForm = this.fb.group({
      brand: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZАА-Яа-яЇїЙйІіҐґ]+$')]],
      number: [null, [Validators.required, Validators.pattern('[А-ЯЇЙІҐ]{2}[0-9]{4}[А-ЯЇЙІҐ]{2}$')]],
      model: [null, [Validators.required, Validators.minLength(2)]],
      year: [null, Validators.required]
    })
  }

  loadOwnerForEdit(): void {
    this.OwnersServices.getAllOwners().subscribe((e: Array<ICarOwners>)=> {
      this.arrayOwners = e
      if (this.uid === `new`) {
        this.editStatus = false
      }
      else {
        this.editStatus = true
        this.editedOwner = this.arrayOwners?.find(e => e.id === +this.uid) as ICarOwners
        this.initOwnerForm()
        this.carsArray = this.editedOwner.cars
      }
    }, err => {
      console.log(err);
    })
  }

  initOwnerForm(): void {
    this.ownerForm = this.fb.group({
      name: [this.editedOwner?.name,
      [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZАА-Яа-яЇїЙйІіҐґ]+$')]],
      lname: [this.editedOwner?.lname,
      [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZАА-Яа-яЇїЙйІіҐґ]+$')]],
      sname: [this.editedOwner?.sname,
      [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZАА-Яа-яЇїЙйІіҐґ]+$')]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.carsForm.controls;
  }
  get ff(): { [key: string]: AbstractControl } {
    return this.ownerForm.controls;
  }

  saveOwner(): void {
    if (this.ownerForm.valid && this.carsArray.length > 0) {
      let obj = {
        ...this.ownerForm.value,
        cars: this.carsArray,
      }
      if (this.editStatus) {
        this.editedOwner = {
          ...obj,
          id: +this.uid
        }
        this.OwnersServices.updateOwner(this.editedOwner).subscribe(e => {
          this.toastr.success(`Успішно редаговано`)
          this.router.navigate([''])
        }, err => {
          this.toastr.error(`Щось пішло не так`)
          console.log(err);
        })
      }
      else {
        this.OwnersServices.createOwner(obj).subscribe(() => {
          this.toastr.success(`Успішно стоврено`)
          this.router.navigate([''])
        }, err => {
          this.toastr.error(`Щось пішло не так`)
          console.log(err);
        })
      }
    }
    else {
      this.toastr.error(`Не вірно заповнена форма, або відсутні машини`)
      this.submitted2 = true
    }
  }

  addCar(): void {
    let isNumRepeated = false
    this.arrayOwners.forEach(e => e.cars.filter(el =>{
      if(el.number === this.carsForm.value.number){
        isNumRepeated =true
      }
    }))      
        
    if (this.carsForm.valid && !isNumRepeated) {
      this.carsArray.push(this.carsForm.value)
      console.log(this.carsArray);
      this.carsForm.reset()
      this.toastr.success(`Авто успішно додане`)
    }
    else {
      this.toastr.error(`Не вірно заповнена форма або авто з такими номерами вже існує`)
      this.submitted = true
    }
  }

  deleteCar(id: number): void {
    this.carsArray.splice(id, 1)
  }
}
