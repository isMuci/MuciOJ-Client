import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsetComponent } from './problemset.component';

const routes: Routes = [
  { path: '', component: ProblemsetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemsetRoutingModule { }
