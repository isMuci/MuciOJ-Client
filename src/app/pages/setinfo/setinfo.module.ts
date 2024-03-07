import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetinfoRoutingModule } from './setinfo-routing.module';
import { SetinfoComponent } from './setinfo.component';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    SetinfoComponent
  ],
  imports: [
    CommonModule,
    SetinfoRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzInputModule
  ],
  exports: [SetinfoComponent]
})
export class SetinfoModule { }
