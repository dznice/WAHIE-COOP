import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'WAHffle';

  index: number;
  
  timeModal = -1;
  showMod(index: number){
    this.timeModal = index;
  }

  constructor(private bnIdle: BnNgIdleService, private route: Router, private ngxService: NgxUiLoaderHttpModule) {
    // Master Loader
    this.bnIdle.startWatching(1800).subscribe((res) => {
      
      if (res) {
        this.showMod(1);
        console.log('session expired');
        localStorage.clear();
        sessionStorage.clear();
        this.route.navigateByUrl('login');
      }
    });
  }

  ngOnInit() {

  }
}
