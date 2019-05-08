import { Component, Inject } from '@angular/core';
import { Part, PartsEditService, PartsService, PARTS_SERVICE } from 'parts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  parts: Observable<Part[]>;
  editing: Observable<boolean>;

  constructor(
    @Inject(PARTS_SERVICE) private partsService: PartsService,
    private partsEditService: PartsEditService
  ) {
    this.parts = partsService.partsChanged.pipe(
      map(parts => {
        return parts.map(part => ({ ...part, state: JSON.parse(part.state) }));
      })
    );

    this.editing = partsEditService.editingChanged;
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
    this.partsEditService.canEdit = !this.partsEditService.canEdit;
  }

  save() {
    this.partsService.save();
    this.partsEditService.canEdit = false;
  }

  undo() {
    this.partsService.undo();
    this.partsEditService.canEdit = false;
  }

  seedTestData() {
    const data = [
      {
        id: 'd69ac579-276a-454c-9cca-b90dadc206a5',
        group: 'header',
        type: 'app-content-part',
        index: 0,
        state: `{
          "content": "<ul><li>Link 1</li><li>Link 2</li><li>Link 3</li></ul>"
        }`
      },
      {
        id: '34bff13e-8c05-446c-b6bb-0fbf8b1e5d1b',
        group: 'main',
        type: 'app-content-part',
        index: 0,
        state: `{
          "content": "<h1>Main</h1>"
        }`
      },
      {
        id: 'e0b36189-6e97-4cf1-ac59-1e24826bde27',
        group: 'nav',
        type: 'app-timer-part',
        index: 0,
        state: null
      },
      {
        id: 'd59f4f82-b15d-4eb9-b371-f8ff0e47f85b',
        group: 'main',
        type: 'app-test-part',
        index: 1,
        state: `{
          "title": "Title",
          "subTitle": "Sub Title"
        }`
      },
      {
        id: 'c6e07357-87eb-4d75-9ba6-d5eae877f18f',
        group: 'aside',
        type: 'app-content-part',
        index: 0,
        state: `{
          "content": "<p>aside...</p>"
        }`
      },
      {
        id: 'a0fb5f73-c032-4a14-8eee-f369d5399eca',
        group: 'footer',
        type: 'app-content-part',
        index: 0,
        state: `{
          "content": "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>"
        }`
      }
    ];
    localStorage.setItem('ngx-parts', JSON.stringify(data));
  }
}
