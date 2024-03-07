import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemaddRoutingModule } from './problemadd-routing.module';
import { ProblemaddComponent } from './problemadd.component';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [ProblemaddComponent],
  imports: [
    CommonModule,
    ProblemaddRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzInputModule,
    NzRadioModule,
    QuillModule,
    QuillModule.forRoot(),
  ],
  exports: [ProblemaddComponent],
})
export class ProblemaddModule { }
