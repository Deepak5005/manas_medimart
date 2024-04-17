import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [

    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'', redirectTo: '', pathMatch: 'full'},
];

export class AppRoutingModule{}