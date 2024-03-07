import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemlistRoutingModule } from './problemlist-routing.module';
import { ProblemlistComponent } from './problemlist.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [ProblemlistComponent],
  imports: [
    CommonModule,
    ProblemlistRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzSwitchModule,
    NzModalModule
  ],
  exports: [ProblemlistComponent],
})
export class ProblemlistModule { }
