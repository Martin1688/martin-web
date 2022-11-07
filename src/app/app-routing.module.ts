import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path:'member',
    loadChildren:()=>import('./pages/member/member.module').then(m=>m.MemberModule)
  },
  {
    path:'data',
    loadChildren:()=>import('./pages/sharedata/sharedata.module').then(m=>m.SharedataModule)
  },  
  {
    path:'',
    component:HomepageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
