import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Inject,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { slideleft2, slideright2 } from '../../animation';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-additional-info',

  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  animations: [slideleft2, slideright2],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AdditionalInfoComponent implements OnInit, OnDestroy {
  civilStatus: string[] = ['Single', 'Married'];
  employmentStatus: string[] = ['Employed', 'Unemployed', 'Self-employed'];

  // disabling spouse when single
  isSpouseDisabled: boolean = false;
  onSpouseChange() {
    if (this.updateMemberform.civil_status === this.civilStatus[0]) {
      this.isSpouseDisabled = true;
    } else {
      this.isSpouseDisabled = false;
    }
  }

  // disabling occupation when unemployed
  isOccupationDisabled: boolean = false;
  isCompAddDisabled: boolean = false;
  onEmploymentChange() {
    if (this.updateMemberform.employment_status === this.employmentStatus[1]) {
      this.isOccupationDisabled = true;
      this.isCompAddDisabled = true;
    } else {
      this.isOccupationDisabled = false;
      this.isCompAddDisabled = false;
    }
  }

  selectedRegion: any;
  selectedProvince: any;
  selectedCity: any;
  selectedBarangay: any;

  region: any;
  province: any;
  cities: any;
  barangay: any;

  isDisplayed: boolean = true;
  toggleDiv() {
    this.isDisplayed = this.isDisplayed ? false : true;
  }

  visible: boolean = true;
  changetype: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  cvisible: boolean = true;
  cchangetype: boolean = true;
  cviewpass() {
    this.cvisible = !this.cvisible;
    this.cchangetype = !this.cchangetype;
  }

  checkvisible: boolean = true;
  checkBox() {
    this.checkvisible = !this.checkvisible;
  }

  submitted: boolean = false;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private http: HttpClient,
    private token: TokenService,
    private route: Router,
    private auth: AuthGuardService,
    private toast: NgToastService
  ) {
    this.getmemberId();
  }


  ngOnInit() {
    this._document.body.classList.add('body');

    this.showRegions();
    this.showProvinces();
    this.showCities();
    this.showBarangay();
    this.showBarangayDesc();
    this.logSelectedValues();
    this.formatDate();
  }

  maxDate: any;

  private formatDate() {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.maxDate = [year-18, month, day].join('-');
  }

  ngOnDestroy() {
    this._document.body.classList.add('body');
  }

  public error: any = [];

  email = sessionStorage.getItem('email');
  memberId: string = '';
  name:string = '';
  addDisabled = 1;

  getmemberId() {
    this.http
      .get('http://127.0.0.1:8000/api/members/' + this.email)
      .subscribe((res: any) => {
        console.log('mem' + res.id);
        this.memberId = res.id;
        this.name = res.first_name;

      });
  }

  checkBene(){

  }

  id = localStorage.getItem('userData');

  //bene
  row = [
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
    {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
    },
  ];

  addTable() {
    const obj = {
      benificiary_name: '',
      benificiary_birthdate: '',
      benificiary_relation: '',
      required: true,
    };
    this.row.push(obj);
  }

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    console.log(event);
    this.showDel(2);
    this.showSkipModal(2);
  }

  delModal = -1;
  showDel(index: number) {
    this.delModal = index;
  }

  deleteRow(x: number) {
    //var delBtn = confirm(' Do you want to delete ?');
    // if (delBtn == true) {
    //   s
    // }
    this.row.splice(x, 1);
    this.showDel(2);
  }

  public updateMemberform = {
    email: this.email,
    tin_number: null,
    civil_status: null,
    spouse: null,
    employment_status: null,
    occupation: null,
    company_address: null,


    memId: this.memberId,
    row: this.row,
    selectedRegion: null,
    current_address: null,
    selectedCity: null,
    selectedProvince: null,
    postal_code: null,
    selectedBarangay: null,
    selectedRegionDescription: null,
    selectedProvinceDescription: null,
    selectedCityDescription: null,
    selectedBarangayDescription: null,
  };

  memberInfo() {
    // if(this.row == null){
    //   this.toast.warning({detail:'Input required please',summary:'Please Check',duration:2000, sticky:false,position:'tr'});

    // }
    // else{
    this.updateMemberform.selectedBarangayDescription = this.barangay.find(
      (brgy: { barangay_code: null }) =>
        brgy.barangay_code === this.updateMemberform.selectedBarangay
    )?.barangay_description;

    console.log(this.row);
    console.log(this.updateMemberform);
    this.http
      .post(
        'http://127.0.0.1:8000/api/memberInfo' + '/' + this.email,
        this.updateMemberform
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.token.handle(sessionStorage.getItem('ftoken'));
          this.route.navigateByUrl('member/member-home');
        },
        error => {
          this.toast.warning({
            detail: 'Input is required',
            summary: 'Please check',
            duration: 2000,
            sticky: false,
            position: 'tr',
          });
        }
      );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.auth.changeStatus(false);
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  logSelectedValues() {
    console.log('Selected Region:', this.updateMemberform.selectedRegion);
    console.log('Selected Province:', this.updateMemberform.selectedProvince);
    console.log('Selected City:', this.updateMemberform.selectedCity);
    console.log('Selected Barangay:', this.updateMemberform.selectedBarangay);
  }

  showRegions() {
    this.http.get('http://127.0.0.1:8000/api/region').subscribe((res: any) => {
      console.log(res);
      this.region = res;
    });
  }

  showProvinces() {
    if (this.updateMemberform.selectedRegion) {
      console.log(this.selectedRegion);
      this.updateMemberform.selectedRegionDescription = this.region.find(
        (reg: { region_code: null }) =>
          reg.region_code === this.updateMemberform.selectedRegion
      )?.region_description;
      this.http
        .get(
          `http://127.0.0.1:8000/api/province/${this.updateMemberform.selectedRegion}`
        )
        .subscribe((res: any) => {
          console.log(res);
          this.province = res;
        });
    } else {
      this.province = [];
    }
  }

  showCities() {
    if (this.updateMemberform.selectedProvince) {
      console.log(this.selectedProvince);
      this.updateMemberform.selectedProvinceDescription = this.province.find(
        (prov: { province_code: null }) =>
          prov.province_code === this.updateMemberform.selectedProvince
      )?.province_description;
      this.http
        .get(
          `http://127.0.0.1:8000/api/city/${this.updateMemberform.selectedProvince}`
        )
        .subscribe((res: any) => {
          console.log(res);
          this.cities = res;
        });
    } else {
      this.cities = [];
    }
  }

  showBarangay() {
    if (this.updateMemberform.selectedCity) {
      console.log(this.selectedCity);
      this.updateMemberform.selectedCityDescription = this.cities.find(
        (city: { city_municipality_code: null }) =>
          city.city_municipality_code === this.updateMemberform.selectedCity
      )?.city_municipality_description;
      this.http
        .get(
          `http://127.0.0.1:8000/api/barangay/${this.updateMemberform.selectedCity}`
        )
        .subscribe((res: any) => {
          console.log(res);
          this.barangay = res;
        });
    } else {
      this.barangay = [];
    }
  }

  showBarangayDesc() {
    if (this.updateMemberform.selectedBarangay) {
      console.log(this.selectedBarangay);

      this.http
        .get(
          `http://127.0.0.1:8000/api/barangay/${this.updateMemberform.selectedCity}`
        )
        .subscribe((res: any) => {
          console.log(res);
          this.barangay = res;
        });
    } else {
      this.barangay = [];
    }
  }

  skipModal= -1

  showSkipModal(index: number) {
    this.skipModal = index;
  }
  
  skipInfo(){
    this.http.post('http://127.0.0.1:8000/api/skipAddInfo' + '/' + this.email, this.skipModal)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.token.handle(sessionStorage.getItem('ftoken'));
        this.route.navigateByUrl('member/member-home');
        this.toast.success({
          detail: 'Success!',
          summary: 'Hello, '+ this.name+'!',
          duration: 2000,
          sticky: false,
          position: 'tr',
        });
      
      }
    );
  }



  }

