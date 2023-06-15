import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgToastService } from 'ng-angular-popup';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-fs-op',
  templateUrl: './fs-op.component.html',
  styleUrls: ['./fs-op.component.scss']
})
export class FsOpComponent implements OnInit {
  ledgers: any;
  pledgers: any;
  revenue: any[];
  expense: any[];
  prevenue: any[];
  pexpense: any[];
  item: any[];
  maxDate: any;
  maxYear: any;
  lastYear: any;
  oneYearAgo: any;

  constructor(private http:HttpClient, private exportAsService: ExportAsService, private toast:NgToastService) {}
    

  
  ngOnInit(): void {

    this.getLogo();
    this.formatDate();
    this.oneYearAgo = new Date(this.maxDate);
    this.oneYearAgo.setFullYear(this.oneYearAgo.getFullYear() - 1);
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
  }

  generateExcel(): void{
    // Create a new spreadsheet:
      const spreadSheet = new ExcelJS.Workbook();
      spreadSheet.creator = 'WAH-COOP';
      spreadSheet.lastModifiedBy = 'Pogi';
      spreadSheet.created = new Date();
      spreadSheet.modified = new Date();

    // Add a sheet
    const excelSheet = spreadSheet.addWorksheet('Statement of Operations');

        excelSheet.mergeCells(`A1:A4`);
        excelSheet.getCell('A1').value = 'Logo Here'
        excelSheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle'};
        excelSheet.getCell('A1').font = { size: 15, bold: true };
        excelSheet.getCell('A1').border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' }
        };

        excelSheet.getColumn('A').width = 15;
        excelSheet.getColumn('B').width = 35;
        excelSheet.getColumn('C').width = 20;
        excelSheet.getColumn('D').width = 20;

        excelSheet.mergeCells(`B1:D1`);
        excelSheet.getCell('B1').value = 'Provincial Employees Credit Cooperative';
        excelSheet.getCell('B1').alignment = { horizontal: 'center'};
        excelSheet.getCell('B1').font = { size: 12 };
        excelSheet.getCell('B1').border = {
          top: { style: 'thin' },
          right: { style: 'thin' }
        };

        excelSheet.mergeCells(`B2:D2`);
        excelSheet.getCell('B2').value = 'PCEDO Office, Old IBP Bldg., Rotary Lane, San Vicente, Tarlac City';
        excelSheet.getCell('B2').alignment = { horizontal: 'center'};
        excelSheet.getCell('B2').font = { size: 12 };
        excelSheet.getCell('B2').border = {
          right: { style: 'thin' }
        };

        excelSheet.mergeCells(`B3:D3`);
        excelSheet.getCell('B3').value = 'Statement of Operations';
        excelSheet.getCell('B3').alignment = { horizontal: 'center'};
        excelSheet.getCell('B3').font = { size: 12, bold: true};
        excelSheet.getCell('B3').border = {
          right: { style: 'thin' }
        };
        
