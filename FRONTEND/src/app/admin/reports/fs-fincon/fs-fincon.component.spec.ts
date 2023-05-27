import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsFinconComponent } from './fs-fincon.component';

describe('FsFinconComponent', () => {
  let component: FsFinconComponent;
  let fixture: ComponentFixture<FsFinconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsFinconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsFinconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
