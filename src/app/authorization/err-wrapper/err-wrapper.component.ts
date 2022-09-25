import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { passwordMatch, passwordValidator, phoneValidator } from "../validators/forms-validator";

@Component({
    selector: "app-err-wrapper",
    templateUrl: "./err-wrapper.component.html",
    styleUrls: ["./err-wrapper.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrWrapperComponent implements OnInit, OnDestroy {

    @Input() public control?: FormControl|FormArray|FormGroup;

    @Input() public path?: string;

    public emptyInput = false;

    public incorrectEmail = false;

    public incorrectPassword = false; 

    public passwordUnmatch = false;

    public minLength = null;
    
    public maxLength = null;

    public incorrectPhoneNumber = false;

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private cdr: ChangeDetectorRef) { }
 
    // private get myControl(): any {
    //     return this.control?.get(`${this.path}`);
    // }

    public ngOnInit(): void {
        // this.control?.valueChanges
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(() => {
        //         this.checkLength();    

        //         if (this.control?.get(`${this.path}`)?.hasValidator(Validators.required)) {
        //             this.checkRequired();
        //         }
                            
        //         if (this.control?.get(`${this.path}`)?.hasValidator(Validators.required)) {
        //             this.checkEmail();
        //         }

        //         if (this.control?.get(`${this.path}`)?.hasValidator(passwordValidator)) {
        //             this.checkPassword();
        //             this.checkLength();    
        //         }

        //         if (this.control?.get(`${this.path}`)?.hasValidator(passwordMatch)) {
        //             this.checkPasswordMatch();
        //         }
                
        //         if (this.control?.get(`${this.path}`)?.hasValidator(phoneValidator)) {
        //             this.checkPhoneNumber();
        //         }

        //         this.checkLength();
        //         this.checkRequired();
        //         this.checkEmail();
        //         this.checkPassword();
        //         this.checkPasswordMatch();
        //         this.checkPhoneNumber();
        //         console.log(this.control?.get(`${this.path}`));

        //     })
        this.control?.get(`${this.path}`)?.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() =>{
                this.checkLength();    
                if (this.control?.get(`${this.path}`)?.hasValidator(Validators.required)) {
                    this.checkRequired();
                }
                            
                if (this.control?.get(`${this.path}`)?.hasValidator(Validators.required)) {
                    this.checkEmail();
                }

                if (this.control?.get(`${this.path}`)?.hasValidator(passwordValidator)) {
                    this.checkPassword();
                    this.checkLength();    
                }

                if (this.control?.get(`${this.path}`)?.hasValidator(passwordMatch)) {
                    this.checkPasswordMatch();
                }
                
                if (this.control?.get(`${this.path}`)?.hasValidator(phoneValidator)) {
                    this.checkPhoneNumber();
                }
            })
    }

    public checkRequired(): void {
        if (this.control?.get(`${this.path}`)?.errors?.["required"] &&
        this.control?.get(`${this.path}`)?.touched) {
            this.emptyInput = true;
        } else {
            this.emptyInput = false;
        }
        this.cdr.detectChanges();
    }

    public checkLength(): void {
        if (this.control?.get(`${this.path}`)?.errors?.["minlength"] &&
            this.control?.get(`${this.path}`)?.touched) {
            this.minLength = this.control?.get(`${this.path}`)?.errors?.["minlength"].requiredLength;
        } else {
            this.minLength = null;
        }

        if (this.control?.get(`${this.path}`)?.errors?.["maxlength"] &&
            this.control?.get(`${this.path}`)?.touched){  
            this.maxLength = this.control?.get(`${this.path}`)?.errors?.["maxlength"].requiredLength;
        } else {
            this.maxLength = null;
        }
        this.cdr.detectChanges();
    }

    public checkEmail(): void {
        if (this.control?.get(`${this.path}`)?.errors?.["email"] &&
            this.control?.get(`${this.path}`)?.touched) {
            this.incorrectEmail = true;
        } else {
            this.incorrectEmail = false;
        }
        this.cdr.detectChanges();
    }

    public checkPassword(): void {
        if (!this.control?.get(`${this.path}`)?.errors?.["required"] &&
            !this.control?.get(`${this.path}`)?.errors?.["minlength"] &&
            !this.control?.get(`${this.path}`)?.errors?.["maxlength"] &&
            this.control?.get(`${this.path}`)?.errors?.["passwordError"] &&
            this.control?.get(`${this.path}`)?.touched) {
            this.incorrectPassword = true;
        } else {
            this.incorrectPassword = false;
        }
        this.cdr.detectChanges();
    }

    public checkPasswordMatch(): void {
        if (!this.control?.get(`${this.path}`)?.errors?.["required"] &&
            this.control?.get(`${this.path}`)?.touched &&
            this.control?.get(`${this.path}`)?.errors?.["passwordMatchError"]) {
            this.passwordUnmatch = true;
        } else {
            this.passwordUnmatch = false;
        }
        this.cdr.detectChanges();
    }

    public checkPhoneNumber(): void {
        if (!this.control?.get(`${this.path}`)?.errors?.["minlength"] &&
            !this.control?.get(`${this.path}`)?.errors?.["maxlength"] &&
            this.control?.get(`${this.path}`)?.errors?.["phoneError"] &&
            this.control?.get(`${this.path}`)?.touched) {
            this.incorrectPhoneNumber = true;
        } else {
            this.incorrectPhoneNumber = false;
        }
        this.cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
