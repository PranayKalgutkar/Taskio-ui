import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartConfiguration } from 'chart.js';
import { WidgetUserTask } from '../../../shared/models/Widget';

@Component({
  selector: 'app-task-pie-chart-widget',
  templateUrl: './task-pie-chart-widget.component.html',
  styleUrl: './task-pie-chart-widget.component.css'
})
export class TaskPieChartWidgetComponent implements OnInit {
  @Input() tasks: WidgetUserTask[] = [];

  //public chartType: ChartType = 'doughnut'; // ✅ 'doughnut' or 'pie' is fine
  public chartType: 'doughnut' = 'doughnut'; // ✅ narrow type


  public chartData: ChartData<'doughnut'> = { // ✅ Match type with chartType
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#f44336', '#2196f3', '#4caf50'] // Optional but helps visualize
      }
    ]
  };

  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    animation: {
      duration: 2500, // ms
      easing: 'easeOutQuart'
    },
    //animation: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 10,
          textAlign: 'center'
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart(): void {
    const statusCounts = {
      'To Do': 0,
      'In Progress': 0,
      'Completed': 0
    };

    for (let task of this.tasks) {
      if (statusCounts.hasOwnProperty(task.status)) {
        statusCounts[task.status]++;
      }
    }

    this.chartData.datasets[0].data = [
      statusCounts['To Do'],
      statusCounts['In Progress'],
      statusCounts['Completed']
    ];
  }
}
