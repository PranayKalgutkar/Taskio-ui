import { Component, Input } from '@angular/core';
import { WidgetUserTask } from 'src/app/shared/models/Widget';


@Component({
  selector: 'app-task-widget',
  standalone: true,
  imports: [],
  templateUrl: './task-widget.component.html',
  styleUrl: './task-widget.component.css'
})
export class TaskWidgetComponent {
  @Input() tasks: WidgetUserTask[] = [];
}
