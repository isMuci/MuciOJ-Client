import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemeditRoutingModule } from './problemedit-routing.module';
import { ProblemeditComponent } from './problemedit.component';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [ProblemeditComponent],
  imports: [
    CommonModule,
    ProblemeditRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzInputModule,
    NzRadioModule,
    QuillModule,
    QuillModule.forRoot(),
  ],
  exports: [ProblemeditComponent],
})
export class ProblemeditModule { }
