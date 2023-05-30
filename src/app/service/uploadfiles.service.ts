import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  checkFileWasExitsted(event: any, files: any[]) {
    if (event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) {
        if (files.length === 0) {
          return 1;
        }
        else {
          for (var j = 0; j < files.length; j++) {
            if (files[j].name === event.target.files[i].name) {
              return 2;
            }
          }
        }
      }
      return 1;
    } else
    return 1
  }

  deleteFileAttacth(files: Array<any>, index: number) {
    for (var i = files.length - 1; i >= 0; i--) {
      if (index == i) {
        files.splice(i, 1);
      }
    }
    return files;
  }
}
