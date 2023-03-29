import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminHomeComponent } from './sadmin-home.component';

describe('SadminHomeComponent', () => {
  let component: SadminHomeComponent;
  let fixture: ComponentFixture<SadminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
