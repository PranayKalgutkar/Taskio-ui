import { Component, OnInit } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridType,
  DisplayGrid
} from 'angular-gridster2';

export interface WidgetItem extends GridsterItem {
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  options!: GridsterConfig;
  widgets: WidgetItem[] = [];

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
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

  addWidget(): void {
    const newWidget: WidgetItem = {
      x: 0,
      y: 0,
      cols: 2,
      rows: 2,
      type: `Widget Name ${this.widgets.length + 1}`
    };
    this.widgets.push(newWidget);
    this.saveLayout();
  }

  saveLayout(): void {
    localStorage.setItem('dashboard-layout', JSON.stringify(this.widgets));
  }

  loadLayout(): void {
    const saved = localStorage.getItem('dashboard-layout');
    this.widgets = saved ? (JSON.parse(saved) as WidgetItem[]) : [];
  }
}
