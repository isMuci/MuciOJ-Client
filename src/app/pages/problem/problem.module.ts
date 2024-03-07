import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemRoutingModule } from './problem-routing.module';
import { ProblemComponent } from './problem.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ProblemComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    NzCardModule,
    NzLayoutModule,
    NzTagModule,
    NzButtonModule
  ],
  exports: [ProblemComponent]
})
export class ProblemModule { }
