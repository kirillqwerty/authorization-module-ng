import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { DataToLogin } from '../types/dataToLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

    public loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(64)])
    })

    private readonly unsubscribe$: Subject<void> = new Subject();
    
    public loader = false;
    

    public goToRegistration(): void {
        this.router.navigate(["authorization/registration"]);
    }

    constructor(private router: Router,
        private httpService: HttpService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef) { }

    public signIn(): void {
        if (this.loginForm.valid) {
            this.loader = true;
        }
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
                    this.loader = false;
                    this.router.navigate(["authorization/my-page"]);
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
                    this.cdr.detectChanges()
                    
                },
                error: () => {
                    this.loginForm.setValue({username: "", password: ""});       
                    this.loginForm.markAsUntouched;
                    this.loader = false;         
                    alert("try again");
                    this.cdr.detectChanges();
                }
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
