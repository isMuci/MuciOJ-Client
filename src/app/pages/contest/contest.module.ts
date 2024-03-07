import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContestRoutingModule } from './contest-routing.module';
import { ContestComponent } from './contest.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [ContestComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzProgressModule,
    NzButtonModule,
    NzCardModule,
    NzResultModule,
    NzMessageModule
  ],
  exports: [ContestComponent],
  providers: [DatePipe],
})
export class ContestModule { }
