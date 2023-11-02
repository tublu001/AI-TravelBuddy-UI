import { Component, OnInit, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-stepper',
  templateUrl: './stepper-component.component.html',
  styleUrls: ['./stepper-component.component.css'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponentComponent }],
})
export class StepperComponentComponent extends CdkStepper {
  @Input()
  activeClass = 'active';

  isNextButtonHidden() {
    return !(this.steps.length === this.selectedIndex + 1);
  }
}
