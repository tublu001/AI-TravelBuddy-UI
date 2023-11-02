import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponentComponent } from './stepper-component.component';

describe('StepperComponentComponent', () => {
  let component: StepperComponentComponent;
  let fixture: ComponentFixture<StepperComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponentComponent]
    });
    fixture = TestBed.createComponent(StepperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
