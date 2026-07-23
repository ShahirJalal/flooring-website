// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      // Check if the user is logged in
      console.log('AuthGuard check'); // Debug log
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn) {
        console.log('Not logged in, redirecting to login'); // Debug log
        this.router.navigate(['/login']);
        return false;
      }

      console.log('Logged in, allowing access'); // Debug log
      return true;
    }

    // Default to false if executed in SSR
    console.log('SSR detected, denying access by default'); // Debug log
    return false;
  }
}
