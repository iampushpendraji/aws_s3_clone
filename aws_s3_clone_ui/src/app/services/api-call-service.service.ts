import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallServiceService {
  api_url: string = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  createBucket(obj: { bucket_name: string, bucket_description?: string }): Observable<any> {
    return this._http.post<any>(`${this.api_url}/create-bucket`, obj);
  }

  createObject(obj: any): Observable<any> {
    return this._http.post<any>(`${this.api_url}/insert-object`, obj);
  }

  createFolder(obj: { bucket_id: number, relation_id: number, folder_name: string }): Observable<any> {
    return this._http.post<any>(`${this.api_url}/insert-folder`, obj);
  }

  get getBuckets(): Observable<any> {
    return this._http.get<any>(`${this.api_url}/get-buckets`);
  }

  getBucketInfo(obj: { bucket_id: number, relation_id: number }): Observable<any> {
    return this._http.get<any>(`${this.api_url}/get-objects`, { params: obj });
  }

  getObjectById(obj: { object_id: number, bucket_id: number, relation_id: number }): Observable<any> {
    return this._http.get<any>(`${this.api_url}/get-objects-by-id`, { params: obj });
  }

}
