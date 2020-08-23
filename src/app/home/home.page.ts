import {Component} from '@angular/core';
import {VideoDownloadService} from '../services/video-download.service';
import {FileService} from '../services/file.service';
import {VideoInfoService} from '../services/video-info.service';
import {VideoInformationSummary} from '../models/video_information_summary.model';
import {AlertService} from '../utils/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private videoDownloadService: VideoDownloadService, private fileService: FileService,
              private videoInfoService: VideoInfoService, private alertService: AlertService) {
  }

  formatId = '22';
  videoUrl = '';
  videoName = '';
  videoInformationSummary: VideoInformationSummary;
  checkBoxByFormatId = new Map([]);
  isLoading = false;

  async downloadVideo() {
    this.checkVideoUrl();
    const formatIds = [];
    this.checkBoxByFormatId.forEach((value, key) => {
      if (value) {
        formatIds.push(key);
      }
    });
    console.log(`Selected formats: ${formatIds}`);
    let videoName = this.videoName;
    this.isLoading = true;
    if (!videoName) {
      const videoInformation = await this.videoInfoService.getVideoInformation(this.videoUrl).toPromise()
          .catch(reason => {
            console.log(reason);
            this.alertService.showAlert('Error', '', reason.error.message);
            throw new Error(reason);
          })
          .finally(() => {
            this.isLoading = false;
          });
      videoName = videoInformation.name;
    }

    this.videoDownloadService.downloadVideo(this.videoUrl, formatIds).subscribe(data => {
          console.log(data);
          const name = videoName != null ? videoName : 'new_file.mp4';
          this.fileService.saveFile(data, name);
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        });
  }

  getVideoInformation() {
    this.checkVideoUrl();
    this.isLoading = true;
    this.checkBoxByFormatId = new Map();
    this.videoInfoService.getVideoInformation(this.videoUrl).subscribe(data => {
          this.isLoading = false;
          this.videoInformationSummary = data;
          this.videoName = this.videoInformationSummary.name;
          data.formats.forEach(videoFormat => {
            this.checkBoxByFormatId.set(videoFormat.formatId, false);
          });
        },
        error => {
          console.error(error);
          this.isLoading = false;
          const root = error.error;
          this.alertService.showAlert('Error', '', root.message);
        });
  }

  checkVideoUrl() {
    if (!this.videoUrl) {
      this.alertService.showAlert('Error', '', 'Video URL cannot be empty');
      throw new Error('Video URL cannot be empty');
    }
  }

  onCheckBoxChange(event: CustomEvent, formatId: string) {
    this.checkBoxByFormatId.set(formatId, event.detail.checked);
    console.log(this.checkBoxByFormatId);
  }

  fileSizeInMb(sizeInBytes: number): string {
    const sizeInMb = sizeInBytes / (1024 * 1024);
    return sizeInMb.toFixed(2);
  }

  onVideoInfoCloseClick() {
    this.videoInformationSummary = null;
  }

  onVideoUrlChange() {
    this.videoInformationSummary = null;
    this.videoName = null;
  }
}
