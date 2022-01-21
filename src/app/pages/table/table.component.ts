import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICarOwners } from 'src/app/shared/interface/ICarOwners.interface';
import { OwnersService } from 'src/app/shared/services/owners/owners.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public ownersArray!: Array<ICarOwners>
  constructor(
    private OwnersServices: OwnersService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadOwners()
  }
  
  loadOwners() {
    this.OwnersServices.getAllOwners().subscribe(e => {      
      this.ownersArray = e 
    },err=>{
      console.log(err);
      
    })
  }

  deleteEl(id:number):void{
    this.OwnersServices.delete(id).subscribe(e=>{
      this.loadOwners() 
      this.toastr.success(`Видалено!`)
    },err=>{
      this.toastr.error(`Щось пішло не так`)
      console.log(err);
      
    })
  }

}
