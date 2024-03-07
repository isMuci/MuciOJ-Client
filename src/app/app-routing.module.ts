import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'problemset', loadChildren: () => import('./pages/problemset/problemset.module').then(m => m.ProblemsetModule) },
  { path: 'contestset', loadChildren: () => import('./pages/contestset/contestset.module').then(m => m.ContestsetModule) },
  { path: 'ranklist', loadChildren: () => import('./pages/ranklist/ranklist.module').then(m => m.RanklistModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'status', loadChildren: () => import('./pages/status/status.module').then(m => m.StatusModule) },
  { path: 'setinfo', loadChildren: () => import('./pages/setinfo/setinfo.module').then(m => m.SetinfoModule) },
  { path: 'userinfo/:user_id', loadChildren: () => import('./pages/userinfo/userinfo.module').then(m => m.UserinfoModule) },
  { path: 'problem', loadChildren: () => import('./pages/problem/problem.module').then(m => m.ProblemModule) },
  { path: 'contest/:contest_id', loadChildren: () => import('./pages/contest/contest.module').then(m => m.ContestModule) },
  { path: 'submit', loadChildren: () => import('./pages/submit/submit.module').then(m => m.SubmitModule) },
  { path: 'problemstatus', loadChildren: () => import('./pages/problemstatus/problemstatus.module').then(m => m.ProblemstatusModule) },
  { path: 'userlist', loadChildren: () => import('./admin/userlist/userlist.module').then(m => m.UserlistModule) },
  { path: 'problemlist', loadChildren: () => import('./admin/problemlist/problemlist.module').then(m => m.ProblemlistModule) },
  { path: 'contestlist', loadChildren: () => import('./admin/contestlist/contestlist.module').then(m => m.ContestlistModule) },
  { path: 'problemadd', loadChildren: () => import('./admin/problemadd/problemadd.module').then(m => m.ProblemaddModule) },
  { path: 'problemedit', loadChildren: () => import('./admin/problemedit/problemedit.module').then(m => m.ProblemeditModule) },
  { path: 'contestadd', loadChildren: () => import('./admin/contestadd/contestadd.module').then(m => m.ContestaddModule) },
  { path: 'contestedit', loadChildren: () => import('./admin/contestedit/contestedit.module').then(m => m.ContesteditModule) },
  { path: 'contestrank', loadChildren: () => import('./pages/contestrank/contestrank.module').then(m => m.ContestrankModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
