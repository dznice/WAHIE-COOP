import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgToastService } from 'ng-angular-popup';
import * as ExcelJS from 'exceljs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { jsPDF } from "jspdf";
//import html2canvas from 'html2canvas';
//import jspdf from 'jspdf';
//import html2canvas from 'html2canvas';
//import autoTable from 'jspdf-autotable';
// import * as fs from 'fs';
// import fetch from 'node-fetch';
import * as html2pdf from 'html2pdf.js';

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

  note : any[];

  constructor(private http:HttpClient, 
    private toast:NgToastService, private sanitizer: DomSanitizer) {}
    
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

  // public convertToPDF(size:any) {
  //   // Get the HTML element to convert to PDF
  //   const element = document.getElementById('contentToConvert');
  // public convertToPDF(size:any) {
  //   // Get the HTML element to convert to PDF
  //   const element = document.getElementById('contentToConvert');
  
  //   if (element) {
  //     // Create a new jsPDF instance
  //     const doc = new jspdf('p', 'pt', size);
  //   if (element) {
  //     // Create a new jsPDF instance
  //     const doc = new jspdf('p', 'pt', size);
      
  //     // Set the scale for the html2canvas conversion
  //     const scale = 3; // Adjust the scale value as needed
  //     // Set the scale for the html2canvas conversion
  //     const scale = 3; // Adjust the scale value as needed

  //     //doc.addImage(imgLogo, 'PNG', 5, 5, 40, 40);
  //     //doc.addImage(imgLogo, 'PNG', 5, 5, 40, 40);
  
  //     // Convert the HTML element to an image using html2canvas with the specified scale
  //       html2canvas(element, { scale: scale }).then((canvas) => {
  //       // Get the image data URL
  //     // Convert the HTML element to an image using html2canvas with the specified scale
  //       html2canvas(element, { scale: scale }).then((canvas) => {
  //       // Get the image data URL
        
  //       const imgData = canvas.toDataURL('image/png');
  //       // Add the image to the PDF
  //       const imgData = canvas.toDataURL('image/png');
  //       // Add the image to the PDF
        
  //       doc.addImage(imgData, 'PNG', 10, 0, 610, 1000);
  //       doc.addImage(imgData, 'PNG', 10, 0, 610, 1000);

  //       // Save the PDF
  //       doc.save('sample.pdf');
  //       doc.text('My PDF Document', 10, 10);
  //     })
  //       // Save the PDF
  //       doc.save('sample.pdf');
  //       doc.text('My PDF Document', 10, 10);
  //     })
      
  //     ;
  //   }
  // }
  //     ;
  //   }
  // }

  delModal = -1;
  showDel(index: number) {
    this.delModal = index;
  }

  download(size:any){
    var element = document.getElementById('contentToConvert');
var opt = {
  margin:       0,
  filename:     'output.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 3 },
  jsPDF:        { unit: 'in', format: size, orientation: 'portrait' }
};
 
// New Promise-based usage:
html2pdf().from(element).set(opt).save();
  }

  // generatePDF() {
  //   // Create a new jsPDF instance
  //   const doc = new jspdf();
  
  //   // Set the font size and style
  //   doc.setFontSize(16);
  
  //   // Add a title to the first page
  //   doc.text('My PDF Document', 10, 10);
  
  //   // Set the font size and style for regular text
  //   doc.setFontSize(12);
  
  //   // Add paragraphs of text to the first page
  //   doc.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 10, 30);
  //   doc.text('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 10, 45);
    
  
  //   // Add an image to the second page
  //   //const imgData = 'path/to/image.png';
  //   doc.addPage();
  //   doc.text('Page 2', 10, 10);
  //   //doc.addImage(imgData, 'PNG', 10, 30, 100, 0);
  
  //   // Add a table to the third page
  //   doc.addPage();
  //   doc.text('Page 3', 10, 10);
  
  //   // const tableData = [
  //   //   ['Name', 'Age', 'Country'],
  //   //   ['John Doe', '30', 'USA'],
  //   //   ['Jane Smith', '25', 'Canada'],
  //   //   ['Robert Johnson', '35', 'UK']
  //   // ];
  
  //   // // doc.autoTable({
  //   // //   startY: 30,
  //   // //   head: [tableData[0]],
  //   // //   body: tableData.slice(1)
  //   // // });

  //   autoTable(doc, {
  //     head: [['Name', 'Email', 'Country']],
  //     body: [
  //       ['David', 'david@example.com', 'Sweden'],
  //       ['Castille', 'castille@example.com', 'Spain'],
  //       // ...
  //     ],
  //   })
  
  //   // Save the PDF
  //   doc.save('sample.pdf');
  // }

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
          const cetf  = ['','Coop. Education & Training Fund', this.pcetFund, this.cetFund];
          const cetfRow = excelSheet.addRow(cetf);
          const cdf  = ['','Community Development Fund', this.pcdFund, this.cdFund];
          const cdfRow = excelSheet.addRow(cdf);
          const of  = ['','Optional Fund', this.poptionalFund, this.optionalFund];
          const ofRow = excelSheet.addRow(of);
          const empty0 = [''];
          const emptyRow0 = excelSheet.addRow(empty0);

          const totalSF  = ['','Total Statutory Fund:', this.pstatutoryFund, this.statutoryFund];
          const totalSFRow = excelSheet.addRow(totalSF);
          const addedRow = excelSheet.getRow(excelSheet.rowCount);
            addedRow.eachCell((cell) => {
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
              };
            });
          totalSFRow.font = { bold: true, size: 12};

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
          link.download = 'FS Statement of Financial Condition.xlsx';
          link.click();
        });   
  }

  // exportAsPdf: ExportAsConfig = {
  //   type: 'pdf',
  //   elementIdOrContent: 'contentToConvert',
  //   options: {
  //     image: { type: 'jpeg', quality: 1 },
  //     html2canvas:  { scale: 1},
  //     margin:  [2, 2, 2, 2],
  //     fontSize: 1,
  //     pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  //     jsPDF: {
  //       orientation: 'portrait',
  //       format: 'letter',
  //       defaultFontSize: 1,
  //       precision: 16
  //     }
  //   }
  // }

  // exportPDF() {
  //   this.exportAsService.save(this.exportAsPdf, 'FS-Financial-Condition').subscribe(() => {
  //     // save started
  //   });
  // }

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
      console.log(this.preLogo)
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
        this.preLogo= 'http://127.0.0.1:8000/storage/image/'+ res

        
  
      
      }); 
    }else{
      this.toast.error({detail:'Error',summary:'Please upload correct image format',duration:2000, sticky:false,position:'tr'});
    }
  }

  

  jsonObject:any
  val:any;
  noteKey:any;
  CurrentAssetStore(i:any){
    this.jsonObject = JSON.stringify(this.note);
    this.val = (<HTMLInputElement>document.getElementById("curAsset"+(i))).value
    this.noteKey ='CurrentAsset' + i
   sessionStorage.setItem(this.noteKey, this.val)

  } 

