import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemaddComponent } from './problemadd.component';

const routes: Routes = [
  { path: '', component: ProblemaddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemaddRoutingModule { }
