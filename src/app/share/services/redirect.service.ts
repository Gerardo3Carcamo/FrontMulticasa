import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) {}

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }
  redirectToWithParams(path: string, params: any) {
    this.router.navigate([path], { queryParams: params });
  }
}
