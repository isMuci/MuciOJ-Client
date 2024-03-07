import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private cookieSer: CookieService
  ) { }

  get(api: string) {
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  getHasData(api: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.get(api, {
        params: data,
      }).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  post(api: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(api, data,).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
