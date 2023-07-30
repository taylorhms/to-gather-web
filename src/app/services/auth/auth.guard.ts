import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

let router: Router;

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = AuthService.tokenValue || true; // true for testing only
  if (currentUser) {
      return true;
  }
  if (!router) {
    router = new Router();
  }
  router.navigate(['/home']);
  return false;
};
