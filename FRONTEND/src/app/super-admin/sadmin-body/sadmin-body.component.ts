import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sadmin-body',
  templateUrl: './sadmin-body.component.html',
  styleUrls: ['./sadmin-body.component.scss']
})
export class SadminBodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  
  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;  
  }
}
