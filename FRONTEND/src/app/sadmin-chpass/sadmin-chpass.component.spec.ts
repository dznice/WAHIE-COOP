import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminChpassComponent } from './sadmin-chpass.component';

describe('SadminChpassComponent', () => {
  let component: SadminChpassComponent;
  let fixture: ComponentFixture<SadminChpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminChpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminChpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
