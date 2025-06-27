import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected http!: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  httpGetService(url: string, headers: HttpHeaders, params?: HttpParams, responseType: 'json' | 'text' | 'blob' = 'json'): Observable<any> {
    const options: any = {
      headers: headers,
      params: params,
      responseType: responseType
    };

    return this.http.get(url, options);
  }

  httpPostService(url: string, data: any, headers: HttpHeaders, params?: HttpParams, responseType: 'json' | 'text' | 'blob' = 'json'): Observable<any> {
    const options: any = {
      headers: headers,
      params: params,
      responseType: responseType
    };

    return this.http.post(url, data, options);
  }

  httpPutService(url: string, data: any, headers: HttpHeaders, params?: HttpParams, responseType: 'json' | 'text' | 'blob' = 'json'): Observable<any> {
    const options: any = {
      headers: headers,
      params: params,
      responseType: responseType
    };

    return this.http.put(url, data, options);
  }
}
