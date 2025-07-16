import { Component, OnInit } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridType,
  DisplayGrid
} from 'angular-gridster2';
import { WidgetUserTask } from '../../shared/models/Widget';

export interface WidgetItem extends GridsterItem {
  type: string;
  flipped?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options!: GridsterConfig;
  widgets: WidgetItem[] = [];

  isEditMode = false;
  showWidgetMenu = false;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      pushItems: true,
      itemChangeCallback: () => this.saveLayout()
    };

    this.loadLayout();
  }

  addWidget(type: string): void {
    const newWidget: WidgetItem = {
      x: 0,
      y: 0,
      cols: 2,
      rows: 2,
      type,
      flipped: false
    };
    this.widgets.push(newWidget);
    this.saveLayout();
    this.showWidgetMenu = false; // auto-close dropdown
  }

  // addWidget(): void {
  //   const newWidget: WidgetItem = {
  //     x: 0,
  //     y: 0,
  //     cols: 2,
  //     rows: 2,
  //     type: 'task'
  //   };
  //   this.widgets.push(newWidget);
  //   this.saveLayout();
  // }

  // addWidget(): void {
  //   const newWidget: WidgetItem = {
  //     x: 0,
  //     y: 0,
  //     cols: 2,
  //     rows: 2,
  //     type: `Widget Name ${this.widgets.length + 1}`
  //   };
  //   this.widgets.push(newWidget);
  //   this.saveLayout();
  // }

  saveLayout(): void {
    localStorage.setItem('dashboard-layout', JSON.stringify(this.widgets));
  }

  loadLayout(): void {
    const saved = localStorage.getItem('dashboard-layout');
    this.widgets = saved ? (JSON.parse(saved) as WidgetItem[]) : [];
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  toggleWidgetMenu(): void {
    this.showWidgetMenu = !this.showWidgetMenu;
  }

  removeWidget(widget: WidgetItem): void {
    this.widgets = this.widgets.filter(w => w !== widget);
    this.saveLayout();
  }


  taskList: WidgetUserTask[] = [
    { id: 1, title: 'Design Login Page', status: 'In Progress' },
    { id: 2, title: 'Fix Bug #203', status: 'Completed' },
    { id: 3, title: 'Write Test Cases', status: 'In Progress' },
    { id: 4, title: 'Deploy to staging', status: 'To Do' }
  ];

  getTopInProgressTasks(): WidgetUserTask[] {
    return this.taskList.filter(t => t.status === 'In Progress').slice(0, 2);
  }
}
