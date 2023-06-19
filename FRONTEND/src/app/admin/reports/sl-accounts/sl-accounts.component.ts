import { Component, Input , OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-sl-accounts',
  templateUrl: './sl-accounts.component.html',
  styleUrls: ['./sl-accounts.component.scss']
})
export class SlAccountsComponent implements OnChanges {
  //add notes
  notes: string[] = [];
  newNote: string ='';

  addNote(){
    if(this.newNote) {
      this.notes.push(this.newNote);
      this.newNote='';
    }
  }

  saveNotes(){
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  @Input() formData: any;
  //@Input() trial: any;
  // @Input() slData: any[];
  // @Input() PastslData: any[];

  showReport: boolean;
  public ledgers: any;
  public brokenledgers: any;
  public pledgers: any;
  public brokenpledgers: any;
  public accInfos: any;
  public memInfos: any;
  public oneYearAgo: any;
  public maxDate: any;
  constructor( private wahieService:WahieService, private toast:NgToastService, private http:HttpClient){

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['formData']) {
      // Perform necessary actions based on the submitted value
      this.ngOnInit();
      
    }
  }

  ngOnInit(): void{
    //save note
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }

    this.getLogo();
    this.formatDate();
    this.showLibJournalInfo(this.formData.account);
    this.showMemberInfo(this.formData.member);
    this.showSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.sLegderBroken(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.showPastSLedger(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.showPastSLedgerBroken(this.formData.member, this.formData.account, this.formData.startDate, this.formData.endDate);
    this.oneYearAgo = new Date(this.maxDate);
    this.oneYearAgo.setFullYear(this.oneYearAgo.getFullYear() - 1);
    // console.log(this.slData);
    // console.log(this.PastslData);
  }

  generateExcel(): void{
    // Create a new spreadsheet:
      const spreadSheet = new ExcelJS.Workbook();
      spreadSheet.creator = 'WAH-COOP';
      spreadSheet.lastModifiedBy = 'Pogi';
      spreadSheet.created = new Date();
      spreadSheet.modified = new Date();

    // Add a sheet
    const excelSheet = spreadSheet.addWorksheet('Subsidiary Ledger');

        excelSheet.mergeCells(`A1:A4`);
        excelSheet.getCell('A1').value = 'Logo Here'
        excelSheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle'};
        excelSheet.getCell('A1').font = { size: 15, bold: true };
        excelSheet.getCell('A1').border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' }
        };

        const imageId = spreadSheet.addImage({
          buffer: this.preLogo,
          extension: 'png'
        });
        excelSheet.addImage(imageId, 'A1:A4');
        
        excelSheet.getColumn('A').width = 12;
        excelSheet.getColumn('B').width = 30;
        excelSheet.getColumn('C').width = 16;
        excelSheet.getColumn('D').width = 16;
        excelSheet.getColumn('E').width = 16;

        excelSheet.mergeCells(`B1:E1`);
        excelSheet.getCell('B1').value = 'Provincial Employees Credit Cooperative';
        excelSheet.getCell('B1').alignment = { horizontal: 'center'};
        excelSheet.getCell('B1').font = { size: 12 };
        excelSheet.getCell('B1').border = {
          top: { style: 'thin' },
          right: { style: 'thin' }
        };

        excelSheet.mergeCells(`B2:E2`);
        excelSheet.getCell('B2').value = 'PCEDO Office, Old IBP Bldg., Rotary Lane, San Vicente, Tarlac City';
        excelSheet.getCell('B2').alignment = { horizontal: 'center'};
        excelSheet.getCell('B2').font = { size: 12 };
        excelSheet.getCell('B2').border = {
          right: { style: 'thin' }
        };
        
        if(this.formData.account!=''){
          excelSheet.mergeCells(`B3:E3`);
          excelSheet.getCell('B3').value = 'Subsidiary Ledger for ' + this.accInfos.journal_name;
          excelSheet.getCell('B3').alignment = { horizontal: 'center'};
          excelSheet.getCell('B3').font = { size: 12, bold: true};
          excelSheet.getCell('B3').border = {
            right: { style: 'thin' }
          };
        }

        if(this.formData.member!='' && this.formData.account==''){
          excelSheet.mergeCells(`B3:E3`);
          excelSheet.getCell('B3').value = 'Subsidiary Ledger for ' + this.memInfos.first_name + ' ' + this.memInfos.middle_name + ' ' + this.memInfos.last_name;
          excelSheet.getCell('B3').alignment = { horizontal: 'center'};
          excelSheet.getCell('B3').font = { size: 12, bold: true};
          excelSheet.getCell('B3').border = {
            right: { style: 'thin' }
          };
        }

        if(this.formData.member=='' && this.formData.account==''){
          excelSheet.mergeCells(`B3:E3`);
          excelSheet.getCell('B3').value = 'Subsidiary Ledger for All Accounts';
          excelSheet.getCell('B3').alignment = { horizontal: 'center'};
          excelSheet.getCell('B3').font = { size: 12, bold: true};
          excelSheet.getCell('B3').border = {
            right: { style: 'thin' }
          };
        }
        
        excelSheet.mergeCells(`B4:E4`);
        excelSheet.getCell('B4').value = 'As of ' + this.maxDate;
        excelSheet.getCell('B4').alignment = { horizontal: 'center'};
        excelSheet.getCell('B4').font = { size: 12 };
        excelSheet.getCell('B4').border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        };

