import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { HttpService } from '../services/http.service';
import { DataToRegistrate } from '../types/dataToRegistrate';
import { passwordValidator, phoneValidator } from '../validators/forms-validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistrationComponent implements OnInit, OnDestroy {

    public registrationForm = new FormGroup({
        email: new FormControl(<string|null> null, [Validators.required, Validators.email]),
        username: new FormControl(<string|null> null, [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl(<string|null> null, [Validators.required, Validators.minLength(8), Validators.maxLength(64), passwordValidator]),
        passwordConf: new FormControl(<string|null> null, [Validators.required]),
        phoneNumber: new FormControl(<string|null>  "+", [Validators.minLength(9), Validators.maxLength(15), phoneValidator])
    })

    private readonly unsubscribe$: Subject<void> = new Subject();

    public differentPasswords = false;

    public loader = false;

    constructor(private httpService: HttpService,
                private router: Router,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.registrationForm.valueChanges  
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                console.log(this.registrationForm.value.password)
                if (this.registrationForm.value.password === this.registrationForm.value.passwordConf) {
                    this.differentPasswords = false;
                } else {
                    this.differentPasswords = true;
                }
            })
    }

    public registrate(): void { 

        this.loader = true;
        
        if (this.registrationForm.valid) {
            let phone = this.registrationForm.value.phoneNumber;
            
            if (phone?.indexOf("+") === 0) {
                phone = phone.substring(1);
                console.log(phone)
            }

            console.log(phone)
            const newUser: DataToRegistrate = {
                email: this.registrationForm.value.email as string,
                username: this.registrationForm.value.username as string,
                password: this.registrationForm.value.password as string,
                phone: phone as string
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
        
        
    }



    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
