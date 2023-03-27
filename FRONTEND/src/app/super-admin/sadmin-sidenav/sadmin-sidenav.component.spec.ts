import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminSidenavComponent } from './sadmin-sidenav.component';

describe('SadminSidenavComponent', () => {
  let component: SadminSidenavComponent;
  let fixture: ComponentFixture<SadminSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
