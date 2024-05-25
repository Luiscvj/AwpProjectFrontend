import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './Guards/auth.guard';
import { OffcanvasComponent } from './Pages/offcanvas/offcanvas.component';


export const routes: Routes = 
[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home', component:HomeComponent, canActivate:[authGuard]}//determines if a route can be activate
];
