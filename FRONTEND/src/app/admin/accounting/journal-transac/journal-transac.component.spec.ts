import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalTransacComponent } from './journal-transac.component';

describe('JournalTransacComponent', () => {
  let component: JournalTransacComponent;
  let fixture: ComponentFixture<JournalTransacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalTransacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalTransacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
