import { Component } from '@angular/core';
import { PartsService } from 'parts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  parts: Observable<any[]>;
  editing: Observable<boolean>;

  constructor(private partsService: PartsService) {
    this.parts = partsService.parts.pipe(
      map(parts => {
        return parts.map(part => ({ ...part, state: JSON.parse(part.state) }));
      })
    );
    this.editing = partsService.editing;
  }

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
    this.partsService.canEdit = !this.partsService.canEdit;
  }
}
