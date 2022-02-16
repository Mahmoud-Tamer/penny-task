import { Injector, EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';
import { LoaderService } from './loader.service';
import { BaseUrl } from '../helpers/base-url.helper';
import { Router, UrlSerializer } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  static changeDetectionEmitter = new EventEmitter();
  private loaderService: LoaderService;
  private httpErrorHandlingService: HttpErrorHandlingService;
  serializer: UrlSerializer;
  router: Router;
  http: HttpClient;

  constructor(public injector: Injector) {
    this.loaderService = injector.get(LoaderService);
    this.httpErrorHandlingService = injector.get(HttpErrorHandlingService);
    this.router = injector.get(Router);
    this.serializer = injector.get(UrlSerializer);
    this.http = injector.get(HttpClient);
  }

  getData(
    url: string,
    params: any = null,
    hideLoader: boolean = true
  ): Observable<any> {
    if (!hideLoader) {
      this.startLoading();
    }
    return this.http
      .get<any>(`${this.baseUrl}/${url}`, params ? { params } : {})
      .pipe(
        map((response: any) => {
          if (!hideLoader) {
            this.stopLoading();
          }
          return response;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  get(
    url: string,
    params: any = null,
    responseType: any = null
  ): Observable<any> {
    this.startLoading();
    return this.http
      .get<any>(
        `${this.baseUrl}/${url}`,
        params ? { params } : responseType ? { responseType } : {}
      )
      .pipe(
        map((response) => {
          this.stopLoading();
          return response as any;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  getWithFullUrl(
    url: string,
    params: any = null,
    responseType: any = null
  ): Observable<any> {
    this.startLoading();
    return this.http
      .get<any>(
        `${url}`,
        params ? { params } : responseType ? { responseType } : {}
      )
      .pipe(
        map((response) => {
          this.stopLoading();
          return response as any;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  post(url: string, model: any): Observable<any> {
    this.startLoading();
    return this.http.post<any>(`${this.baseUrl}/${url}`, model).pipe(
      map((response) => {
        this.stopLoading();
        return response as any;
      }),
      catchError((error) => this.handlingErrors(error))
    );
  }

  purePost<TModel, TResponse>(
    url: string,
    model: TModel
  ): Observable<TResponse> {
    this.startLoading();
    return this.http.post<TResponse>(`${this.baseUrl}/${url}`, model).pipe(
      map((response) => {
        this.stopLoading();
        return response as any;
      })
    );
  }

  postDownloadFile<TModel>(
    url: string,
    model: TModel,
    downloadAnchor: any
  ): Observable<any> {
    this.startLoading();
    const filename = '';
    return this.http
      .post<any>(`${this.baseUrl}/${url}`, model, {
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          this.downloadFile(res, filename, downloadAnchor);
          return res.body;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  getDownloadFile<TModel>(
    url: string,
    model: TModel,
    downloadAnchor: any
  ): Observable<any> {
    this.startLoading();
    const filename = '';
    return this.http
      .get<Blob>(`${this.baseUrl}/${url}`, {
        params: model as any,
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((res: any) => {
          this.downloadFile(res, filename, downloadAnchor);
          return res.body;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  postWithFullUrl(url: string, model: any): Observable<any> {
    this.startLoading();
    return this.http.post<any>(`${url}`, model).pipe(
      map((response) => {
        this.stopLoading();
        return response as any;
      }),
      catchError((error) => this.handlingErrors(error))
    );
  }

  put(url: string, model: any): Observable<any> {
    this.startLoading();
    return this.http.put<any>(`${this.baseUrl}/${url}`, model).pipe(
      map((response) => {
        this.stopLoading();
        return response as any;
      }),
      catchError((error) => this.handlingErrors(error))
    );
  }

  delete(url: string): Observable<any> {
    this.startLoading();
    return this.http.delete(`${this.baseUrl}/${url}`).pipe(
      map((response: any) => {
        this.stopLoading();
        return response as any;
      }),
      catchError((error) => this.handlingErrors(error))
    );
  }

  deleteWithFullUrl(url: string): Observable<any> {
    this.startLoading();
    return this.http.delete(`${url}`).pipe(
      map((response: any) => {
        this.stopLoading();
        return response as any;
      }),
      catchError((error) => this.handlingErrors(error))
    );
  }

  patch(url: string, params: any = null): Observable<any> {
    this.startLoading();
    return this.http
      .patch<any>(`${this.baseUrl}/${url}`, params ? params : null)
      .pipe(
        map((response) => {
          this.stopLoading();
          return response as any;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  purePatch(url: string, params: any = null): Observable<any> {
    this.startLoading();
    return this.http
      .patch<any>(`${this.baseUrl}/${url}`, params ? params : null)
      .pipe(
        map((response) => {
          this.stopLoading();
          return response as any;
        })
      );
  }

  upload(url: string, file: any): Observable<any> {
    this.startLoading();
    const formData = new FormData();

    formData.append('File', file, file.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http
      .post<any>(`${this.baseUrl}/${url}`, formData, { headers })
      .pipe(
        map((response) => {
          this.stopLoading();
          return response as any;
        }),
        catchError((error) => this.handlingErrors(error))
      );
  }

  readFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

  private downloadFile(res: any, fileName: string, downloadAnchor: any): void {
    const contentDispositionHeader: string = res.headers.get(
      'content-disposition'
    );
    const parts: string[] = contentDispositionHeader.split(';');
    fileName = parts[1].split('=')[1].replace(/"/g, '');

    this.stopLoading();
    const blob = res.body as Blob;
  }

  private startLoading(): void {
    this.loaderService.loading = true;
    BaseService.changeDetectionEmitter.emit();
  }
  private stopLoading(): void {
    this.loaderService.loading = false;
    BaseService.changeDetectionEmitter.emit();
  }

  private handlingErrors<T>(error: any): Observable<T> {
    this.stopLoading();
    this.httpErrorHandlingService.handleAsObservable(error);
    return of();
  }

  get baseUrl(): string {
    return `${BaseUrl()}${environment.base_api_route}`;
    // return `${BaseUrl()}${this.languageService.language}`;
  }
}
