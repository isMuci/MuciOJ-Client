import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SubmitRoutingModule } from './submit-routing.module';
import { SubmitComponent } from './submit.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [
    SubmitComponent
  ],
  imports: [
    CommonModule,
    SubmitRoutingModule,
    NzCardModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzSpinModule,
    NzTagModule
  ],
  exports: [SubmitComponent],
  providers: [
    DatePipe
  ]
})
export class SubmitModule { }
