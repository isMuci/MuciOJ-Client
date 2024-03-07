import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestrankComponent } from './contestrank.component';

describe('ContestrankComponent', () => {
  let component: ContestrankComponent;
  let fixture: ComponentFixture<ContestrankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestrankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
