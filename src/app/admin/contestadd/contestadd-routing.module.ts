import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestaddComponent } from './contestadd.component';

const routes: Routes = [
  { path: '', component: ContestaddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestaddRoutingModule { }
