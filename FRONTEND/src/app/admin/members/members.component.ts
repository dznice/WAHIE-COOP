import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [WahieService]
})
export class MembersComponent implements OnInit {

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

}
