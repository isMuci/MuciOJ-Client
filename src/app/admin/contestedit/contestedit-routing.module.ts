import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContesteditComponent } from './contestedit.component';

const routes: Routes = [
  { path: '', component: ContesteditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContesteditRoutingModule { }
