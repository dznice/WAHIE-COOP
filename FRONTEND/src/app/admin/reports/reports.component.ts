import { Component,OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{

  constructor( private http: HttpClient, private route: Router, private toast: NgToastService) {


  }
  ngOnInit(): void {
  }

  subLedger(){
      this.route.navigateByUrl('admin/reports/ledger');
  }
}
