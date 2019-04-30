import { Injectable } from '@angular/core';
import { Part } from 'parts/lib/part';
import { PartsService } from 'parts/ngx-parts';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestPartsService implements PartsService {
  private data = [
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
      id: '00e53562-8215-452d-8fe5-89fbdd5db6aa',
      group: 'main',
      type: 'app-iframe-part',
      index: 1,
      state: `{
        "src": "https://www.youtube.com/embed/TcMBFSGVi1c"
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

  private currentParts = [];
  private part$ = new BehaviorSubject<Part[]>(this.currentParts);
  readonly parts = this.part$.asObservable();

  private updateParts(parts: Part[]) {
    this.currentParts = parts;
    this.part$.next(this.currentParts);
  }

  add(part: Part): void {
    this.updateParts([...this.currentParts, part]);
  }

  update(part: Part): void {
    this.updateParts([
      ...this.currentParts.filter(p => p.id !== part.id),
      part
    ]);
  }

  remove(part: Part): void {
    this.updateParts(this.currentParts.filter(p => p.id !== part.id));
  }

  load(groups: string[]): Observable<void> {
    this.updateParts(this.data);
    return of(null);
  }

  save(): Observable<void> {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
