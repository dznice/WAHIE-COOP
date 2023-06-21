import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { WahieService } from '../../../services/wahie.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent implements OnInit {
  useid = localStorage.getItem('userData');
  journ: any;

  constructor(private builder: FormBuilder, private wahieService: WahieService, private http: HttpClient, private route: Router, private toast: NgToastService, private router: ActivatedRoute) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  journalEntryRow!: FormArray<any>;
  amount!: FormGroup<any>;
  public libJournals: any;
  public journalEntries: any;
  public journId: any;
  public member: any;
  total_debit: any;
  total_credit: any;
  maxDate: any;
  formattedDebit: string = '';

  ngOnInit(): void {
    this.showLibJournal();
    this.showMembers();
    this.showJournalEntry();
    this.getJournalNo();
    this.getJournalNot();
    this.showJourn();
    const currentJournalNo = this.journalEntryForm.controls.journal_no.value;
    const newJournalNo = this.journId;

    if (newJournalNo !== currentJournalNo) {
      this.journalEntryForm.patchValue({ journal_no: newJournalNo });
    }
  }

  // setTwoNumberDecimal($event) {
  //   $event.target.value = parseFloat($event.target.value).toFixed(2);
  // }

  close(event: MouseEvent) {
    event.preventDefault();
    this.toast.warning({
      detail: 'Incomplete ',
      summary: ' Fill all input or need balance the amount to submit ',
      sticky: false,
      position: 'tr',
      duration: 1500,
    });
  }

  getJournalNo() {
    console.log(this.useid);
  }

  showJourn() {
    this.http.get('http://127.0.0.1:8000/api/journ').subscribe((res: any) => {
      this.journId = res;
      console.log(this.journId);
    });
  }

  getJournalNot() {
    console.log(this.journId);
  }

  showLibJournal(): void {
    this.libJournals = this.wahieService.listLibJournals().subscribe((libjournal) => {
      this.libJournals = libjournal;
      console.log(this.libJournals);
    });
  }

  showJournalEntry(): void {
    this.journalEntries = this.wahieService.listJournalEntry().subscribe((journalEntry) => {
      this.journalEntries = journalEntry;
      console.log(this.journalEntries);
    });
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    console.log(event);
    this.show(2);
    this.showDel(2);
  }

  showModal = -1;
  show(index: number) {
    this.showModal = index;
  }

  delModal = -1;
  showDel(index: number) {
    this.delModal = index;
  }

  closeSelect(select: NgSelectComponent) {
    select.close();
  }

  public members: any;
  public mobile: any;
  showMembers(): void {
    this.members = this.wahieService.listMembers().subscribe((member) => {
      this.members = member;

      console.log(this.members);
    });
  }

  journalEntryForm = this.builder.group({
    journal_date: this.builder.control(this.formatDate()),
    journal_no: this.builder.control('', Validators.required),
    due_date: this.builder.control(''),
    interest: this.builder.control(''),
    entries: this.builder.array([this.Generaterow(), this.Generaterow()]),
    userId: this.builder.control(this.useid),
    memberNo: this.builder.control(null),
    totaldebit: this.builder.control('', Validators.required),
    totalcredit: this.builder.control('', Validators.required),
  });

  due = new Date();

  saveEntry() {
    this.journalEntryForm.get('journal_no')?.setValue((<HTMLInputElement>document.getElementById('journnumber')).value);

    let total_debit = this.journalEntryForm.get('totaldebit')?.value;
    let total_credit = this.journalEntryForm.get('totalcredit')?.value;
    let journaldate = this.journalEntryForm.get('journal_date')?.value;

    console.log(journaldate > this.maxDate);
    if (this.journalEntryForm.valid && total_debit == total_credit && journaldate <= this.maxDate) {
      this.wahieService.saveJournalEntry(this.journalEntryForm.getRawValue()).subscribe(
        (res) => {
          let result: any;
          result = res;
          console.log('Saved' + this.journId);
          console.log(result);
          this.log.activity = 'Added Journal Entry No.' + this.journId;
          this.activityLog();
          if (this.journalEntryForm.getRawValue().due_date != '') {
            this.sms.sendDate = this.journalEntryForm.getRawValue().due_date;
            this.sms.journal_id = this.journId;
            console.log(this.journId);
            this.smsDue();
          }
          this.toast.success({
            detail: 'Success',
            summary: 'Information saved',
            duration: 2000,
            sticky: false,
            position: 'tr',
          });
          this.route.navigateByUrl('admin/accounting');
        },
        (error) => {
          if (error.status === 422) {
            // Validation failed, retrieve the error messages
            const errors = error.error.errors;

            // Loop through the error messages and display them or handle them as needed
            Object.keys(errors).forEach((field) => {
              const fieldErrors = errors[field];
              fieldErrors.forEach((errorMessage: any) => {
                this.displayToast(errorMessage, 'Validation Error');
                console.log(`${field}: ${errorMessage}`);
              });
            });
          }
        }
      );
    } else {
      this.toast.error({
        detail: 'Failed',
        summary: 'Fill all inputs or balance the amount',
        duration: 2000,
        sticky: false,
        position: 'tr',
      });
      console.log('Error: Fill all input or need balance the amount to submit');
    }
    console.log(this.journalEntryForm.value);
  }

  displayToast(message: string, title: string) {
    this.toast.error({
      detail: 'Failed',
      summary: 'This journal number is taken',
      duration: 2000,
      sticky: false,
      position: 'tr',
    });
    console.log(`Toast - Title: ${title}, Message: ${message}`);
  }

  addRow() {
    this.journalEntryRow = this.journalEntryForm.get('entries') as FormArray;
    this.journalEntryRow.push(this.Generaterow());
  }

  removeRow(index: any) {
    this.journalEntryRow = this.journalEntryForm.get('entries') as FormArray;
    this.journalEntryRow.removeAt(index);
    this.showDel(2);
    this.balance_summary();
  }

  get entryRow() {
    return this.journalEntryForm.get('entries') as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      account: this.builder.control('', Validators.required),
      debit: this.builder.control(''),
      credit: this.builder.control(''),
      description: this.builder.control(''),
      name: this.builder.control('', Validators.required),
    });
  }

  autoZero(index: any) {
    this.journalEntryRow = this.journalEntryForm.get('entries') as FormArray;
    this.amount = this.journalEntryRow.at(index) as FormGroup;
    let debit = this.amount.get('debit')?.value;
    let credit = this.amount.get('credit')?.value;
    if (debit == null || credit == null) {
      if (debit == null) {
        this.amount.get('credit')?.setValue(null);
        this.amount.get('credit')?.setValue('');
        this.amount.get('debit')?.setValue('');
      } else if (credit == null) {
        this.amount.get('debit')?.setValue(null);
        this.amount.get('debit')?.setValue('');
        this.amount.get('credit')?.setValue('');
      }
    } else if (debit > 0) {
      this.amount.get('credit')?.setValue('');
      this.amount.get('debit')?.setValue(debit.toFixed(2));
    } else if (credit > 0) {
      this.amount.get('debit')?.setValue('');
      this.amount.get('credit')?.setValue(credit.toFixed(2));
    }

    this.balance_summary();
  }

  denyDate() {
    let journaldate = this.journalEntryForm.get('journal_date')?.value;
    if (journaldate > this.maxDate) {
      this.journalEntryForm.get('journal_date')?.setValue(this.maxDate);
    }
  }

  balance_summary() {
    let array = this.journalEntryForm.getRawValue().entries;
    this.total_debit = 0;
    this.total_credit = 0;

    array.forEach((x: any) => {
      if (x.debit == '' && x.credit == '') {
        x.debit = 0;
        x.credit = 0;
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      }
      else if (x.debit != '' && x.credit == ''){
        x.credit = 0;
        x.debit = parseFloat(x.debit);
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      }
      else if (x.debit == '' && x.credit != '') {
        x.debit = 0;
        x.credit = parseFloat(x.credit);
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      } else {
        this.total_debit = this.total_debit + x.debit;
        this.total_credit = this.total_credit + x.credit;
      }
    });
    this.journalEntryForm.get('totaldebit')?.setValue(this.total_debit);
    this.journalEntryForm.get('totalcredit')?.setValue(this.total_credit);
  }

  private formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year, month, day].join('-');
    return this.maxDate;
  }

  add(journal_number: string, journal_name: string, journal_type: string) {
    this.libJournals = {
      journal_number: journal_number,
      journal_name: journal_name,
      journal_type: journal_type,
    };
    this.wahieService.addLibJournal(this.libJournals as any).subscribe(
      (libjournal: any) => {
        this.libJournals = libjournal;
        this.ngOnInit();
        this.toast.success({
          detail: 'Success',
          summary: 'Account added',
          sticky: false,
          position: 'false',
        });
        this.log.activity = 'Add Journal Account: ' + this.libJournals.journal_number + ' ' + this.libJournals.journal_name;
        this.activityLog();
        this.show(2);
        console.log(this.libJournals);
      },
      (error) => {
        this.ngOnInit();
        this.toast.error({
          detail: 'Error',
          summary: 'Account number already taken',
          sticky: false,
          position: 'false',
        });
      }
    );
  }

  back() {
    this.route.navigateByUrl('admin/accounting');
  }

  public log = {
    name: sessionStorage.getItem('name'),
    department: sessionStorage.getItem('department'),
    activity: 'login',
  };
  activityLog() {
    this.http.post('http://127.0.0.1:8000/api/addActivity', this.log).subscribe((res: any) => {
      console.log(res);
    });
  }

  public sms = {
    account: null,
    sendDate: this.formatDate(),
    journal_id: null,
  };
  smsDue() {
    console.log(this.sms);
    this.http.post('http://127.0.0.1:8000/api/sendDate', this.sms).subscribe((res: any) => {
      console.log(res);
    });
  }

  getNameID(index: any) {
    this.journalEntryRow = this.journalEntryForm.get('entries') as FormArray;
    this.amount = this.journalEntryRow.at(index) as FormGroup;
    let name_id = this.amount.get('name')?.value;
    this.sms.account = name_id;
  }
}
