import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/errors.token";
import { HttpService } from "../services/http.service";
import { DataToRegistrate } from "../types/dataToRegistrate";
import { passwordMatch, passwordValidator, phoneValidator } from "../validators/forms-validator";
import { getFormValidationErrors } from "../validators/get-form-validation-errors";

@Component({
    selector: "app-registration",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"],
    providers: [{
        provide: FORMS_VALIDATION_ERRORS,
        useValue: [
            "passwordError",
            "phoneError",
            "passwordMatchError",
        ]   
    }], 
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistrationComponent implements OnInit, OnDestroy {

    public registrationForm = new FormGroup({
        email: new FormControl(<string|null> null, [Validators.required, Validators.email]),
        username: new FormControl(<string|null> null, [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl(<string|null> null, [Validators.required, Validators.minLength(8), Validators.maxLength(64), passwordValidator]),
        passwordConf: new FormControl(<string|null> null, [Validators.required, passwordMatch]),
        phoneNumber: new FormControl(<string|null> null, [Validators.minLength(9), Validators.maxLength(15), phoneValidator]),
    })

    // public fb = new FormBuilder;

    // public registrationForm = this.fb.group({
    //     "email": ["", Validators.compose([Validators.required, Validators.email])],
    //     "username": ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(64)])],
    //     "password": ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(64), passwordValidator])],
    //     "passwordConf": ["", Validators.compose([Validators.required, passwordMatch])],
    //     "phoneNumber": ["", Validators.compose([Validators.minLength(9), Validators.maxLength(15), phoneValidator])],
    // })

    public loader = false;
    
    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(
                private httpService: HttpService,
                private router: Router,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {  

        // const val = this.registrationForm.controls["password"]?.validator?.("" as any);
        // console.log(val);

        this.registrationForm.valueChanges  
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(() => {
                    console.log(this.registrationForm.controls);
                    // console.log(getFormValidationErrors(this.registrationForm.controls))

                })
        }

    public registrate(): void { 
            
        if (this.registrationForm.valid) {
            this.loader = true;
            console.log(this.registrationForm);
            const newUser: DataToRegistrate = {
                email: this.registrationForm.value.email as string,
                username: this.registrationForm.value.username as string,
                password: this.registrationForm.value.password as string,
                phone: this.registrationForm.value.phoneNumber as string
            }

            this.httpService.registrate(newUser)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe({
                    next: (data) => {
                        console.log(data);
                        this.router.navigate(["authorization/my-page"]);
                        this.loader = false;
                        this.cdr.detectChanges()
                    },
                    error: () => {
                        console.log("error");
                        this.loader = false;
                        this.cdr.detectChanges()
                    }
                }) 
        }
        else {
            this.registrationForm.markAllAsTouched();
        }
        console.log(this.registrationForm);
        this.cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
