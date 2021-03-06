import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoutingModule } from './navigation-routing.module';
import { NavigationService } from './navigation.service';
import { NavigationComponent } from './navigation.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    RoutingModule
  ],
  declarations: [
    NavigationComponent,
    PaginationComponent
  ],
  providers: [
    { provide: 'NavigationService', useClass: NavigationService }
  ]
})
export class NavigationModule { }
