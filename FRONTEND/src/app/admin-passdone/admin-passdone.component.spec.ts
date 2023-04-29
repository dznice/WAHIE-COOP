import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPassdoneComponent } from './admin-passdone.component';

describe('AdminPassdoneComponent', () => {
  let component: AdminPassdoneComponent;
  let fixture: ComponentFixture<AdminPassdoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPassdoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPassdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
