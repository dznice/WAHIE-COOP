import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-sl-members',
  templateUrl: './sl-members.component.html',
  styleUrls: ['./sl-members.component.scss']
})
export class SlMembersComponent {
  @Input() formData: any;
}
 