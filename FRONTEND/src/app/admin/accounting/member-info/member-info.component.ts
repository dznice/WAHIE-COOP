import { Component, OnInit } from '@angular/core';
import { itemService } from './item.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
  providers: [itemService],
})
export class MemberInfoComponent implements OnInit {
  membalance: any;
  constructor(
    private ItemService: itemService,
    private http: HttpClient,
    private aRouter: ActivatedRoute,
    private route: Router
  ) {
    this.personalInfo();
    this.benInfo();
    this.showAccounting();
    this.memberBalance();
  }
  item: any[] = [];
  ben: any[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  startDate: string = '';
  endDate: string = '';
  stat: string;

  stats: string[] = ['Overdue', 'Pending', 'Closed', 'Paid'];

  types: string[] = ['Journal Entry', 'Invoice', 'Payment'];
  private urlId: Subscription;
  public account: any;

  id: string = '';

  ngOnInit(): void {
    this.item = this.ItemService.item;
    this.urlId = this.aRouter.params.subscribe((params) => {
      console.log(params);
      console.log(params['memberId']);
      this.id = params['memberId'];
    });
  }

  personalInfo() {
    this.http.get('http://127.0.0.1:8000/api/memberList').subscribe((res: any) => {
      console.log(res);
      this.item = res;
    });
  }

  benInfo() {
    this.http.get('http://127.0.0.1:8000/api/beneficiaries').subscribe((res: any) => {
      console.log(res);
      this.ben = res;
    });
  }
  memId: string = '';
  myProfile() {
    this.http.get('http://127.0.0.1:8000/api/users/myProfile/' + this.id).subscribe((res: any) => {
      console.log('myprof' + res);
      this.memId = res.id;
      console.log(this.memId);
    });
  }

  showAccounting(): void {
    this.http.get('http://127.0.0.1:8000/api/account').subscribe((res: any) => {
      console.log(this.id);
      this.account = res.filter(
        (account: { debit: { cred: { transac: { member: { id: any } } } } }) =>
          account.debit.cred.transac.member.id == this.id
      );
      console.log(this.account);
    });
  }

  memberBalance(): void {
    this.http.get('http://127.0.0.1:8000/api/totalMemBalance').subscribe((res: any) => {
      console.log(res);
      this.membalance = res;
    });
  }
  memberJournal(data: any) {
    this.http
      .get('http://127.0.0.1:8000/api/transacList/' + data)
      .subscribe((res: any) => {
        if (data != null) {
          console.log(data);
          this.route.navigateByUrl('admin/accounting/journal-transac/' + data);
        }
      });
  }
}
