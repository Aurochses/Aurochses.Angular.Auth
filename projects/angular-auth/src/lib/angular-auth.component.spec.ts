import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAuthComponent } from './angular-auth.component';

describe('AngularAuthComponent', () => {
  let component: AngularAuthComponent;
  let fixture: ComponentFixture<AngularAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
