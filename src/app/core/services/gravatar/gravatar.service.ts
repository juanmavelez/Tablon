import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root',
})
export class GravatarService {
  constructor() {}

  gravatar(email: string): string {
    const base = 'https://gravatar.com/avatar';
    const formattedEmail = email.trim().toLowerCase();

    /*  encoding solves theproblem with the '@' character  */
    const hash = Md5.hashStr(formattedEmail);
    return `${base} + ${hash}`;
  }
}