        excelSheet.mergeCells(`B4:D4`);
        excelSheet.getCell('B4').value = 'As of ' + this.maxDate;
        excelSheet.getCell('B4').alignment = { horizontal: 'center'};
        excelSheet.getCell('B4').font = { size: 12 };
        excelSheet.getCell('B4').border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        };

        excelSheet.mergeCells(`B5:D5`);
        excelSheet.getCell('B5').value = '';
      
        // Create the headers
        const reportHeaders = ['','Accounts', 'Balance last ' + this.lastYear , 'Balance this ' + this.maxYear];
        
        // Add headers for employees with styling
        const reportHeaderRow = excelSheet.addRow(reportHeaders);
        reportHeaderRow.font = { bold: true };
        reportHeaderRow.eachCell((cell) => {
          cell.alignment = { horizontal: 'center' };
        });

        if(this.revenue && this.revenue.length > 0){
          const cAssets = ['','Current Revenue:'];
          const cAssetsRow = excelSheet.addRow(cAssets);
          cAssetsRow.font = { bold: true };

          this.revenue.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.prevenue.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.revenue.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const cAssetsTotal = ['','Total revenue:'];
            if(this.revenue.length > 0 ? this.revenue[this.revenue.length - 1].total_revenue : ''){
              cAssetsTotal[3] = this.revenue[this.revenue.length - 1].total_revenue;
              
            }
            if(this.prevenue.length > 0 ? this.prevenue[this.prevenue.length - 1].total_revenue : ''){
              cAssetsTotal[2] = this.prevenue[this.prevenue.length - 1].total_revenue;
            
            }
            const cAssetsTotalRow = excelSheet.addRow(cAssetsTotal);
            cAssetsTotalRow.font = { bold: true };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        if(this.expense && this.expense.length > 0){
          const cAssets = ['','Current Expense:'];
          const cAssetsRow = excelSheet.addRow(cAssets);
          cAssetsRow.font = { bold: true };

          this.expense.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.pexpense.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.expense.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const cAssetsTotal = ['','Total Expenses:'];
            if(this.expense.length > 0 ? this.expense[this.expense.length - 1].total_expenses : ''){
              cAssetsTotal[3] = this.expense[this.expense.length - 1].total_expenses;
              
            }
            if(this.pexpense.length > 0 ? this.pexpense[this.pexpense.length - 1].total_expenses : ''){
              cAssetsTotal[2] = this.pexpense[this.pexpense.length - 1].total_expenses;
            
            }
            const cAssetsTotalRow = excelSheet.addRow(cAssetsTotal);
            cAssetsTotalRow.font = { bold: true };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        
        spreadSheet.xlsx.writeBuffer().then(buffer => {
          const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'FS Statement of Operations.xlsx';
          link.click();
        });  
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'fsOp',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [5, 2, 5, 2],
      fontSize: 12,
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'letter',
        defaultFontSize: 12,
        //precision: 16
      }
    }
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'FS-Operations').subscribe(() => {
      // save started
    });
  }


  showSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljour').subscribe(
      (res: any) => {
        console.log(res);
        this.ledgers = res;
        this.processLedgerData();
        console.log(this.processLedgerData())
      }
    );
  }
  
  processLedgerData(): void {
    this.revenue = [];
    this.expense = [];
  
    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.revenue.push(item);
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.expense.push(item);
      } 
    }
    
  }
  
  
  showPastSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljourlastyear').subscribe(
      (res: any) => {
        console.log(res);
        this.pledgers = res;
        this.pastProcessLedgerData();
        console.log(this.pastProcessLedgerData())
      }
    );
  }

  pastProcessLedgerData(): void {
    this.prevenue = [];
    this.pexpense = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        this.prevenue.push(items);
      }  else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        this.pexpense.push(items);
      } 
    }
    
  }


  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  dueToUnion : any;
  statutoryFund : any;
  netFundAfterSF : any;
  ioc : any;
  patRef : any;
  
  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
  
    for (const item of this.revenue) {
      totalRevenue += item.result.total_balance;
    }
  
    for (const item of this.expense) {
      totalExpenses += item.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.reserveFund = totalBalance * 0.1;
    this.cetFund = totalBalance * 0.05;
    this.cdFund = totalBalance * 0.03;
    this.optionalFund = totalBalance * 0.07;
    this.dueToUnion = totalBalance * 0.05
  
    this.statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund+this.dueToUnion;

    this.netFundAfterSF = totalBalance - this.statutoryFund;

    this.ioc = this.netFundAfterSF * 0.7;
    this.patRef = this.netFundAfterSF *0.3;

    return totalBalance;
  }

  preserveFund : any;
  pcetFund : any;
  pcdFund : any;
  poptionalFund : any;
  pdueToUnion : any;
  pstatutoryFund : any;
  pnetFundAfterSF : any;
  pioc : any;
  ppatRef : any;
  
  calculateLastYearTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
  
    for (const item of this.prevenue) {
      totalRevenue += item.result.total_balance;
    }
  
    for (const item of this.pexpense) {
      totalExpenses += item.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.preserveFund = totalBalance * 0.1;
    this.pcetFund = totalBalance * 0.05;
    this.pcdFund = totalBalance * 0.03;
    this.poptionalFund = totalBalance * 0.07;
    this.pdueToUnion = totalBalance * 0.05
  
    this.pstatutoryFund = this.preserveFund+this.pcetFund+this.pcdFund+this.poptionalFund+this.pdueToUnion;

    this.pnetFundAfterSF = totalBalance - this.pstatutoryFund;

    this.pioc = this.pnetFundAfterSF * 0.7;
    this.ppatRef = this.pnetFundAfterSF *0.3;

    return totalBalance;
  }



  formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-');
    this.maxYear = year;
    this.lastYear = year - 1;
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
