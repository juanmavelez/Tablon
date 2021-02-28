import { Injectable, Inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly documentIsAccessible: boolean;
  private cookieStorage: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>
  ) {
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }

  getCookie(): string {
    return this.document.cookies;
  }

  deleteCookie(): void {
    this.document.cookies = '';
  }
}
