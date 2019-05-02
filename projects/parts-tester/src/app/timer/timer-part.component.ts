import { Component } from '@angular/core';
import { PartRegistration } from 'parts';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer-part',
  templateUrl: './timer-part.component.html',
  styleUrls: ['./timer-part.component.css']
})
export class TimerPartComponent {
  time = 0;

  constructor() {
    interval(1000).subscribe(() => (this.time += 1));
  }
}

export const TimerPartRegistration: PartRegistration = {
  displayName: 'Timer',
  name: 'app-timer-part',
  type: TimerPartComponent
};
