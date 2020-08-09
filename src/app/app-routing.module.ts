import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SigninComponent} from './pages/signin/signin.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AddpostComponent} from './pages/addpost/addpost.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'signin',
    component : SigninComponent
  },
  {
    path: 'signup',
    component : SignupComponent
  },
  {
    path: 'addpost',
    component: AddpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