CurrentAssetGet(index:any){
  return sessionStorage.getItem('CurrentAsset'+index)
}

otherAssetStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("OtherAsset"+(i))).value
  this.noteKey ='OtherAsset' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

otherAssetGet(index:any){
return sessionStorage.getItem('OtherAsset'+index)
}

nonAssetStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("nonAsset"+(i))).value
  this.noteKey ='nonAsset' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

nonAssetGet(index:any){
return sessionStorage.getItem('nonAsset'+index)
}

CurrentLiabStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("curLiab"+(i))).value
  this.noteKey ='curLiab' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

CurrentLiabGet(index:any){
return sessionStorage.getItem('curLiab'+index)
}

nonLiabStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("nonLiab"+(i))).value
  this.noteKey ='nonLiab' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

nonLiabGet(index:any){
return sessionStorage.getItem('nonLiab'+index)
}

equityStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("equity"+(i))).value
  this.noteKey ='equity' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

equityGet(index:any){
return sessionStorage.getItem('equity'+index)
}

ssccStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("sscc"+(i))).value
  this.noteKey ='sscc' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

ssccGet(index:any){
return sessionStorage.getItem('sscc'+index)
}

srcStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("src"+(i))).value
  this.noteKey ='src' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

srcGet(index:any){
return sessionStorage.getItem('src'+index)
}

srpStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("srp"+(i))).value
  this.noteKey ='srp' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

srpGet(index:any){
return sessionStorage.getItem('srp'+index)
}

pscpStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("pscp"+(i))).value
  this.noteKey ='pscp' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

pscpGet(index:any){
return sessionStorage.getItem('pscp'+index)
}

tscpStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("tscp"+(i))).value
  this.noteKey ='tscp' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

tscpGet(index:any){
return sessionStorage.getItem('tscp'+index)
}

dscpStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("dscp"+(i))).value
  this.noteKey ='dscp' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

dscpGet(index:any){
return sessionStorage.getItem('nonAsset'+index)
}

unsStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("uns"+(i))).value
  this.noteKey ='uns' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

unsGet(index:any){
return sessionStorage.getItem('uns'+index)
}

nlStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("nl"+(i))).value
  this.noteKey ='nl' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

nlGet(index:any){
return sessionStorage.getItem('nl'+index)
}

dgStore(i:any){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("dg"+(i))).value
  this.noteKey ='dg' + i
 sessionStorage.setItem(this.noteKey, this.val)

} 

dgGet(index:any){
return sessionStorage.getItem('nonAsset'+index)
}

reserveFundStore(){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("reserveFund")).value
  this.noteKey ='reserveFundFinCon'
 sessionStorage.setItem(this.noteKey, this.val)

} 

reserveFundGet(){
return sessionStorage.getItem('reserveFundFinCon')
}

coopEducStore(){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("coopEduc")).value
  this.noteKey ='coopEducFinCon'
 sessionStorage.setItem(this.noteKey, this.val)

} 

coopEducGet(){
return sessionStorage.getItem('coopEducFinCon')
}

cetfStore(){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("cetf")).value
  this.noteKey ='cetfFinCon'
 sessionStorage.setItem(this.noteKey, this.val)

} 

cetfGet(){
return sessionStorage.getItem('cetfFinCon')
}

cdfStore(){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("cdf")).value
  this.noteKey ='cdfFincon'
 sessionStorage.setItem(this.noteKey, this.val)

} 

cdfGet(){
return sessionStorage.getItem('cdfFincon')
}


opFundStore(){
  this.jsonObject = JSON.stringify(this.note);
  this.val = (<HTMLInputElement>document.getElementById("opFund")).value
  this.noteKey ='opFundFinCon'
 sessionStorage.setItem(this.noteKey, this.val)

} 

opFundGet(){
return sessionStorage.getItem('opFundFinCon')
}


}
