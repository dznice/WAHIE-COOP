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

    });
  }

  add(predef:string,
      account_id:string,
      first_name:string,
      middle_name:string,
      last_name:string,
      suffix:string,
      birthdate:string,
      street:string,
      barangay:string,
      city_town:string,
      state_province:string,
      postal_code:string,
      spouse:string,
      civil_status:string,
      tin_number:string,
      occupation:string,
      gender:string,
      department:string,
      employment_status:string,
      company_name:string,
      company_address:string,
      email:string,
      mobile_number:string){
    this.members = {
      'predef': predef,
		'account_id': account_id,
		'first_name': first_name,
		'middle_name': middle_name,
		'last_name': last_name,
		'suffix': suffix,
		'birthdate': birthdate,
		'address': street + ' , ' + barangay + ' , ' + city_town +  ' , ' + state_province + ' , ' + postal_code,
		'spouse': spouse,
		'civil_status': civil_status,
		'tin_number': tin_number,
		'occupation': occupation,
		'gender': gender,
		'department': department,
		'employment_status': employment_status,
		'company_name': company_name,
		'company_address': company_address,
		'email': email,
		'mobile_number': mobile_number
    };
    this.wahieService.addMember(this.members as any).subscribe(member=>{
      this.members = member;
    });
    console.log(this.members);
  }

//   idMembers(): void{

//     var count = 1;
//     var membeer = 1;
//     var loop = true;
//     var max = this.members;

//     while(loop == true){
//       var id = 1;
//       while( count <= max){
//         angular.forEach(){
//        if(membeer==id){
//         id++;
//        }

//         count++;
//       }
//       membeer = id;
//       loop = false;
//     }
//   }
// row[1,2,3]
// row[1]

}

