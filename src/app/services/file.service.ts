import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  saveFile(blob: any, fileName: string) {
    FileSaver.saveAs(blob, fileName);
  }
}
