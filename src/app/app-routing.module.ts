import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewTaskComponent } from '../app/features/new-task/new-task.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { SettingsComponent } from '../app/features/settings/settings.component';
import { AllTaskComponent } from '../app/features/all-task/all-task.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component : DashboardComponent
  },
  { 
    path: 'new-task', 
    component: NewTaskComponent 
  },
  {
    path : 'all-task',
    component : AllTaskComponent
  },
  { 
    path: 'settings', 
    component: SettingsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
