import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestErrorService {

  private baseUrl = environment.dcConBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get password information of the domain controller.
   */
  testError(): Observable<any> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<any>(`${this.baseUrl}/api/error`, {
      headers: httpHeaders
    });
  }

}
