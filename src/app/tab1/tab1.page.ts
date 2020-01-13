import {Component} from '@angular/core';
import {VideoService} from '../services/video.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    videoUrl: string = "";

    constructor(private videoService: VideoService) {
    }

    onDownloadClick(videoUrl: string) {
        console.log('clicked');
        const videoId = videoUrl.split('v=')[1];
        this.videoService.downloadVideo(videoId).subscribe(data => {
            console.log(data);
        });
    }
}
