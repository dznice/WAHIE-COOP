import { Component, OnInit } from '@angular/core';
import { logItem } from './logItem';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/services/backend.service';



@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss'],
})
export class ActivityLogsComponent implements OnInit{


  item: logItem[] = [];
  term: string = '';
  p: number = 1;
  
  stringStart: string = new Date().toDateString();
  startDate: string = '';
  stringEnd: string = new Date().toDateString();
  endDate : string = '';
  
  constructor(private http:HttpClient, private backend:BackendService){
    
  }


ngOnInit():void{
this.showAct()
}

showAct(){
  return this.backend.actLog().subscribe((res:any)=>{
    console.log(res);
    this.item = res
   
  });     
}

}
