// import { NgModule } from '@angular/core';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { EntityDataService, NgrxDataModule } from 'ngrx-data';
// import { PARTS_SERVICE } from 'parts/ngx-parts';
// import { environment } from '../../environments/environment';
// import { entityConfig } from './entity-metadata';
// import { NgrxDataPartsService } from './ngrx-data-parts.service';
// import { PartDataService } from './part-data.service';

// @NgModule({
//   imports: [
//     StoreModule.forRoot({}),
//     EffectsModule.forRoot([]),
//     environment.production ? [] : StoreDevtoolsModule.instrument(),
//     NgrxDataModule.forRoot(entityConfig)
//   ],
//   exports: [],
//   declarations: [],
//   providers: [
//     // {
//     //   provide: PARTS_STORE,
//     //   useClass: TestPartsStore
//     // },
//     {
//       provide: PARTS_SERVICE,
//       useClass: NgrxDataPartsService
//     }
//   ]
// })
// export class AppStoreModule {
//   constructor(
//     entityDataService: EntityDataService,
//     partDataService: PartDataService
//   ) {
//     entityDataService.registerService('Part', partDataService);
//   }
// }
