import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemeditComponent } from './problemedit.component';

const routes: Routes = [
  { path: '', component: ProblemeditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemeditRoutingModule { }
