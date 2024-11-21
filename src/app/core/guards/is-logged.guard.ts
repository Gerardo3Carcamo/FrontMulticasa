import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../share/services/auth.service';
import { RedirectService } from '../../share/services/redirect.service';


export const isLoggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(RedirectService)
  if(auth.getUser() !== null){
    return true;
  }else{
    router.redirectTo('/auth')
    return false;
  }
};
