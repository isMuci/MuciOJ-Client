import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RanklistRoutingModule } from './ranklist-routing.module';
import { RanklistComponent } from './ranklist.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RanklistComponent
  ],
  imports: [
    CommonModule,
    RanklistRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
  ],
  exports: [RanklistComponent]
})
export class RanklistModule { }
