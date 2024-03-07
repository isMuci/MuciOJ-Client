import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsetRoutingModule } from './problemset-routing.module';
import { ProblemsetComponent } from './problemset.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProblemsetComponent
  ],
  imports: [
    CommonModule,
    ProblemsetRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
  ],
  exports: [ProblemsetComponent]
})
export class ProblemsetModule { }
