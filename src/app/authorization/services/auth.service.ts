import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private _token = "";
      
    public get token(): string {
        return this._token;
    }

    public set token(token: string){
        this._token = token;
    }
}
