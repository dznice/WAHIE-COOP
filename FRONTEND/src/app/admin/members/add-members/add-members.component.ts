import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { MaxLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
  providers: [WahieService]
})
export class AddMembersComponent implements OnInit  {
  row = [
    {
      id : '',
      name: '',
      dateofbirth: '',
      relationship:''
    },
    {
      id : '',
      name: '',
      dateofbirth: '',
      relationship:''
    },
    {
      id : '',
      name: '',
      dateofbirth: '',
      relationship:''
    }

  ];

  addTable() {
    const obj = {
      id : '',
      name: '',
      dateofbirth: '',
      relationship:''
    }
    this.row.push(obj)
  }

  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }
  }

  constructor(private wahieService:WahieService){}

  members: any ;

  ngOnInit(): void {
    this.showMembers()
  }

  showMembers(): void{
    this.members = this.wahieService.listMembers().subscribe(member=>{
      this.members = member;
      console.log(this.members);

      let count: number = 1;
    let membeer: number = 1;
    let loop: boolean = true;
    let max = this.members;

    while(loop == true){
      let id: number = 1;
      while(count<=max){
        for (this.members of member){
          if(membeer==id){
            id++;
          }
        }
        count++;
      }
      membeer = id;
      loop = false;
    }
    });
  }


}

