import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { DataToLogin } from '../types/dataToLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

    public loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.minLength(64)])
    })

    private readonly unsubscribe$: Subject<void> = new Subject();
    
    public goToRegistration(): void {
        this.router.navigate(["authorization/registration"]);
    }

    constructor(private router: Router,
        private httpService: HttpService,
        private authService: AuthService) { }

    public signIn(): void {
        const user: DataToLogin = {
            username: this.loginForm.value.username as string,
            password: this.loginForm.value.password as string
        }

        this.httpService.signIn(user)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (data) => {    
                    this.authService.token = data.token;
                    console.log(data);
                    // this.authService.token = data.token;

                    // this.httpService.getTodosById(data.id)
                    //     .pipe(takeUntil(this.unsubscribe$))
                    //     .subscribe({
                    //         next: (data) => {
                    //             for (const todo of data.todos) {
                    //                 todo.usermade = false;
                    //             }
                    //             this.userData.currentTodos = data.todos;
                    //             console.log(this.userData.currentTodos);
                    //             this.loading = false;
                    //             this.router.navigate(["todo/todos"]);
                    //         }
                    //     });

                },
                error: () => {
                    this.loginForm.setValue({username: "", password: ""});                
                    alert("try again");
                    // this.loading = false;
                }
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
