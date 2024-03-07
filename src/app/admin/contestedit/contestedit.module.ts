import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContesteditRoutingModule } from './contestedit-routing.module';
import { ContesteditComponent } from './contestedit.component';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { QuillModule } from 'ngx-quill';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [ContesteditComponent],
  imports: [
    CommonModule,
    ContesteditRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzInputModule,
    NzRadioModule,
    QuillModule,
    QuillModule.forRoot(),
    NzDatePickerModule,
    NzTransferModule,
    NzTableModule,
    NzSwitchModule
  ],
  exports: [ContesteditComponent],
})
export class ContesteditModule { }
