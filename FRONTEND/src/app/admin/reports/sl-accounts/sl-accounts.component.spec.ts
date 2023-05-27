import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlAccountsComponent } from './sl-accounts.component';

describe('SlAccountsComponent', () => {
  let component: SlAccountsComponent;
  let fixture: ComponentFixture<SlAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