        if(this.formData.startDate!='' && this.formData.endDate!=''){
          excelSheet.mergeCells(`B5:E5`);
          excelSheet.getCell('B5').value = 'This report based from ' + this.formData.startDate + ' to '+ this.formData.endDate ;
          excelSheet.getCell('B5').alignment = { horizontal: 'center'};
          excelSheet.getCell('B5').font = { size: 10 };
          excelSheet.getCell('B5').border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' }
          };

          excelSheet.mergeCells(`B6:E6`);
          excelSheet.getCell('B6').value = '';
        }else{

          excelSheet.mergeCells(`B5:E5`);
          excelSheet.getCell('B5').value = '';
        }

        
        // Create the headers
        const reportHeaders = ['','Particulars', '' , 'Payment this '+this.maxDate, 'Current Balance of '+this.maxDate ];
        this.pledgers.forEach((data, index) =>{
          console.log(index)
        if(index === this.pledgers.length - 1){
            reportHeaders[2] = 'Starting Balance of '+data.startingBalanceYear;
          }
        });
        const reportHeaderRow = excelSheet.addRow(reportHeaders);
        const addedRow = excelSheet.getRow(excelSheet.rowCount);
        addedRow.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
          };
        });
        reportHeaderRow.font = { bold: true, size: 12};
        reportHeaderRow.eachCell((cell) => {
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });

        this.ledgers.forEach(data =>{
          const list = [''];
          this.brokenledgers.forEach(data1=>{
            if(data1.result.total_balance > 0){
              if(data.result.journal_name === data1.result.journal_name){
                list[1]= 'Transaction #'+data1.result.transactNumber+ ', '+data1.result.transactDate;
                this.brokenledgers.forEach(data2=>{
                  if(data1.result.transactNumber === data2.result.transactNumber){
                    if(data2.result.total_balance > 0){
                      list[2]=data2.result.total_balance;
                    }
                  }
                });
              }
              list[3]=data1.examplebroken;
              list[4]=data1.result.total_balance;
            }
            excelSheet.addRow(list);
          });
          const empty = ['','','','',''];
          const emptyRow = excelSheet.addRow(empty);
          const addedRow = excelSheet.getRow(excelSheet.rowCount);
          addedRow.eachCell((cell) => {
            cell.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
            };
          });

          const empty2 = [''];
          const emptyRow1 = excelSheet.addRow(empty2);

          const res=['', data.result.name ? data.result.name : data.result.journal_name,
                      '', data.example, data.result.total_balance];
          this.pledgers.forEach(data4=>{
            if(data.result.journId === data4.result.journId){
              res[2]=data4.result.total_balance;
            }
          });
          excelSheet.addRow(res);
          const added1Row = excelSheet.getRow(excelSheet.rowCount);
          added1Row.eachCell((cell) => {
            cell.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
            };
          });
        });

        const noteRow = ['Notes:','','','',''];
        excelSheet.addRow(noteRow);
        const added1Row = excelSheet.getRow(excelSheet.rowCount);
          added1Row.eachCell((cell) => {
            cell.border = {
              bottom: { style: 'thin' },
            };
          });

        this.notes.forEach((data, index) =>{
          const list = ['', this.notes[index] ,'','',''];
          excelSheet.addRow(list);
          
        });

        const emptyRow = ['','','','',''];
        excelSheet.addRow(emptyRow);
        const added2Row = excelSheet.getRow(excelSheet.rowCount);
          added2Row.eachCell((cell) => {
            cell.border = {
              top: { style: 'thin' },
            };
          });

        const empty = [''];
        const empty3Row = excelSheet.addRow(empty);

        const generated = ['Generated by', sessionStorage.getItem('name') , 'Date Generated:', this.maxDate, ''];
        const generatedRow = excelSheet.addRow(generated);
        const addedgRow = excelSheet.getRow(excelSheet.rowCount);
        addedgRow.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
          };
        });
        generatedRow.font = { size: 11, italic: true };

        spreadSheet.xlsx.writeBuffer().then(buffer => {
          const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Subsidiary Ledger.xlsx';
          link.click();
        });  
  }

  showLibJournalInfo(accID:any): void{
    this.accInfos = this.wahieService.getLibJournalInfo(accID).subscribe(accInfo=>{
      this.accInfos = accInfo;
    });
  }

  showMemberInfo(memID:any): void{
    this.memInfos = this.wahieService.getMemberInfo(memID).subscribe(memInfo=>{
      this.memInfos = memInfo;
    });
  }

  showSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.ledgers = this.wahieService.sLegder(mem, acc, sd, ed).subscribe(ledger=>{
      this.ledgers = ledger;
       console.log(this.ledgers); 

       this.calculateExample();
    });
  }

  sLegderBroken(mem:any, acc:any, sd:any, ed:any): void{
    this.brokenledgers = this.wahieService.sLegderBroken(mem, acc, sd, ed).subscribe(brokenledger=>{
      this.brokenledgers = brokenledger;
       console.log(this.brokenledgers); 

       this.calculateExampleBroken();
    });
  }

  showPastSLedger(mem:any, acc:any, sd:any, ed:any): void{
    this.pledgers = this.wahieService.pastLegder(mem, acc, sd, ed).subscribe(pledger=>{
      this.pledgers = pledger;
       
      this.calculateExample();
    });
  }

  showPastSLedgerBroken(mem:any, acc:any, sd:any, ed:any): void{
    this.brokenpledgers = this.wahieService.pastLegderBroken(mem, acc, sd, ed).subscribe(brokenpledger=>{
      this.brokenpledgers = brokenpledger;
      console.log(this.brokenpledgers); 
       
      this.calculateExampleBroken();
    });
  }

  calculateExample(): void {
    if (this.ledgers && this.pledgers) {
      for (let item of this.ledgers) {
        
        for (let items of this.pledgers) {
          if (item.result.journId === items.result.journId) {
            item.example = item.result.total_balance - items.result.total_balance;
            break;
          }
        }
      }
    }
  }

  calculateExampleBroken(): void {
    if (this.brokenledgers && this.brokenpledgers) {
      for (let itemb of this.brokenledgers) {
        
        for (let itemsb of this.brokenpledgers) {
          if (itemb.result.transactNumber === itemsb.result.transactNumber) {
            itemb.examplebroken = itemb.result.total_balance - itemsb.result.total_balance;
            break;
          }
        }
      }
    }
  }

  private formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-');
    return this.maxDate;
  }
  preLogo:any;
  id:any;
  getLogo(){
    this.id = localStorage.getItem('userData')
    this.http.get('http://127.0.0.1:8000/api/getLogo/' + this.id).subscribe((res: any) => {
      this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res
    });
  }
  
  chLogo(event:any){
    let fileType = event.target.files[0].type;
    let file =  event.target.files[0];
    if(fileType.match(/image\/*/)){
      let upload = new FileReader();
      upload.readAsDataURL(event.target.files[0]);
      upload.onload = (event:any)=>(
        this.preLogo = event.target.result

      );   
      var myFormData = new FormData();
      this.id = localStorage.getItem('userData')
      myFormData.append('image', file);

      this.http.post('http://127.0.0.1:8000/api/chLogo/'+ this.id,myFormData).subscribe((res: any) => {
        this.toast.success({detail:'Success',summary:'Logo changed',duration:2000, sticky:false,position:'tr'});
        this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res
      }); 
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }
  }
}
