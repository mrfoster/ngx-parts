import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { Part } from './part';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private _currentParts: Part[] = [];
  private part$ = new BehaviorSubject(this._currentParts);
  readonly parts = this.part$.asObservable();

  private _canEdit = false;
  private editing$ = new BehaviorSubject(this._canEdit);
  readonly editing = this.editing$.asObservable();

  get canEdit() {
    return this._canEdit;
  }

  set canEdit(canEdit: boolean) {
    this.editing$.next(canEdit);
    this._canEdit = canEdit;
  }

  get currentParts() {
    return this._currentParts;
  }

  set currentParts(parts: Part[]) {
    this.part$.next(parts);
    this._currentParts = parts;
  }

  add(part: Part): void;
  add(type: string, group: string): void;
  add<T>(type: string, group: string, state: T): void;

  add<T>(partOrType: Part | string, group?: string, state?: T): void {
    const part = (partOrType as Part) || {
      id: v4(),
      group: group,
      type: partOrType as string,
      state: state ? JSON.stringify(state) : null,
      index: 0
    };

    this.currentParts = [...this.currentParts, part];
  }

  // updateIndex(id: string, index: number) {
  //   const part = this._currentParts.find(p => p.id === id);
  //   if (!part) {
  //     return;
  //   }

  //   const partsInGroup = this._currentParts
  //     .filter(x => x.group === part.group)
  //     .sort((a, b) => a.index - b.index)
  //     .filter(x => x.id !== part.id);
  // }

  update(part: Part): void {
    this.currentParts = [
      ...this.currentParts.filter(p => p.id !== part.id),
      part
    ];
  }

  remove(id: string): void {
    this.currentParts = this.currentParts.filter(p => p.id !== id);
  }
}
