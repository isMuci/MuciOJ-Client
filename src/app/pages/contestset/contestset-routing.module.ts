import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestsetComponent } from './contestset.component';

const routes: Routes = [
  { path: '', component: ContestsetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestsetRoutingModule { }
