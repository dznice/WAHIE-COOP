import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgToastService } from 'ng-angular-popup';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-fs-fincon',
  templateUrl: './fs-fincon.component.html',
  styleUrls: ['./fs-fincon.component.scss']
})
export class FsFinconComponent implements OnInit {
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
  sscc : any[];
  src : any[];
  srp : any[];
  pscp : any[];
  tscp : any[];
  dscp : any[];
  uns : any[];
  nl : any[];
  dg : any[];
  maxDate: any;
  maxYear: any;
  lastYear: any;
  oneYearAgo: any;
  revenue: any[];
  expense: any[];
  prevenue: any[];
  pexpense: any[];
  psscc : any[];
  psrc : any[];
  psrp : any[];
  ppscp : any[];
  ptscp : any[];
  pdscp : any[];
  puns : any[];
  pnl : any[];
  pdg : any[];


  constructor(private http:HttpClient, 
    private exportAsService: ExportAsService, 
    private toast:NgToastService) {}
    
  ngOnInit(): void {
    this.getLogo();
    this.formatDate();
    this.oneYearAgo = new Date(this.maxDate);
    this.oneYearAgo.setFullYear(this.oneYearAgo.getFullYear() - 1);
    this.showSLedger();
    this.showPastSLedger();
    this.processLedgerData();
    console.log(this.maxDate)
  }

  generateExcel(): void{
    // Create a new spreadsheet:
      const spreadSheet = new ExcelJS.Workbook();
      spreadSheet.creator = 'WAH-COOP';
      spreadSheet.lastModifiedBy = 'Pogi';
      spreadSheet.created = new Date();
      spreadSheet.modified = new Date();

    // Add a sheet
    const excelSheet = spreadSheet.addWorksheet('Statement of Financial Condition');

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
        excelSheet.getCell('B3').value = 'Statement of Financial Condition';
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

        if(this.assets && this.assets.length > 0){
          const accounts = ['','Current Assets:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12 };

          this.assets.forEach(data =>{
            const list = ['', data.result.journal_name, '' , data.result.total_balance];
            this.passets.forEach(data =>{
              list[2] = data.result.total_balance;
            });
            excelSheet.addRow(list);
          });

          if(this.assets.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['', 'Total Current Assets:' ,
                                  this.passets.length > 0 ? this.passets[this.passets.length - 1].total_asset : '', 
                                  this.assets.length > 0 ? this.assets[this.assets.length - 1].total_asset : ''];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12 };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        if(this.otherAssets && this.otherAssets.length > 0){
          const accounts = ['','Other-Current Assets:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12 };

          this.otherAssets.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.potherAssets.forEach(data =>{
              res[2] = data.result.total_balance;
            });
            excelSheet.addRow(res);
          });
          
          if(this.otherAssets.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['','Total of Other Current Assets:',
                                  this.potherAssets.length > 0 ? this.potherAssets[this.potherAssets.length - 1].total_other_asset : '',
                                  this.otherAssets.length > 0 ? this.otherAssets[this.otherAssets.length - 1].total_other_asset : ''];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12 };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        if(this.nonAssets && this.nonAssets.length > 0){
          const accounts = ['','Non-Assets:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12 };

          this.nonAssets.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.pnonAssets.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.nonAssets.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['','Total of Non-Current Assets:',
                                  this.pnonAssets.length > 0 ? this.pnonAssets[this.pnonAssets.length - 1].total_non_asset : '',
                                  this.nonAssets.length > 0 ? this.nonAssets[this.nonAssets.length - 1].total_non_asset : ''];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12 };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        const totalAssets = ['','TOTAL ALL ASSETS:' ,this.calculateLastYearAssetTotalBalance(), this.calculateAssetTotalBalance()];
        const totalAssetsRow = excelSheet.addRow(totalAssets);
        const addedTRow = excelSheet.getRow(excelSheet.rowCount);
          addedTRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
        totalAssetsRow.font = { size: 12, bold: true };
        const empty0 = [''];
        const empty0Row = excelSheet.addRow(empty0);

        if(this.liabilities && this.liabilities.length > 0){
          const accounts = ['','Current Liabilities:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12 };

          this.liabilities.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.pliabilities.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.liabilities.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['','Total of Current Liabilities:',
                                  this.pliabilities.length > 0 ? this.pliabilities[this.pliabilities.length - 1].total_liability : '',
                                  this.liabilities.length > 0 ? (this.liabilities[this.liabilities.length - 1].total_liability) : '',];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12};
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        if(this.nonLiabilities && this.nonLiabilities.length > 0){
          const accounts = ['','Non-Current Liabilities:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12 };

          this.nonLiabilities.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.pnonLiabilities.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.nonLiabilities.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['','Total of Non-Current Liabilities:',
                                  this.pnonLiabilities.length > 0 ? this.pnonLiabilities[this.pnonLiabilities.length - 1].total_non_liability : '',
                                  this.nonLiabilities.length > 0 ? (this.nonLiabilities[this.nonLiabilities.length - 1].total_non_liability) : ''];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12 };
          }
          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        };

        if(this.equity && this.equity.length > 0){
          const accounts = ['','Equity:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true , size: 12};

          this.equity.forEach(data =>{
            const res = ['', data.result.journal_name, '' , data.result.total_balance];
            
            this.pequity.forEach(data =>{
              res[2] = data.result.total_balance;
              console.log(res[2]);
            });
            excelSheet.addRow(res);
          });

          if(this.equity.length > 0){
            const empty = [''];
            const emptyRow = excelSheet.addRow(empty);
            const accountsTotal = ['','Total of Equity:', '',
                                    this.equity.length > 0 ? (this.equity[this.equity.length - 1].total_equity) : ''];
            const accountsTotalRow = excelSheet.addRow(accountsTotal);
            const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
            accountsTotalRow.font = { bold: true, size: 12};
          }
          
        };  

        if(this.reserveFund !== 0 && this.cetFund !== 0 && this.cdFund !== 0 && this.optionalFund !== 0){
          const accounts = ['','Statutory Funds:'];
          const accountsRow = excelSheet.addRow(accounts);
          accountsRow.font = { bold: true, size: 12};

          const rf  = ['','Reserve Fund', this.preserveFund, this.reserveFund];
          const rfRow = excelSheet.addRow(rf);
          const cetf  = ['','Coop. Education & Training Fund', this.preserveFund, this.reserveFund];
          const cetfRow = excelSheet.addRow(cetf);
          const cdf  = ['','Community Development Fund', this.preserveFund, this.reserveFund];
          const cdfRow = excelSheet.addRow(cdf);
          const of  = ['','Optional Fund', this.preserveFund, this.reserveFund];
          const ofRow = excelSheet.addRow(of);

          const empty = [''];
          const emptyRow = excelSheet.addRow(empty);
        }

        const totalMEquity = ['','Total All Assets:' , this.calculateLastYearCombinedMemberEquity(), this.calculateCombinedMemberEquity()];
        const totalMEquityRow = excelSheet.addRow(totalMEquity);
        const addedMERow = excelSheet.getRow(excelSheet.rowCount);
            addedMERow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
        totalMEquityRow.font = { bold: true, size: 12};
        const empty1 = [''];
        const empty1Row = excelSheet.addRow(empty1);

        const totalLE = ['','TOTAL OF LIABILITY AND EQUITY:' , this.calculateLastYearCombinedTotalLiabilityandEquity(), this.calculateCombinedTotalLiabilityandEquity()];
        const totalLERow = excelSheet.addRow(totalLE);
        const addedLERow = excelSheet.getRow(excelSheet.rowCount);
            addedLERow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
        totalLERow.font = { bold: true, size: 12 };
        const empty2 = [''];
        const empty2Row = excelSheet.addRow(empty2);

        spreadSheet.xlsx.writeBuffer().then(buffer => {
          const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'FS Statement of Financial Condition.xlsx';
          link.click();
        });  
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'fsFincon',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 1},
      margin:  [2, 2, 2, 2],
      fontSize: 1,
      //pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'letter',
        defaultFontSize: 1,
        precision: 16
      }
    }
  }

  exportPDF() {
    this.exportAsService.save(this.exportAsPdf, 'FS-Financial-Condition').subscribe(() => {
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
    this.assets = [];
    this.otherAssets = [];
    this.nonAssets = [];
    this.liabilities = [];
    this.nonLiabilities = [];
    this.equity = [];
    this.revenue = [];
    this.expense = [];
    this.sscc = [];
    this.src = [];
    this.srp = [];
    this.pscp = [];
    this.tscp = [];
    this.dscp = [];
    this.uns = [];
    this.nl = [];
    this.dg = [];

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
      } else if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.revenue.push(item);
        }
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
        this.expense.push(item);
        }
      } else if (journalName === 'equity') {
        // this.equity.push(item);
        if (item.result.journal_name === 'Subscribed Share Capital - Common') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.sscc.push(item);
          }
        } else if (item.result.journal_name === 'Subscription Receivable - Common') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.src.push(item);
          }
        } else if (item.result.journal_name === 'Subscriptions Receivable Preferred') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.srp.push(item);
          }
        } else if (item.result.journal_name === 'Paid-up Share Capital-Preferred') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.pscp.push(item);
          }
        } else if (item.result.journal_name === 'Treasury Shares Capital -Preferred') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.tscp.push(item);
          }
        } else if (item.result.journal_name === 'Deposit for Share Capital Subscription') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.dscp.push(item);
          }
        } else if (item.result.journal_name === 'Undivided Net Surplus') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.uns.push(item);
          }
        } else if (item.result.journal_name === 'Net Loss') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.nl.push(item);
          }
        } else if (item.result.journal_name === 'Donations/Grants') {
        if (item.result.total_balance !== null && item.result.total_balance !== 0) {
          this.dg.push(item);
          }
      } 
    
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
    this.passets = [];
    this.potherAssets = [];
    this.pnonAssets = [];
    this.pliabilities = [];
    this.pnonLiabilities = [];
    this.pequity = [];
    this.prevenue = [];
    this.pexpense = [];
    this.psscc = [];
    this.psrc = [];
    this.psrp = [];
    this.ppscp = [];
    this.ptscp = [];
    this.pdscp = [];
    this.puns = [];
    this.pnl = [];
    this.pdg = [];
  
    for (const items of this.pledgers) {
      const journalName = items.result.journType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      console.log('Journal Name:', journalName);

      if (['cash and cash equivalents', 'loans and receivables', 'financial assets', 'biologicals assets'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.passets.push(items);
        }
      } else if (journalName === 'other current assets') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.potherAssets.push(items);
        }
      } else if (['non current assets', 'biological assets', 'intangible assets'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pnonAssets.push(items);
        }
      } else if (['liabilities', 'other current liabilities'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pliabilities.push(items);
        }
      } else if (['current liabilities', 'other non-current liabilities'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pnonLiabilities.push(items);
        }
      } else if (['revenue', 'cost of goods sold', 'cost of services'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.prevenue.push(items);
        }
      } else if (['expenses', 'other items – subsidy/ gain (losses)'].includes(journalName)) {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
        this.pexpense.push(items);
        }
      } else if (journalName === 'equity') {
        // this.pequity.push(items);
        if (items.result.journal_name === 'Subscribed Share Capital - Common') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.psscc.push(items);
          }
        } else if (items.result.journal_name === 'Subscription Receivable - Common') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.psrc.push(items);
          }
        } else if (items.result.journal_name === 'Subscriptions Receivable Preferred') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.psrp.push(items);
          }
        } else if (items.result.journal_name === 'Paid-up Share Capital-Preferred') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.ppscp.push(items);
          }
        } else if (items.result.journal_name === 'Treasury Shares Capital -Preferred') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.ptscp.push(items);
          }
        } else if (items.result.journal_name === 'Deposit for Share Capital Subscription') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.pdscp.push(items);
          }
        } else if (items.result.journal_name === 'Undivided Net Surplus') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.puns.push(items);
          }
        } else if (items.result.journal_name === 'Net Loss') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.pnl.push(items);
          }
        } else if (items.result.journal_name === 'Donations/Grants') {
        if (items.result.total_balance !== null && items.result.total_balance !== 0) {
          this.pdg.push(items);
          }
      } 
      } 
    }
    
  }

  calculateMemberEquity(): number {
    let totalBalance = 0;
  
    for (const item of this.sscc) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.src) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.srp) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.pscp) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.tscp) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.dscp) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.uns) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nl) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.dg) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLastYearMemberEquity(): number {
    let totalBalance = 0;
  
    for (const item of this.psscc) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.psrc) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.psrp) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.ppscp) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.ptscp) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.pdscp) {
      totalBalance += item.result.total_balance;
    }
    for (const item of this.puns) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.pnl) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.pdg) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateAssetTotalBalance(): number {
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
  
    return totalBalance;
  }

  calculateLiabilityTotalBalance(): number {
    let totalBalance = 0;
  
    for (const item of this.liabilities) {
      totalBalance += item.result.total_balance;
    }
  
    for (const item of this.nonLiabilities) {
      totalBalance += item.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLastYearAssetTotalBalance(): number {
    let totalBalance = 0;
  
    for (const items of this.passets) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.potherAssets) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pnonAssets) {
      totalBalance += items.result.total_balance;
    }
  
    return totalBalance;
  }

  calculateLastYearLiabilityandEquityTotalBalance(): number {
    let totalBalance = 0;
  
    for (const items of this.pliabilities) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pnonLiabilities) {
      totalBalance += items.result.total_balance;
    }
  
    for (const items of this.pequity) {
      totalBalance += items.result.total_balance;
    }
  
    return totalBalance;
  }

  reserveFund : any;
  cetFund : any;
  cdFund : any;
  optionalFund : any;
  statutoryFund : any;
  
  calculateTotalBalance(): number {
    let totalBalance = 0;
    let totalExpenses = 0;
    let totalRevenue = 0;
    let statutoryFund = 0;
  
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
  
    this.statutoryFund = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;
    totalBalance = this.reserveFund+this.cetFund+this.cdFund+this.optionalFund;

    return totalBalance;
  }

  calculateCombinedMemberEquity(): number {
    const statutoryFund = this.calculateTotalBalance();
    const memberEquity = this.calculateMemberEquity();
    const combinedTotalBalance = statutoryFund + memberEquity;
    return combinedTotalBalance;
  }

  calculateCombinedTotalLiabilityandEquity(): number {
    const liabiltyBalance = this.calculateLiabilityTotalBalance();
    const membersEquity = this.calculateCombinedMemberEquity();
    const combinedTotalBalance = liabiltyBalance + membersEquity;
    return combinedTotalBalance;
  }

  preserveFund : any;
  pcetFund : any;
  pcdFund : any;
  poptionalFund : any;
  pstatutoryFund : any;
  
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
  
    this.pstatutoryFund = this.preserveFund+this.pcetFund+this.pcdFund+this.poptionalFund;
    totalBalance = this.preserveFund+this.pcetFund+this.pcdFund+this.poptionalFund;

    return totalBalance;
  }

  calculateLastYearCombinedMemberEquity(): number {
    const statutoryFund = this.calculateLastYearTotalBalance();
    const memberEquity = this.calculateLastYearMemberEquity();
    const combinedTotalBalance = statutoryFund + memberEquity;
    return combinedTotalBalance;
  }

  calculateLastYearCombinedTotalLiabilityandEquity(): number {
    const liabiltyBalance = this.calculateLiabilityTotalBalance();
    const membersEquity = this.calculateLastYearCombinedMemberEquity();
    const combinedTotalBalance = liabiltyBalance + membersEquity;
    return combinedTotalBalance;
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
