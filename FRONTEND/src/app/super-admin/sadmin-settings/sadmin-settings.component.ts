import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BackendService } from 'src/app/services/backend.service';
import { WahieService } from 'src/app/services/wahie.service';

@Component({
  selector: 'app-sadmin-settings',
  templateUrl: './sadmin-settings.component.html',
  styleUrls: ['./sadmin-settings.component.scss']
})
export class SadminSettingsComponent {

  constructor(private http: HttpClient, private wahieService:WahieService, private route:Router, private backend:BackendService,
    private toast:NgToastService) {

  }

  addDepartment = new FormGroup({
    department : new FormControl("", [Validators.required])
  })
  public depform = {
    department:null
  }
  deptModal = -1;
  showdept(index: number){
    this.deptModal = index;
  }
  addDept(){
    console.log(this.depform)
    return this.backend.deptAdd(this.depform).subscribe((res:any)=>{
      this.showdept(2)
      this.toast.success({detail:'added',summary:'account added', sticky:false,position:'false'});  
    });
  }
}
