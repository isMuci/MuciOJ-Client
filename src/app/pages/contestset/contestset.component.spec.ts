import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsetComponent } from './contestset.component';

describe('ContestsetComponent', () => {
  let component: ContestsetComponent;
  let fixture: ComponentFixture<ContestsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
