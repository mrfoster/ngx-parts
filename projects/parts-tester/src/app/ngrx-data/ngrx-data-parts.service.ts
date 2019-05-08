// import { Injectable } from '@angular/core';
// import { EntityCollectionService, EntityOp, EntityServices } from 'ngrx-data';
// import { Part, PartsService } from 'parts';
// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class NgrxDataPartsService implements PartsService {
//   currentParts: Part[];
//   readonly partsChanged: Observable<Part[]>;

//   partsService: EntityCollectionService<Part>;

//   constructor(entityServices: EntityServices) {
//     this.partsService = entityServices.getEntityCollectionService('Part');
//     this.partsChanged = this.partsService.entities$;
//   }

//   add(part: Part): Observable<Part> {
//     return this.partsService.add(part);
//   }
//   update(part: Part): Observable<Part> {
//     return this.partsService.update(part);
//   }
//   delete(id: string): Observable<string> {
//     return this.partsService.delete(id).pipe(map(key => key as string));
//   }

//   load(groups: string[]): Observable<void> {
//     //this.partsService.
//     // this.partsService.getWithQuery(`
//     // {

//     // }
//     // `);
//     return of(null);
//   }

//   save(): Observable<void> {
//     //this.partsService.
//     const addedOrUpdated = this.partsService.changeState$;
//     throw new Error('Method not implemented.');
//     this.partsService.createEntityAction(EntityOp.COMMIT_ALL);
//   }

//   undo() {
//     const action = this.partsService.createAndDispatch(EntityOp.UNDO_ALL);

//     this.partsService.dis;
//   }
// }
