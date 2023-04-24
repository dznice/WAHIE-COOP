import { Component } from '@angular/core';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent {
  row = [
    {
      id: '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: '',
    },
    {
      id: '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: '',
    },
    {
      id: '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: '',
    },
  ];

  addTable() {
    const obj = {
      id: '',
      account: '',
      debits: '',
      credits: '',
      description: '',
      name: '',
    };
    this.row.push(obj);
  }

  deleteRow(x: number) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.row.splice(x, 1);
    }
  }
  backMethod() {
    if (confirm('Are you sure to back? ')) {
      console.log('Function');
    }
  }

  saveMethod() {
    if (confirm('Save Journal Entry? ')) {
      console.log('Function');
    }
  }
}
