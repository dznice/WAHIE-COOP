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
  constructor(
    private bnIdle: BnNgIdleService,
    private route: Router,
    private ngxService: NgxUiLoaderHttpModule
  ) {

    // initiate it in your component constructor
    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res) {
        console.log('session expired');
        localStorage.clear();
        sessionStorage.clear();
        this.route.navigateByUrl('login');
        // Add modal
      }
    });
  }

  ngOnInit() {
    //   this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    //   // Stop the foreground loading after 5s
    //   setTimeout(() => {
    //     this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    //   }, 5000);
    //   // OR
    //   this.ngxService.startBackground("do-background-things");
    //   // Do something here...
    //   this.ngxService.stopBackground("do-background-things");
    //   this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    //   // Stop the foreground loading after 5s
    //   setTimeout(() => {
    //     this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    //   }, 5000);
    // }
  }
}
