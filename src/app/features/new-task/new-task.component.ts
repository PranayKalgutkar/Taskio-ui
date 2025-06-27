import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  newTaskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dueDate: ['', Validators.required],
      status: ['To Do', Validators.required],
      assignedUser: ['', Validators.required]
    })
  }

  createTask(): void {
    if (this.newTaskForm?.valid) {  // Use optional chaining to safely access valid property
      const taskData = this.newTaskForm?.value;  // Use optional chaining for accessing value

      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          console.log('Task created successfully!', response);
          // this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });

    } else {
      console.log('Form is invalid!');
    }
  }
}
