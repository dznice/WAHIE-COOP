import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBodyComponent } from './member-body.component';

describe('MemberBodyComponent', () => {
  let component: MemberBodyComponent;
  let fixture: ComponentFixture<MemberBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
