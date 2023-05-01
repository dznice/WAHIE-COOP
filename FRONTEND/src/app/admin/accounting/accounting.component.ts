import { Component, OnInit } from '@angular/core';
import { WahieService } from '../../services/wahie.service';
import { Item } from './item';
import { itemService } from './item.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [itemService],
})
export class AccountingComponent implements OnInit {

  item: Item[] = [];
  term: string = '';
  p: number = 1;
  type: string;
  stat: string;



  types: string[]= ["Journal Entry", "Invoice", "Payment" ];
  stats: string[]= ["Overdue", "Pending", "Closed" ];

  startDate: string = '';
  endDate : string = '';

  constructor(private ItemService: itemService, private wahieService:WahieService) {}

  ngOnInit(): void {
    this.item = this.ItemService.item;
    this.showDebits()
    this.showCredits()
    this.showPayables()
    this.showTransactions()
    this.showEntries()
  }
// Try to Import in one TS in Accounting
  public debits:any;
  public credits:any;
  public payables:any;
  public transactions:any;
  public entries:any;

  showDebits(): void{
    this.debits = this.wahieService.debits().subscribe(debit=>{
      this.debits = debit;
      console.log(this.debits);
    });
  }

  showCredits(): void{
    this.credits = this.wahieService.credits().subscribe(credit=>{
      this.credits = credit;
      console.log(this.credits);
    });
  }

  showPayables(): void{
    this.payables = this.wahieService.payables().subscribe(payable=>{
      this.payables = payable;
      console.log(this.payables);
    });
  }

  showTransactions(): void{
    this.transactions = this.wahieService.transactions().subscribe(transaction=>{
      this.transactions = transaction;
      console.log(this.transactions);
    });
  }

  showEntries(): void{
    this.entries = this.wahieService.listEntries().subscribe(entry=>{
      this.entries = entry;
      console.log(this.entries);
    });
  }

  // Try to Import in one TS in Accounting


}

