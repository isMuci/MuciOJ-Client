import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProblemstatusRoutingModule } from './problemstatus-routing.module';
import { ProblemstatusComponent } from './problemstatus.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  declarations: [
    ProblemstatusComponent
  ],
  imports: [
    CommonModule,
    ProblemstatusRoutingModule,
    NzCardModule,
    NzTableModule,
    NzDescriptionsModule
  ],
  exports: [ProblemstatusComponent],
  providers: [
    DatePipe
  ]
})
export class ProblemstatusModule { }
