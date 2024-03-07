import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    StatusComponent
  ],
  imports: [
    CommonModule,
    StatusRoutingModule,
    NzGridModule,
    NzTableModule,
    FormsModule,
    NzTagModule,
    NzSpinModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule
  ],
  exports: [StatusComponent],
  providers: [
    DatePipe
  ]
})
export class StatusModule { }
