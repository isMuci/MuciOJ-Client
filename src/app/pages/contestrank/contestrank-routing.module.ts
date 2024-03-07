import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestrankComponent } from './contestrank.component';

const routes: Routes = [
  { path: '', component: ContestrankComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestrankRoutingModule { }
