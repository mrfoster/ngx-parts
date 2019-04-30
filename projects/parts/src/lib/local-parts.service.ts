import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Part } from './part';
import { PartsService } from './parts.service';

@Injectable({
  providedIn: 'root'
})
export class LocalPartsService implements PartsService {
  private part$: BehaviorSubject<Part[]>;
  readonly parts: Observable<Part[]>;

  add(part: Part): Observable<void> {
    throw new Error('Method not implemented.');
  }
  update(part: Part): Observable<void> {
    throw new Error('Method not implemented.');
  }
  remove(part: Part): Observable<void> {
    throw new Error('Method not implemented.');
  }
  load(groups: string[]): Observable<void> {
    throw new Error('Method not implemented.');
  }
  save(): Observable<void> {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
