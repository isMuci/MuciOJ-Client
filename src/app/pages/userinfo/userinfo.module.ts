import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserinfoRoutingModule } from './userinfo-routing.module';
import { UserinfoComponent } from './userinfo.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [
    UserinfoComponent
  ],
  imports: [
    CommonModule,
    UserinfoRoutingModule,
    NzCalendarModule,
    NzModalModule,
    NzEmptyModule,
    NzTagModule,
    NzCardModule,
    NzAvatarModule,
    NzLayoutModule,
    NzIconModule,
    NzPopoverModule
  ],
  exports: [UserinfoComponent],
  providers: [
    DatePipe
  ]
})
export class UserinfoModule { }
