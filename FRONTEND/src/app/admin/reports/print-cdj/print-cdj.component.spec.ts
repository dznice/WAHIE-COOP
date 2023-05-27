import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCdjComponent } from './print-cdj.component';

describe('PrintCdjComponent', () => {
  let component: PrintCdjComponent;
  let fixture: ComponentFixture<PrintCdjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCdjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCdjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
