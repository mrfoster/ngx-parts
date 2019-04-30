import { Component, Inject } from '@angular/core';
import { PartsService, PARTS_SERVICE } from 'parts';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editable = false;
  constructor(@Inject(PARTS_SERVICE) private partsService: PartsService) {}

  addContentPart() {
    this.partsService.add({
      id: v4(),
      group: 'main',
      type: 'app-content-part',
      index: 0,
      state: `{
        "content": "<h1>Test</h1>"
      }`
    });
  }

  addTimerPart() {
    this.partsService.add({
      id: v4(),
      group: 'aside',
      type: 'app-timer-part',
      index: 0,
      state: ''
    });
  }

  toggleEdit() {
    this.editable = !this.editable;
  }
}
