import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetinfoComponent } from './setinfo.component';

const routes: Routes = [
  { path: '', component: SetinfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetinfoRoutingModule { }
