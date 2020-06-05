import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CustomHttpUrlEncodingCodec} from '../encoder';
import {DhcpLease} from '../model/dhcp-lease';
import {DnsNode} from '../model/dns-node';
import {DnsZone} from '../model/dns-zone';
import {KeycloakService} from 'keycloak-angular';

export {DhcpLease} from '../model/dhcp-lease';
export {DnsNode} from '../model/dns-node';
export {DnsZone} from '../model/dns-zone';

@Injectable({
  providedIn: 'root'
})
export class NameServerService {
  private baseUrl = environment.dcConBaseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Add dns zone.
   *
   * @param body The dns zone to add.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  addDnsZone(body: DnsZone, observePart?: 'body', isReportProgress?: boolean): Observable<DnsZone> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling addDnsZone.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    return this.http.post<DnsZone>(`${this.baseUrl}/api/dns/zones`,
      body,
      {
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    );
  }

  /**
   * Delete all dns nodes.
   *
   * @param zoneName The dns zone name.
   * @param nodeNames The dns node names.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  deleteAllDnsNodes(zoneName: string, nodeNames?: Array<string>, observePart?: 'body', isReportProgress?: boolean): Observable<any> {
    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling deleteAllDnsNodes.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (nodeNames) {
      nodeNames.forEach((element) => {
        queryParameters = queryParameters.append('nodeNames', element);
      });
    }
    return this.http.delete<any>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}/nodes/all`,
      {
        params: queryParameters,
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Delete dns node.
   *
   * @param nodeName The dns node name.
   * @param zoneName The dns zone name.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  deleteDnsNode(nodeName: string, zoneName: string, observePart?: 'body', isReportProgress?: boolean): Observable<boolean> {
    if (nodeName === null || nodeName === undefined) {
      throw new Error('Required parameter nodeName was null or undefined when calling deleteDnsNode.');
    }
    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling deleteDnsNode.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http
    .delete<boolean>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}/${encodeURIComponent(String(nodeName))}`,
      {
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Delete dns zone.
   * Delete dns zone.
   * @param zoneName The dns zone name.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  deleteDnsZone(zoneName: string, observePart?: 'body', isReportProgress?: boolean): Observable<boolean> {
    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling deleteDnsZone.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.delete<boolean>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}`,
      {
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Get dhcp leases.
   *
   * @param all &#x27;true&#x27; returns also expired leases, &#x27;false&#x27; only active ones.
   * @param sort The sort order.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  getDhcpLeases(all?: boolean, sort?: string, observePart?: 'body', isReportProgress?: boolean): Observable<Array<DhcpLease>> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (all !== undefined && all !== null) {
      queryParameters = queryParameters.set('all', all ? 'true' : 'false');
    }
    if (sort !== undefined && sort !== null) {
      queryParameters = queryParameters.set('sort', sort);
    }
    return this.http.get<Array<DhcpLease>>(`${this.baseUrl}/api/dns/dhcp-leases`,
      {
        params: queryParameters,
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Get dns node.
   *
   * @param nodeName The dns node name.
   * @param zoneName The dns zone name.
   * @param filter The unknown filter.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  getDnsNode(nodeName: string, zoneName: string, filter?: string, observePart?: 'body', isReportProgress?: boolean): Observable<DnsNode> {
    if (nodeName === null || nodeName === undefined) {
      throw new Error('Required parameter nodeName was null or undefined when calling getDnsNode.');
    }
    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling getDnsNode.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (filter !== undefined && filter !== null) {
      queryParameters = queryParameters.set('filter', filter);
    }
    return this.http
    .get<DnsNode>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}/${encodeURIComponent(String(nodeName))}`,
      {
        params: queryParameters,
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Get all dns nodes of a zone.
   *
   * @param zoneName The dns zone name.
   * @param filter The unknown filter.
   * @param query The query
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  getDnsNodes(
    zoneName: string, filter?: string, query?: string, observePart?: 'body', isReportProgress?: boolean): Observable<Array<DnsNode>> {

    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling getDnsNodes.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (filter !== undefined && filter !== null) {
      queryParameters = queryParameters.set('filter', filter);
    }
    if (query !== undefined && query !== null) {
      queryParameters = queryParameters.set('q', query);
    }
    return this.http.get<Array<DnsNode>>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}`,
      {
        params: queryParameters,
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Get all dns zones.
   *
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  getDnsZones(observePart?: 'body', isReportProgress?: boolean): Observable<Array<DnsZone>> {
    ks: KeycloakService;
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<Array<DnsZone>>(`${this.baseUrl}/api/dns/zones`,
      {
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Simple dns query.
   *
   * @param filter The unknown filter.
   * @param q The query, can be a host name, an IP or a MAC address.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  query(filter?: string, q?: string, observePart?: 'body', isReportProgress?: boolean): Observable<Array<DnsNode>> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (filter !== undefined && filter !== null) {
      queryParameters = queryParameters.set('filter', filter);
    }
    if (q !== undefined && q !== null) {
      queryParameters = queryParameters.set('q', q);
    }
    return this.http.get<Array<DnsNode>>(`${this.baseUrl}/api/dns`,
      {
        params: queryParameters,
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Save dns node.
   *
   * @param zoneName The dns zone name.
   * @param body The dns node to save.
   * @param observePart set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param isReportProgress flag to report request and response progress.
   */
  saveDnsNode(zoneName: string, body: DnsNode, observePart?: 'body', isReportProgress?: boolean): Observable<DnsNode> {
    if (zoneName === null || zoneName === undefined) {
      throw new Error('Required parameter zoneName was null or undefined when calling saveDnsNode.');
    }
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling saveDnsNode.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    return this.http.post<DnsNode>(`${this.baseUrl}/api/dns/zones/${encodeURIComponent(String(zoneName))}`,
      body,
      {
        headers: httpHeaders,
        observe: observePart,
        reportProgress: isReportProgress
      }
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Unexpected response:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
