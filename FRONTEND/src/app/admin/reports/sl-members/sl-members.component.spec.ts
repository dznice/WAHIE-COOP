import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlMembersComponent } from './sl-members.component';

describe('SlMembersComponent', () => {
  let component: SlMembersComponent;
  let fixture: ComponentFixture<SlMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
