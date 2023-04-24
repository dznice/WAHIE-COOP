import { Component } from '@angular/core';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
})
export class AddMembersComponent {
  row = [
    {
      id: '',
      name: '',
      dateofbirth: '',
      relationship: '',
    },
    {
      id: '',
      name: '',
      dateofbirth: '',
      relationship: '',
    },
    {
      id: '',
      name: '',
      dateofbirth: '',
      relationship: '',
    },
  ];

  addTable() {
    const obj = {
      id: '',
      name: '',
      dateofbirth: '',
      relationship: '',
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
    if (confirm('Confirm ')) {
      console.log('Function');
    }
  }

  saveMethod() {
    if (confirm('Save Member? ')) {
      console.log('Function');
    }
  }
}
