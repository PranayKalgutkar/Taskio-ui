import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { BaseService } from '../core/base.service';
import { JsonHeaders, TextHeaders, ResponseType } from '../shared/enums/http-config';
import { ApiPath } from '../shared/constants/api-path';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  createTask(taskData: any): Observable<any> {
    return this.httpPostService(ApiPath.CREATE_TASK, taskData, JsonHeaders, undefined, ResponseType.JSON)
      .pipe(
        map(response => {
          try {
            //const parsedResult = JSON.parse(response);
            //return parsedResult;
            return response;
          } catch (error) {
            console.error('Error parsing JSON:', error);
            throw error;
          }
        })
      );
  }

  fetchTasks(): Observable<any> {
    return this.httpGetService(ApiPath.ALL_TASKS, JsonHeaders, undefined, ResponseType.JSON)
      .pipe(
        map(response => {
          try {
            //const parsedResult = JSON.parse(response);
            //return parsedResult;
            return response;
          } catch (error) {
            console.error('Error parsing JSON:', error);
            throw error;
          }
        })
      );
  }

  fetchTaskAll(filter: any): Observable<any> {
  return this.httpPostService(ApiPath.ALL_TASKS, filter, JsonHeaders)
    .pipe(
      map(response => {
        console.log("task service response", response);
        return typeof response === 'string' ? JSON.parse(response) : response;
      })
    );
}
}
