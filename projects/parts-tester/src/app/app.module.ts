import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DefaultPartsService,
  LocalPartsDataService,
  PartsModule,
  PARTS_DATA_SERVICE,
  PARTS_SERVICE,
  PART_REGISTRATIONS
} from 'parts';
import { AddPartComponent } from './add-part/add-part.component';
import { AppComponent } from './app.component';
import {
  ContentPartComponent,
  ContentPartRegistration
} from './parts/content/content-part.component';
import {
  IframePartComponent,
  IframePartRegistration
} from './parts/iframe/iframe-part.component';
import {
  LayoutContainerPartComponent,
  LayoutContainerPartRegistration
} from './parts/layout-container/layout-container-part.component';
import {
  TestPartComponent,
  TestPartRegistration
} from './parts/test/test-part.component';
import {
  TimerPartComponent,
  TimerPartRegistration
} from './parts/timer/timer-part.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const parts = [
  ContentPartComponent,
  IframePartComponent,
  TimerPartComponent,
  TestPartComponent,
  LayoutContainerPartComponent
];

@NgModule({
  declarations: [AppComponent, AddPartComponent, parts, HomePageComponent, AboutPageComponent],
  entryComponents: parts,
  imports: [BrowserModule, BrowserAnimationsModule, PartsModule, FormsModule, AppRoutingModule],
  providers: [
    {
      provide: PARTS_SERVICE,
      useClass: DefaultPartsService
    },
    {
      provide: PARTS_DATA_SERVICE,
      useClass: LocalPartsDataService
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: ContentPartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: IframePartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: TimerPartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: TestPartRegistration,
      multi: true
    },
    {
      provide: PART_REGISTRATIONS,
      useValue: LayoutContainerPartRegistration,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
