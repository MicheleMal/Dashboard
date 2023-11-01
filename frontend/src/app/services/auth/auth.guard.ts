import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = ()=>{
  // const isAuthenticated = inject(AuthService).isAuthenticated
  const token = inject(AuthService).getToken()

  if(token){
    return true
  }else{
    const router = inject(Router)
    router.navigate(["/signin"])
    return false
  }
}
