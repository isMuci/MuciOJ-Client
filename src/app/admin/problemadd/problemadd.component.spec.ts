import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemaddComponent } from './problemadd.component';

describe('ProblemaddComponent', () => {
  let component: ProblemaddComponent;
  let fixture: ComponentFixture<ProblemaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
