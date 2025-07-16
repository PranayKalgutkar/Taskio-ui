import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { GridsterModule } from 'angular-gridster2';
import { NgChartsModule } from 'ng2-charts';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NewTaskComponent } from './features/new-task/new-task.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AllTaskComponent } from './features/all-task/all-task.component';
import { TaskWidgetComponent } from "./features/widgets/task-widget/task-widget.component"; // <-- Add this line
import { TaskPieChartWidgetComponent } from './features/widgets/task-pie-chart-widget/task-pie-chart-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    DashboardComponent,
    SettingsComponent,
    AllTaskComponent,
    TaskPieChartWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    
    GridsterModule,
    NgChartsModule,
    
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    TaskWidgetComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
