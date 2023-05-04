import { Component, Inject} from '@angular/core';
import { NgToastService } from'ng-angular-popup';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent {

  constructor(@Inject(DOCUMENT) private _document: any, private toast: NgToastService){}
  row = [
    {
      id : '',
      account: '',
      description: '',
      quantity: '',
      rate: '',
      amount: ''
    },
    {
      id : '',
      account: '',
      description: '',
      quantity: '',
      rate: '',
      amount: ''
    },

  ];

  addTable() {

    const obj = {
      id : '',
      account: '',
      description: '',
      quantity: '',
      rate: '',
      amount: ''
    }
    const obj2 = {
      id : '',
      account: '',
      description: '',
      quantity: '',
      rate: '',
      amount: ''

    }
    this.row.push(obj)
    this.row.push(obj2)


  }

  deleteRow(x: number){

    var delBtn = confirm(" Do you want to delete ?");

    if ( delBtn == true ) {
      this.row.splice(x, 1 );
      this.toast.success({detail:'Removed',summary:'Successfuly removed', sticky:false,position:'false'});
    }
  }

  deleteRowAll(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1000 );

    }
  }

  close(event:MouseEvent){
    event.preventDefault();
    this.toast.warning({detail:'Closed ',summary:'Invoice closed', sticky:false,position:'tr', duration:1500});
   }

  ngOnInit() {
    this._document.body.classList.add('body');

  }

}
