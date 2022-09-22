import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "../types/dataToLogin";
import { Observable } from "rxjs";
import { User } from "../types/user";
import { DataToRegistrate } from "../types/dataToRegistrate";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    public signIn(user: DataToLogin): Observable<User> {

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post<User>("https://dummyjson.com/auth/login", body);
    }

    public registrate(newUser: DataToRegistrate): Observable<User> {

        const body = {
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            phone: newUser.phone
        }

        return this.http.post<User>("https://dummyjson.com/users/add", body);

    }
}
