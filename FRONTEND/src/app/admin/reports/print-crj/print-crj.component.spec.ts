import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCrjComponent } from './print-crj.component';

describe('PrintCrjComponent', () => {
  let component: PrintCrjComponent;
  let fixture: ComponentFixture<PrintCrjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCrjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCrjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
