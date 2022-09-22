import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";
import { DataToLogin } from "../types/dataToLogin";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

    public loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(64)])
    })

    public loader = false;

    private readonly unsubscribe$: Subject<void> = new Subject();
    
    constructor(private router: Router,
        private httpService: HttpService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef) { }

    public goToRegistration(): void {
        this.router.navigate(["authorization/registration"]);
    }

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
                    this.cdr.detectChanges()

                },
                error: () => {
                    this.loginForm.setValue({username: "", password: ""});       
                    // this.loginForm.markAsUntouched();
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
