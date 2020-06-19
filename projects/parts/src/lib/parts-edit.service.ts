import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartsEditService {
  get canEdit() {
    return this._canEdit;
  }

  set canEdit(canEdit: boolean) {
    this.editing$.next(canEdit);
    this._canEdit = canEdit;
  }
  private _canEdit = false;
  private editing$ = new BehaviorSubject(this._canEdit);
  readonly editingChanged = this.editing$.asObservable();
}
