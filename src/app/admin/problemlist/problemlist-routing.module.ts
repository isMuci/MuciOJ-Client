import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemlistComponent } from './problemlist.component';

const routes: Routes = [
  { path: '', component: ProblemlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemlistRoutingModule { }
