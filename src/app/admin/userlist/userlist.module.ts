import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserlistComponent } from './userlist.component';
import { UserlistRoutingModule } from './userlist-routing.module';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [UserlistComponent],
  imports: [
    CommonModule,
    UserlistRoutingModule,
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
  exports: [UserlistComponent],
})
export class UserlistModule { }
