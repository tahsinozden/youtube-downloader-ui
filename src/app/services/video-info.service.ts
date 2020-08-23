import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {VideoRequest} from '../models/video_request.model';
import {VideoInformationSummary} from '../models/video_information_summary.model';
import {AppSettings} from '../config/app.settings';

@Injectable({
  providedIn: 'root'
})
export class VideoInfoService {

  constructor(private httpClient: HttpClient) {

  }

  getVideoInformation(url: string): Observable<VideoInformationSummary> {
    const apiUrl = `${AppSettings.API_ENDPOINT}/videos/info`;
    const videoRequest = new VideoRequest(url, []);
    console.log(videoRequest);
    return this.httpClient.post<VideoInformationSummary>(apiUrl, videoRequest);
  }

}
