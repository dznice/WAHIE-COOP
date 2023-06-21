import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import * as ExcelJS from 'exceljs';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent implements OnInit {
  ledgers: any;
  pledgers: any;
  assets: any[];
  otherAssets: any[];
  nonAssets: any[];
  passets: any[];
  potherAssets: any[];
  pnonAssets: any[];
  pliabilities : any[];
  pnonLiabilities : any[];
  pequity : any[];
  item: any[];
  liabilities : any[];
  nonLiabilities : any[];
  equity : any[];
  revenue : any[];
  expenses : any[];
  maxDate: any;
  maxYear: any;
  oneYearAgo: any;
  lastYear: any;

  constructor(private http:HttpClient, private toast:NgToastService) {}
    
  ngOnInit(): void {
    this.formatDate();
    this.getLogo();
    this.formatDate();
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
    this.totalBalance = this.calculateTotalBalance();
    this.reserveFund = this.totalBalance * 0.1;
    this.cetFund = this.totalBalance * 0.05;
    this.cdFund = this.totalBalance * 0.03;
    this.optionalFund = this.totalBalance * 0.07;
  }

  delModal = -1;
  showDel(index: number) {
    this.delModal = index;
  }

  download(size:any){
    var element = document.getElementById('contentToConvert');
    var container = document.createElement('div');
    var opt = {
      margin:       0,
      filename:     'Trial Balance.pdf',
      image:        { type: 'jpeg', quality: 0.98},
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: size, orientation: 'portrait' }
    };
    
    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  generateExcel(): void{
    // Create a new spreadsheet:
      const spreadSheet = new ExcelJS.Workbook();
      spreadSheet.creator = 'WAH-COOP';
      spreadSheet.lastModifiedBy = 'Pogi';
      spreadSheet.created = new Date();
      spreadSheet.modified = new Date();

    // Add a sheet
    const excelSheet = spreadSheet.addWorksheet('Trial Balance');

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
          base64: this.logoApp,
          extension: 'png'
        });
        excelSheet.addImage(imageId, 'A1:A4');

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
        excelSheet.getCell('B3').value = 'Trial Balance';
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
        const reportHeaders = ['','Accounts', 'Debit' , 'Credit'];
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
          cell.alignment = { horizontal: 'center' };
        });

        this.assets.forEach(data =>{
          const list = ['', data.result.journal_name, data.result.total_balance , ''];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.otherAssets.forEach(data =>{
          const list = ['', data.result.journal_name, data.result.total_balance , ''];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.nonAssets.forEach(data =>{
          const list = ['', data.result.journal_name, data.result.total_balance , ''];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.liabilities.forEach(data =>{
          const list = ['', data.result.journal_name, '', data.result.total_balance];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.nonLiabilities.forEach(data =>{
          const list = ['', data.result.journal_name, '', data.result.total_balance];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.equity.forEach(data =>{
          const list = ['', data.result.journal_name, '', data.result.total_balance];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        const empty = [''];
        const emptyRow = excelSheet.addRow(empty);

        const rf  = ['','Reserve Fund', '', this.reserveFund];
        const rfRow = excelSheet.addRow(rf);
        const cetf  = ['','Coop. Education & Training Fund', '', this.cetFund];
        const cetfRow = excelSheet.addRow(cetf);
        const cdf  = ['','Community Development Fund', '', this.cdFund];
        const cdfRow = excelSheet.addRow(cdf);
        const of  = ['','Optional Fund', '', this.optionalFund];
        const ofRow = excelSheet.addRow(of);
        
        this.revenue.forEach(data =>{
          const list = ['', data.result.journal_name, data.result.total_balance, ''];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

        this.expenses.forEach(data =>{
          const list = ['', data.result.journal_name, '', data.result.total_balance];
          this.passets.forEach(data =>{
            list[2] = data.result.total_balance;
          });
          excelSheet.addRow(list);
        });

  
        const empty2Row = excelSheet.addRow(empty);

        const total = ['','Total' , this.calculateAssetandRevenueTotalBalance(), this.calculateLiabilityEquityandExpensesTotalBalance()];
        const totalRow = excelSheet.addRow(total);
        const addedTRow = excelSheet.getRow(excelSheet.rowCount);
            addedTRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
        totalRow.font = { bold: true, size: 12};

        const empty3Row = excelSheet.addRow(empty);

        const generated = ['Generated by', sessionStorage.getItem('name') , 'Date Generated:', this.maxDate ];
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
          link.download = 'Trial Balance.xlsx';
          link.click();
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
    this.assets = [];
    this.otherAssets = [];
    this.nonAssets = [];
    this.liabilities = [];
    this.nonLiabilities = [];
    this.equity = [];
    this.revenue = [];
    this.expenses = [];
  
    for (const item of this.ledgers) {
      const journalName = item.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.assets.push(item);
        }
      } else if (journalName === 'other current assets') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.otherAssets.push(item);
        }
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.nonAssets.push(item);
        }
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.liabilities.push(item);
        }
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.nonLiabilities.push(item);
        }
      } else if (journalName === 'equity') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.equity.push(item);
        }
      } else if (['revenue', 'cost of goods sold' , 'cost of services'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.revenue.push(item);
        }
      } else if (['expense', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.expenses.push(item);
        }
      } 
    }
  }

  
  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  statutoryFund : any;
  totalBalance : any;

  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
    let statutoryFund = 0;
  
    for (const item of this.revenue) {
      totalRevenue += item.result.total_balance;
    }
  
    for (const item of this.expenses) {
      totalExpenses += item.result.total_balance;
    }

    totalBalance = totalRevenue - totalExpenses;

    this.reserveFund = totalBalance * 0.1;
    this.cetFund = totalBalance * 0.05;
    this.cdFund = totalBalance * 0.03;
    this.optionalFund = totalBalance * 0.07;
  
    this.statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;
    totalBalance = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;

    return totalBalance;
  }
  
  
  showPastSLedger(): void {
    this.http.get('http://127.0.0.1:8000/api/totaljourlastyear').subscribe(
      (res: any) => {
        console.log(res);
        this.pledgers = res;
        this.pastProcessLedgerData();
        console.log(this.processLedgerData())
      }
    );
  }

  pastProcessLedgerData(): void {
    this.passets = [];
    this.potherAssets = [];
    this.pnonAssets = [];
    this.pliabilities = [];
    this.pnonLiabilities = [];
    this.pequity = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        this.passets.push(items);
      } else if (journalName === 'other current assets') {
        this.potherAssets.push(items);
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        this.pnonAssets.push(items);
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        this.pliabilities.push(items);
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        this.pnonLiabilities.push(items);
      } else if (journalName === 'equity') {
        this.pequity.push(items);
      } 
    }
    
  }
  
  calculateAssetandRevenueTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.assets) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.otherAssets) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonAssets) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.revenue) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLiabilityEquityandExpensesTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.liabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonLiabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.equity) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.expenses) {
      totalBalance += item.result.total_balance;
    }

    totalBalance = totalBalance + this.calculateTotalBalance();
  
    return totalBalance;
  }
  
  preLogo:any;
  generatedLogo:any;
  logoApp:any;
  id:any;
  getLogo(){
    this.id = localStorage.getItem('userData')
    this.http.get('http://127.0.0.1:8000/api/getLogo/' + this.id).subscribe((res: any) => {
      //this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res;
      this.generatedLogo = res;

      this.http.get('http://127.0.0.1:8000/api/images/'+res, { responseType: 'blob' })
      .subscribe((imageBlob: Blob) => {
        console.log(imageBlob);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoApp = reader.result as string;
          // Proceed with exporting to PDF, ensuring that the captured HTML includes the image using the data URL

        };
        reader.readAsDataURL(imageBlob);
      });
    });
  }
  
  chLogo(event:any){
    let fileType = event.target.files[0].type;
    let file =  event.target.files[0];
    let fileName = event.target.files[0].name;


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
        //this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res

        this.generatedLogo = res;

        this.http.get('http://127.0.0.1:8000/api/images/'+res, { responseType: 'blob' })
        .subscribe((imageBlob: Blob) => {
          console.log(imageBlob);
          const reader = new FileReader();
          reader.onloadend = () => {
            this.logoApp = reader.result as string;
            // Proceed with exporting to PDF, ensuring that the captured HTML includes the image using the data URL

          };
          reader.readAsDataURL(imageBlob);
        });
      }); 
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }

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

}
