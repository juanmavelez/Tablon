import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root',
})
export class GravatarService {
  constructor() {}
  /*
   1 Trim leading and trailing whitespace from an email address
   2 Force all characters to lower-case
   3 md5 hash the final string
*/
  createGravatarUrl(email: string): string {
    if (!email) {
      return '';
    } else {
      const base = 'https://gravatar.com/avatar';
      const formattedEmail = email.toString().trim().toLowerCase();
      /*  encoding solves theproblem with the '@' character  */
      const hash = Md5.hashStr(formattedEmail);
      return `${base}/${hash}?d=retro`;
    }
  }
}
