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
import { merge, startWith, switchMap, map, catchError, of, delay, tap } from 'rxjs';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'dueDate', 'status', 'assignedUser', 'createdBy'];
  dataSource = new MatTableDataSource<UserTask>();
  userTasks: UserTask[] = [];

  totalData: number = 0;
  loading = false;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadTasks();
    //this.setRecordToMatTable();
    //this.cdr.detectChanges();
  }

  loadTasks(): void {
    // Set paginator and sort to dataSource (optional in this case, since we control data ourselves)
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Reset to first page on sort change
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;

          const postData = {
            pageNumber: this.paginator.pageIndex + 1,
            pageSize: this.paginator.pageSize,
            sortBy: this.sort.active,
            sortDirection: this.sort.direction
          };

          return this.taskService.fetchTaskAll(postData).pipe(
            delay(300), // simulate loading
            catchError(err => {
              this.loading = false;
              console.error('Fetch error:', err);
              return of({ data: { items: [], totalCount: 0 } });
            })
          );
        }),
        tap(response => {
          console.log('Response:', response);
        }),
        map((response) => {
          this.loading = false;

          const items = response?.data?.items ?? [];
          const totalCount = response?.data?.totalCount ?? 0;
          this.totalData = totalCount;
          return items;
        })
      )
      .subscribe((data: UserTask[]) => {
        this.dataSource.data = data; // ✅ Do NOT recreate dataSource!
      });
  }
}
