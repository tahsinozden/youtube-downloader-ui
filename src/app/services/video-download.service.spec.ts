import { TestBed } from '@angular/core/testing';

import { VideoDownloadService } from './video-download.service';

describe('VideoDownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoDownloadService = TestBed.get(VideoDownloadService);
    expect(service).toBeTruthy();
  });
});
