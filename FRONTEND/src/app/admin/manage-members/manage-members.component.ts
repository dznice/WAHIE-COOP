import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent {
  /* Switch declaration */
  selected: boolean;
  libJournals: any;
  types: string[] = ["Admin", "Member"];
  type: string;

  userrole: number[] = [1,3];

  
}
