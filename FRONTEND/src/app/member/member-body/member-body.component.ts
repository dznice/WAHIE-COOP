import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-body',
  templateUrl: './member-body.component.html',
  styleUrls: ['./member-body.component.scss']
})
export class MemberBodyComponent {
  
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
