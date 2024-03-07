import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestaddComponent } from './contestadd.component';

describe('ContestaddComponent', () => {
  let component: ContestaddComponent;
  let fixture: ComponentFixture<ContestaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
