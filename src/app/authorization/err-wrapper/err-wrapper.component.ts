import { Component, OnInit, Input, OnDestroy, Inject} from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { errorInfo } from "../injectionTokenSettings/errorInfo";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/errors.token";
import { defaultErrors } from "../validators/defaultErrors";

@Component({
    selector: "app-err-wrapper",
    templateUrl: "./err-wrapper.component.html",
    styleUrls: ["./err-wrapper.component.scss"]
})
export class ErrWrapperComponent implements OnInit, OnDestroy {

    @Input() public control?: AbstractControl|FormArray|FormGroup|null;
    
    @Input() public path?: string;

    @Input() public outputByOne = false;

    public myControl?: FormControl|FormGroup;

    public errors: errorInfo[] = [];

    public currentErrorText: string[] = [];

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(@Inject(FORMS_VALIDATION_ERRORS) private _myErrors: errorInfo[]) {}

    public ngOnInit(): void {

        if (this.control instanceof FormGroup && this.path) {
            this.myControl = this.control.get(`${this.path}`) as FormControl;
        } else if (this.control instanceof FormControl) {
            this.myControl = this.control;
        } else if(this.control instanceof FormGroup && !this.path) {
            console.log("Path needed");
        }        

        this.errors = [...this._myErrors, ...defaultErrors];

        this.myControl?.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.setCurrentErrorText();
            })


        this.control?.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                if (this.myControl?.touched) {
                this.setCurrentErrorText();
                }
            })    
    }

    public controlInvalid(): boolean{
        return this.myControl?.invalid as boolean;
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private setCurrentErrorText(): void{
        for (const error in this.myControl?.errors) {
            if (this.outputByOne){
                this.currentErrorText[0] = this.errors.find(element => element.errorName === error)?.errorText(this.myControl?.errors as ValidationErrors) as string;
                break;
            } else if (!this.currentErrorText.includes(this.errors.find(element => element.errorName === error)?.errorText(this.myControl?.errors as ValidationErrors) as string)){
                this.currentErrorText.push(this.errors.find(element => element.errorName === error)?.errorText(this.myControl?.errors as ValidationErrors) as string);
            }
        }
    }
}