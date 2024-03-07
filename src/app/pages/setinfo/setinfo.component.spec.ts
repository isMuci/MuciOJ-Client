import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetinfoComponent } from './setinfo.component';

describe('SetinfoComponent', () => {
  let component: SetinfoComponent;
  let fixture: ComponentFixture<SetinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
