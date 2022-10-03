import { Component, OnInit, Input, Inject} from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { errorInfo } from "../injectionTokenSettings/errorInfo";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/errors.token";
import { defaultErrors } from "../validators/defaultErrors";

@Component({
    selector: "app-err-wrapper",
    templateUrl: "./err-wrapper.component.html",
    styleUrls: ["./err-wrapper.component.scss"]
})
export class ErrWrapperComponent implements OnInit {

    @Input() public control?: AbstractControl|FormArray|FormGroup|null;
    
    @Input() public path?: string;

    @Input() public outputByOne = false;

    public myControl?: FormControl|FormGroup;

    public errors: errorInfo = {};

    constructor(@Inject(FORMS_VALIDATION_ERRORS) private _myErrors: errorInfo) {}

    public get currentErrorText(): string[] {

        const currentErrorText: string[] = [];

        if (this.myControl?.touched) {
            for (const error in this.myControl.errors) {
                if (this.outputByOne){
                    if (this.errors[`${error}`]) {
                        currentErrorText[0] = this.errors[`${error}`](this.myControl.errors);
                    } else currentErrorText[0] = "Incorrect value";
                    break;
                } else if (!currentErrorText.includes(this.errors[`${error}`](this.myControl.errors))){
                    if (this.errors[`${error}`]) {
                        currentErrorText.push(this.errors[`${error}`](this.myControl.errors));
                    } else currentErrorText.push("Incorrect value");
                    currentErrorText.push(this.errors[`${error}`](this.myControl.errors));
                }
            }
        }
        return currentErrorText;
    }
    
    public ngOnInit(): void {

        if (this.control instanceof FormGroup && this.path) {
            this.myControl = this.control.get(`${this.path}`) as FormControl;
        } else if (this.control instanceof FormControl) {
            this.myControl = this.control;
        } else if(this.control instanceof FormGroup && !this.path) {
            console.log("Path needed");
        }        

        Object.assign(this.errors, this._myErrors, defaultErrors);
        console.log(this.errors);
    }
}