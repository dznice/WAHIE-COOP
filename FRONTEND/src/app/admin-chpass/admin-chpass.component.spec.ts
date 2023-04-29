import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChpassComponent } from './admin-chpass.component';

describe('AdminChpassComponent', () => {
  let component: AdminChpassComponent;
  let fixture: ComponentFixture<AdminChpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
