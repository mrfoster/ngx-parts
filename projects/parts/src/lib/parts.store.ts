import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export const PARTS_STORE = new InjectionToken<PartsStore>('parts.store');

export interface PartsStore {
  load(groups: string[]): Observable<void>;
  save(): Observable<void>;
}
