import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDoneComponent } from './pass-done.component';

describe('PassDoneComponent', () => {
  let component: PassDoneComponent;
  let fixture: ComponentFixture<PassDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
