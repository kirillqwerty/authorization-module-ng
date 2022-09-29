import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject} from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/errors.token";
import { defaultErrors } from "../validators/defaultErrors";
import { getErrorMessage } from "../validators/getErrorMessage";

@Component({
    selector: "app-err-wrapper",
    templateUrl: "./err-wrapper.component.html",
    styleUrls: ["./err-wrapper.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrWrapperComponent implements OnInit, OnDestroy {

    @Input() public control?: AbstractControl|FormArray|FormGroup|null;
    
    @Input() public path?: string;

    public myControl?: FormControl|FormGroup;

    public errors: string[] = [];

    public currentErrorText = "";

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(@Inject(FORMS_VALIDATION_ERRORS) private _myErrors: string[],
        private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {

        
        if (this.control instanceof FormGroup && this.path) {
            this.myControl = this.control.get(`${this.path}`) as FormControl;
        } else if (this.control instanceof FormControl) {
            this.myControl = this.control;
        } else if(this.control instanceof FormGroup && !this.path) {
            console.log("Path needed");
        }        

        this.errors = [...this._myErrors, ...defaultErrors];

        console.log(this._myErrors);
        console.log(typeof(this._myErrors));
        console.log(this.errors);
        this.myControl?.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                for (const controlError in this.myControl?.errors) {
                    this.currentErrorText = getErrorMessage(controlError, this.myControl as AbstractControl);
                }
                this.cdr.detectChanges();
            })
    }

    public controlInvalid(): boolean{
        return this.myControl?.invalid as boolean;
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
