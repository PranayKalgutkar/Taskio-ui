import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UserTask } from '../../shared/models/UserTask';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, startWith, switchMap, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'description', 'dueDate', 'status', 'assignedUser', 'createdBy'];
  dataSource = new MatTableDataSource<UserTask>();
  totalData: number = 0;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadTasks();
    this.cdr.detectChanges();
  }

  loadTasks(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Reset to first page on sort change
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.taskService.fetchTaskAll({
            pageNumber: this.paginator.pageIndex + 1,
            pageSize: this.paginator.pageSize,
            sortBy: this.sort.active,
            sortDirection: this.sort.direction
          });
        }),
        map((response) => {
          this.loading = false;
          this.totalData = response.totalCount || 0;
          return response.data;
        }),
        catchError(() => {
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: UserTask[]) => {
        this.dataSource.data = data;
      });
  }
}
