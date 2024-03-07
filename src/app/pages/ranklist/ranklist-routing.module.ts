import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RanklistComponent } from './ranklist.component';

const routes: Routes = [
  { path: '', component: RanklistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RanklistRoutingModule { }
