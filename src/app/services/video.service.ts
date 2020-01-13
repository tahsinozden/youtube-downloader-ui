import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class VideoService {


    constructor(private httpClient: HttpClient) {
    }

    downloadVideo(videoId) {
        return this.httpClient.get(`http://localhost:8080/api/v1/videos/${videoId}/download?formatIds=`);
    }

}
