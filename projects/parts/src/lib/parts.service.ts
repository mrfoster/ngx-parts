import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from './part';
export const PARTS_SERVICE = new InjectionToken<PartsService>('parts.service');

export interface PartsService {
  readonly partsChanged: Observable<Part[]>;

  add(part: Part): Observable<Part>;
  add(parts: Part[]): Observable<Part[]>;
  add(type: string, group: string): Observable<Part>;
  add<T>(type: string, group: string, state: T): Observable<Part>;

  update<T>(id: string, state: T): Observable<Part[]>;
  update(parts: Part[]): Observable<Part[]>;

  delete(id: string): Observable<string>;

  undo(): void;
  save(): Observable<number>;
  load(groups: string[]): Observable<Part[]>;
}
