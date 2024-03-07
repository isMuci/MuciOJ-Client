import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutComponent, NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    NzInputModule,
    NzLayoutModule,
    NzButtonModule
  ],
  exports: [RegisterComponent],
  providers: [RegisterComponent]
})
export class RegisterModule { }
