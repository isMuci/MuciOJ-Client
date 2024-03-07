import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContestrankRoutingModule } from './contestrank-routing.module';
import { ContestrankComponent } from './contestrank.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form'; import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioGroupComponent, NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [ContestrankComponent],
  imports: [
    CommonModule,
    ContestrankRoutingModule,
    NzTableModule,
    FormsModule,
    NzFormModule,
    NzDividerModule,
    NzRadioModule,
    NzSwitchModule,
    NzIconModule
  ],
  exports: [ContestrankComponent],
  providers: [
    DatePipe
  ]
})
export class ContestrankModule { }
