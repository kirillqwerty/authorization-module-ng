import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { HttpService } from '../services/http.service';
import { DataToRegistrate } from '../types/dataToRegistrate';
import { passwordValidator } from '../validators/forms-validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit, OnDestroy {

    public registrationForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(64), passwordValidator]),
        passwordConf: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [Validators.minLength(9), Validators.maxLength(15)])
    })

    private readonly unsubscribe$: Subject<void> = new Subject();

    public differentPasswords = false;

    constructor(private httpService: HttpService) { }

    public registrate(): void { 

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
                },
                
                error: () => {
                    console.log("error");
                }
            })
        
    }

    public ngOnInit(): void {
        this.registrationForm.valueChanges  
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                if (this.registrationForm.value.password === this.registrationForm.value.passwordConf) {
                    this.differentPasswords = false;
                } else {
                    this.differentPasswords = true;
                }
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
