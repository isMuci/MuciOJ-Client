import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContesteditComponent } from './contestedit.component';

describe('ContesteditComponent', () => {
  let component: ContesteditComponent;
  let fixture: ComponentFixture<ContesteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContesteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContesteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
