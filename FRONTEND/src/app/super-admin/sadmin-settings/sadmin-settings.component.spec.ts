import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminSettingsComponent } from './sadmin-settings.component';

describe('SadminSettingsComponent', () => {
  let component: SadminSettingsComponent;
  let fixture: ComponentFixture<SadminSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
