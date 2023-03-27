import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminPassdoneComponent } from './sadmin-passdone.component';

describe('SadminPassdoneComponent', () => {
  let component: SadminPassdoneComponent;
  let fixture: ComponentFixture<SadminPassdoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SadminPassdoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadminPassdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
