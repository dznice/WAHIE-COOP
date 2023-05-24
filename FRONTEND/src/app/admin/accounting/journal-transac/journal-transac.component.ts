import { Component, OnInit } from '@angular/core';
import { Item } from './transacitem';
import { itemService } from './transacitem.service';
import { WahieService } from '../../../services/wahie.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgToastService } from'ng-angular-popup';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-journal-transac',
  templateUrl: './journal-transac.component.html',
  styleUrls: ['./journal-transac.component.scss'],
  providers: [itemService],
})
export class JournalTransacComponent implements OnInit {
  item: Item[] = [];
  term: string = '';
  private urlId : Subscription;
  public account: any;
  jlogs: any;

  public journalLogs: any;

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'trialFile',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'trialFile'
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'Reports').subscribe(() => {
      // save started
    });
  }

  exportEXCEL() {
    this.exportAsService.save(this.exportAsExcel, 'Reports').subscribe(() => {
      // save started
    });
  }

  constructor(
    private ItemService: itemService, 
    private wahieService:WahieService, 
    private http:HttpClient, 
    private aRouter: ActivatedRoute, 
    private route:Router, 
    private toast: NgToastService,
    private exportAsService: ExportAsService) {}

  

  id:number = 0;
  ngOnInit(): void {
    this.showAccounting();
    // this.showLogs();
    this.item = this.ItemService.item;
    this.urlId = this.aRouter.params.subscribe(
      params=>{

      console.log(params);
      console.log(params['transacId'])
      this.id = params['transacId']
      console.log('hello' + this.id)
    })

    this.fetchJournalLogs(this.id)
  }

  showAccounting(): void{
    this.http.get('http://127.0.0.1:8000/api/account').subscribe(
      (res:any)=>
      {
        console.log(res);
        this.account = res
        console.log('hello' + this.id)
    });
  }

  // showLogs(): void{
  //   this.jlogs = this.wahieService.JournalLogs(this.id).subscribe((jlog:any[])=>{
  //       this.jlogs = jlog
  //       console.log(this.jlogs);
  //       console.log(this.id)
  //   });
  // }


  public fetchJournalLogs(journalNo: number) {
    this.wahieService.getJournalLogs(journalNo).subscribe(
      (response: any) => {
        this.journalLogs = response;
        console.log(this.journalLogs); // Optional: Log the retrieved data
      },
      (error: any) => {
        console.error(error); // Handle error if necessary
      }
    );
  }

}

