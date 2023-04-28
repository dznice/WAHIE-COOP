import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegMembersComponent } from './reg-members.component';

describe('RegMembersComponent', () => {
  let component: RegMembersComponent;
  let fixture: ComponentFixture<RegMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
