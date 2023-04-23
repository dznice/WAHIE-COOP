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

  constructor(private wahieService:WahieService){}

  // row:any = [
  //   {
  //     name: " ",
  //     birthdate: " ",
  //     relation:" "
  //   }
    row:any = [
      {

        benificiary_id: "1",
          benificiary_name: "",
          benificiary_birthdate: "",
          benificiary_relation:""
      }
    // ,
    // {
      
    //   benificiary_name: "",
    //   benificiary_birthdate: "",
    //   benificiary_relation:""
    // },
    // {
      
    //   benificiary_name: "",
    //   benificiary_birthdate: "",
    //   benificiary_relation:""
    // }


  ];

  addBeneficiary() {
    this.row.forEach((element:any) => {
      this.wahieService.addBeneficiary(element as any).subscribe(beneficiaries=>{
        this.row = beneficiaries;
      })
      console.log(this.beneficiaries);
    })
      
    }

  addTable() {
    const obj = {
      benificiary_name: "",
      benificiary_birthdate: "",
      benificiary_relation:""
    }
    this.row.push(obj)
  }

  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }
  }

  

  members: any ;
  beneficiaries: any;

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
    email:string,
    mobile_number:string,
    gender:string,
    birthdate:string,
    tin_number:string,
    civil_status:string,
    spouse:string,
    company_name:string,
    department:string,
    employment_status:string,
    occupation:string,
    company_address:string,
    street:string,
    barangay:string,
    city_town:string,
    state_province:string,
    postal_code:string){
    this.members = {
    'predef': predef,
		'account_id': account_id,
		'first_name': first_name,
		'middle_name': middle_name,
		'last_name': last_name,
		'suffix': suffix,
    'email': email,
		'mobile_number': mobile_number,
    'gender': gender,
		'birthdate': birthdate,
    'tin_number': tin_number,
    'civil_status': civil_status,
    'spouse': spouse,
    'company_name': company_name,
    'department': department,
    'employment_status': employment_status,
    'occupation': occupation,
    'company_address': company_address,
		'address': street + ' , ' + barangay + ' , ' + city_town +  ' , ' + state_province + ' , ' + postal_code,
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

