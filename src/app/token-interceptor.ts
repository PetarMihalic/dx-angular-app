import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, withInterceptors } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./shared/services";

@Injectable({providedIn:'root'})
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = this.authService.userValue;
        if(user){
            req = req.clone({
                setParams: {
                    sessionId: user.sessionId
                }
            })
        }
        return next.handle(req);
    }
}