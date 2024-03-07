import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeditComponent } from './problemedit.component';

describe('ProblemeditComponent', () => {
  let component: ProblemeditComponent;
  let fixture: ComponentFixture<ProblemeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
