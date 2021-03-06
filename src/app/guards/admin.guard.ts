import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

const ApiUrl = 'https://gifthubapi20180117092302.azurewebsites.net/api/Account/adminCheck';

@Injectable()
export class AdminGuard implements CanActivate {


    constructor(private http: HttpClient, private router: Router) { }

    canActivate() {
        return this.http.get(`${ApiUrl}`).map(isAdmin => {
            if (!isAdmin) {
                this.router.navigate(['/user']);
                return false;
            }
            return true;
        });
    }

}
