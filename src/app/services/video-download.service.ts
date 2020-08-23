import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../config/app.settings';

@Injectable({
  providedIn: 'root'
})
export class VideoDownloadService {

  constructor(private httpClient: HttpClient) { }

  downloadVideo(url: string, formatIds: string[]): Observable<Blob> {
    const apiUrl = `${AppSettings.API_ENDPOINT}/videos/download`;
    const params = new HttpParams()
        .set('url', url)
        .set('formatIds', formatIds.toString());
    return this.httpClient.get<Blob>(apiUrl, {params, responseType: 'blob' as 'json'});
  }
}
