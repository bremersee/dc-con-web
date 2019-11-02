import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CustomHttpUrlEncodingCodec} from '../encoder';
import {DomainGroup} from '../model/domain-group';

export {DomainGroup} from '../model/domain-group';

@Injectable({
  providedIn: 'root'
})
export class DomainGroupService {
  private baseUrl = environment.dcConBaseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Add domain group.
   *
   * @param body The domain group to add.
   */
  addGroup(body: DomainGroup): Observable<DomainGroup> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling addGroup.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    return this.http.post<DomainGroup>(`${this.baseUrl}/api/groups`, body, {
      headers: httpHeaders
    });
  }

  /**
   * Delete domain group.
   *
   * @param groupName The domain group name.
   */
  deleteGroup(groupName: string): Observable<boolean> {
    if (groupName === null || groupName === undefined) {
      throw new Error('Required parameter groupName was null or undefined when calling deleteGroup.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.delete<boolean>(`${this.baseUrl}/api/groups/${encodeURIComponent(String(groupName))}`, {
      headers: httpHeaders
    });
  }

  /**
   * Get a domain group by name.
   *
   * @param groupName The domain group name.
   */
  getGroupByName(groupName: string): Observable<DomainGroup> {
    if (groupName === null || groupName === undefined) {
      throw new Error('Required parameter groupName was null or undefined when calling getGroupByName.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<DomainGroup>(`${this.baseUrl}/api/groups/${encodeURIComponent(String(groupName))}`, {
      headers: httpHeaders
    });
  }

  /**
   * Get all domain memberships.
   *
   * @param sort The sort order.
   * @param query The query
   */
  getGroups(sort?: string, query?: string): Observable<Array<DomainGroup>> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (sort !== undefined && sort !== null) {
      queryParameters = queryParameters.set('sort', sort);
    }
    if (query !== undefined && query !== null) {
      queryParameters = queryParameters.set('q', query);
    }
    return this.http.get<Array<DomainGroup>>(`${this.baseUrl}/api/groups`,
      {
        headers: httpHeaders,
        params: queryParameters
      }
    );
  }

  /**
   * Checks whether a domain group exists.
   *
   * @param groupName The name of the domain group.
   */
  groupExists(groupName: string): Observable<boolean> {
    if (groupName === null || groupName === undefined) {
      throw new Error('Required parameter groupName was null or undefined when calling groupExists.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<boolean>(`${this.baseUrl}/api/groups/${encodeURIComponent(String(groupName))}/exists`, {
      headers: httpHeaders
    });
  }

  /**
   * Updates a domain group.
   *
   * @param body The domain group.
   * @param groupName The name of the domain group.
   */
  updateGroup(body: DomainGroup, groupName: string): Observable<DomainGroup> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateGroup.');
    }
    if (groupName === null || groupName === undefined) {
      throw new Error('Required parameter groupName was null or undefined when calling updateGroup.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    return this.http.put<DomainGroup>(`${this.baseUrl}/api/groups/${encodeURIComponent(String(groupName))}`, body, {
      headers: httpHeaders
    });
  }

}
