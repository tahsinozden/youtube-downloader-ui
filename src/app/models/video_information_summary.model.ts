import {VideoFormat} from './video_format.model';

export interface VideoInformationSummary {
  url: string;
  name: string;
  channelId: string;
  formats: VideoFormat[];
}
