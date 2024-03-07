import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemstatusComponent } from './problemstatus.component';

const routes: Routes = [
  { path: '', component: ProblemstatusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemstatusRoutingModule { }
