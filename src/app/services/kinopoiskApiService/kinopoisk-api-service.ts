import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Film } from '../../models/film/film';

@Injectable({
  providedIn: 'root'
})
export class KinopoiskApiService {
  private readonly httpClient = inject(HttpClient);
  public apiHost = 'assets/films.json';

  get(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.apiHost, {
      withCredentials: true
    }).pipe(
      timeout(10000),
      retry(1),
      catchError((error: unknown) => {
        let message = 'Неизвестная ошибка';

        if (error instanceof TimeoutError) {
          message = 'Превышено время ожидания ответа сервера';
        } else if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ProgressEvent) {
            message = 'Сетевая ошибка. Проверьте подключение к интернету.';
          } else if (error.status) {
            message = `Ошибка сервера ${error.status}${error.statusText ? `: ${error.statusText}` : ''}`;
            const backendMessage = typeof error.error === 'string'
              ? error.error
              : error.error?.message;
            if (backendMessage) {
              message += ` — ${backendMessage}`;
            }
          }
        }

        return throwError(() => ({ message, original: error }));
      })
    );
  }
}
