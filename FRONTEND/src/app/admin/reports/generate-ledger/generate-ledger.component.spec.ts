import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLedgerComponent } from './generate-ledger.component';

describe('GenerateLedgerComponent', () => {
  let component: GenerateLedgerComponent;
  let fixture: ComponentFixture<GenerateLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
