import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemstatusComponent } from './problemstatus.component';

describe('ProblemstatusComponent', () => {
  let component: ProblemstatusComponent;
  let fixture: ComponentFixture<ProblemstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
