import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { MyValidationErrors } from "../injectionTokenSettings/injectionTokenValue";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/valdation-errors-injection-token";
import { defaultErrors } from "../validators/defaultErrors";

@Component({
    selector: "app-err-wrapper",
    templateUrl: "./err-wrapper.component.html",
    styleUrls: ["./err-wrapper.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrWrapperComponent implements OnInit, OnDestroy {

    @Input() public control?: FormControl|FormArray|FormGroup;
    
    @Input() public path?: string;

    public myControl?: FormControl;

    public errors: string[] = [];

    public errorText = "";

    public emptyInput = false;

    public incorrectEmail = false;

    public incorrectPassword = false; 

    public passwordUnmatch = false;

    public minLength = null;
    
    public maxLength = null;

    public incorrectPhoneNumber = false;

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(@Inject(FORMS_VALIDATION_ERRORS) private _myErrors: MyValidationErrors,
        private cdr: ChangeDetectorRef) { }
 
    // private get myControl(): any {
    //     return this.myControl;
    // }

    public ngOnInit(): void {

        if (this.control instanceof FormGroup && this.path) {
            this.myControl = this.control.get(`${this.path}`) as FormControl;
        } else if (this.control instanceof FormControl) {
            this.myControl = this.control;
        }

        this.errors = this._myErrors.value.concat(defaultErrors);
        console.log(this.errors);
        
    
        // this.control?.valueChanges
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(() => {
        //         this.checkLength();
        //         this.checkRequired();
        //         this.checkEmail();
        //         this.checkPassword();
        //         this.checkPasswordMatch();
        //         this.checkPhoneNumber();
        //     })

        this.myControl?.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                for (const error of this.errors) {
                    if (this.myControl?.errors?.[`${error}`] &&
                    this.myControl?.touched) {
                        console.log(this.path + " " + error);
                        this.errorText = this.path + " " + error;
                    }
                    // else this.errorText = "";
                }
                this.cdr.detectChanges()
            })
    }
    
    public controlInvalid(): boolean{
        return this.myControl?.invalid as boolean;
    }

    // public checkRequired(): void {
    //     if (this.myControl?.errors?.["required"] &&
    //     this.myControl?.touched) {
    //         this.emptyInput = true;
    //     } else {
    //         this.emptyInput = false;
    //     }
    //     this.cdr.detectChanges();
    // }

    // public checkLength(): void {
    //     if (this.myControl?.errors?.["minlength"] &&
    //         this.myControl?.touched) {
    //         this.minLength = this.myControl?.errors?.["minlength"].requiredLength;
    //     } else {
    //         this.minLength = null;
    //     }

    //     if (this.myControl?.errors?.["maxlength"] &&
    //         this.myControl?.touched){  
    //         this.maxLength = this.myControl?.errors?.["maxlength"].requiredLength;
    //     } else {
    //         this.maxLength = null;
    //     }
    //     this.cdr.detectChanges();
    // }

    // public checkEmail(): void {
    //     if (this.myControl?.errors?.["email"] &&
    //         this.myControl?.touched) {
    //         this.incorrectEmail = true;
    //     } else {
    //         this.incorrectEmail = false;
    //     }
    //     this.cdr.detectChanges();
    // }

    // public checkPassword(): void {
    //     if (!this.myControl?.errors?.["required"] &&
    //         !this.myControl?.errors?.["minlength"] &&
    //         !this.myControl?.errors?.["maxlength"] &&
    //         this.myControl?.errors?.["passwordError"] &&
    //         this.myControl?.touched) {
    //         this.incorrectPassword = true;
    //     } else {
    //         this.incorrectPassword = false;
    //     }
    //     this.cdr.detectChanges();
    // }

    // public checkPasswordMatch(): void {
    //     if (!this.myControl?.errors?.["required"] &&
    //         this.myControl?.touched &&
    //         this.myControl?.errors?.["passwordMatchError"]) {
    //         this.passwordUnmatch = true;
    //     } else {
    //         this.passwordUnmatch = false;
    //     }
    //     this.cdr.detectChanges();
    // }

    // public checkPhoneNumber(): void {
    //     if (!this.myControl?.errors?.["minlength"] &&
    //         !this.myControl?.errors?.["maxlength"] &&
    //         this.myControl?.errors?.["phoneError"] &&
    //         this.myControl?.touched) {
    //         this.incorrectPhoneNumber = true;
    //     } else {
    //         this.incorrectPhoneNumber = false;
    //     }
    //     this.cdr.detectChanges();
    // }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
