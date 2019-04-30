import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from './part';
export const PARTS_SERVICE = new InjectionToken<PartsService>('parts.service');

export interface PartsService {
  readonly parts: Observable<Part[]>;

  add(part: Part): void;
  update(part: Part): void;
  remove(part: Part): void;

  load(groups: string[]): Observable<void>;
  save(): Observable<void>;
}
