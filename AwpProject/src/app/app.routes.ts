import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './Guards/auth.guard';
import { OffcanvasComponent } from './Pages/offcanvas/offcanvas.component';
import { ProjectsComponent } from './Pages/home/ChildComponents/projects/projects.component';
import { OverallProjectComponent } from './Pages/home/ChildComponents/overall-project/overall-project.component';
import { WorkBreakdownStructureComponent } from './Pages/home/ChildComponents/work-breakdown-structure/work-breakdown-structure.component';
import { CreditRulesComponent } from './Pages/home/ChildComponents/credit-rules/credit-rules.component';


export const routes: Routes = 
[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',
     component:HomeComponent, 
     children:
     [
        {path: '',component:ProjectsComponent},
        {path:'projects',component:ProjectsComponent},
        {path:'overall-project',component:OverallProjectComponent},
        {path:'work-breakdown-structure/:projectId', component:WorkBreakdownStructureComponent},
        {path:'credit-rules/:projectId',component:CreditRulesComponent}
     ]/*canActivate:[authGuard]*/}//determines if a route can be activate
];
