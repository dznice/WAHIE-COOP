import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsOpComponent } from './fs-op.component';

describe('FsOpComponent', () => {
  let component: FsOpComponent;
  let fixture: ComponentFixture<FsOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsOpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
