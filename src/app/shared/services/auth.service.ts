import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';

export interface IUser {
  email: string;
  avatarUrl?: string;
  responseBody?: any;
}

const defaultPath = '/';
const defaultUser = {
  //JSON.parse(window.localStorage.getItem('user')!).user.email || 
  email: 'Guest',
  avatarUrl: 'https://a.thumbs.redditmedia.com/DL8hdUNeqBh11qFyzYqAFECLnjRo4HAldONG9B-7-Y8.jpg'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  public userValue : any;
  get loggedIn(): boolean {
    if (this.userValue != undefined) {
      return true;
    }
    var storageUser = window.localStorage.getItem('user');
    if (storageUser) {
      try {
        this.userValue = JSON.parse(storageUser);
        defaultUser.email = this.userValue.user.email;
        return true
      } catch (e) {
        window.localStorage.removeItem('user');
      }
    }
    return false;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  logIn(email: string, password: string) {
    const loginData = {
      username: email,
      password: password
    };

    return lastValueFrom(this.http.post('https://ocdev.chaos.hr/api/users/login',loginData, {observe: 'response', withCredentials: true }))
      .then((response: HttpResponse<any>) => {
        if (response.status === 200) {
          const responseBody = response.body;
          this.cookieService.set('PHPSESSID', responseBody.sessionId, undefined, '/', 'localhost', true, 'None');
          this._user = { ...defaultUser, email, responseBody };
          this.userValue = responseBody;
          window.localStorage.setItem('user', JSON.stringify(responseBody));
          this.router.navigate([this._lastAuthenticatedPath]);
          return {
            isOk: true,
            data: responseBody
          };
        } else {
          return {
            isOk: false,
            message: 'asdas'
          };
        }
        }).catch((error: any) => {
          return {
            isOk: false,
            message: error.error.errors.username._invalid
          };
        });

    /*
    return this.http.post('https://ocdev.chaos.hr/api/users/login', loginData, { observe: 'response',  withCredentials: true }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          const responseBody = response.body;
          //this.cookieService.set('PHPSESSID', responseBody.sessionId);
          this.cookieService.set('PHPSESSID', responseBody.sessionId, undefined, '/', 'localhost', true, 'None');
          //this.cookieService.set('PHPSESSID', responseBody.sessionId, undefined, '/api/', 'ocdev.chaos.hr', true, 'None');
          this._user = { ...defaultUser, email, responseBody };
          this.userValue = responseBody;
          window.localStorage.setItem('user', JSON.stringify(responseBody));
          this.router.navigate([this._lastAuthenticatedPath]);
          return {
            isOk: true,
            data: responseBody
          };
        } else {
          return {
            isOk: false,
            message: response.body.errors.username._invalid
          };
        }
      })
    );*/
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
    /*
    if (this.userValue != undefined) {
      return this.userValue;
    }
    var storageUser = window.localStorage.getItem('user');
    if (storageUser) {
      try {
        this.userValue = JSON.parse(storageUser);
        return this.userValue
      } catch (e) {
        window.localStorage.removeItem('user');
      }
    }*/
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.http.post('https://ocdev.chaos.hr/api/users/logout', {}, {withCredentials: true});
    this._user = null;
    this.userValue = undefined;
    window.localStorage.removeItem('user');
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
