import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';


export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'addemployee',component:AddemployeeComponent},
];
