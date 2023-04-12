import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminBodyComponent } from './sadmin-body.component';

describe('SadminBodyComponent', () => {
  let component: SadminBodyComponent;
  let fixture: ComponentFixture<SadminBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
