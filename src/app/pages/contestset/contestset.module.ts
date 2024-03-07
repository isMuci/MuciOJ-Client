import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContestsetRoutingModule } from './contestset-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { ContestsetComponent } from './contestset.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    ContestsetComponent
  ],
  imports: [
    CommonModule,
    ContestsetRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzStatisticModule,
    NzModalModule
  ],
  exports: [ContestsetComponent],
  providers: [
    DatePipe
  ]
})
export class ContestsetModule { }
