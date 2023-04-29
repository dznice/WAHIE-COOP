import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSidenavComponent } from './member-sidenav.component';

describe('MemberSidenavComponent', () => {
  let component: MemberSidenavComponent;
  let fixture: ComponentFixture<MemberSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
