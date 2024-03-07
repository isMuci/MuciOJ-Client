import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestlistComponent } from './contestlist.component';

const routes: Routes = [
  { path: '', component: ContestlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestlistRoutingModule { }
