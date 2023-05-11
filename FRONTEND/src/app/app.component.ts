import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WAHffle';
  constructor(private bnIdle: BnNgIdleService, private route:Router) { // initiate it in your component constructor
    this.bnIdle.startWatching(30).subscribe((res) => {
      if(res) {
          console.log("session expired");
          localStorage.clear();
          sessionStorage.clear();
        this.route.navigateByUrl('login');
      }
    });
  }
}
