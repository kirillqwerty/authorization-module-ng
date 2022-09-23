import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if (/(?=.*[0-9])(?=.*[A-Z])/.test(control.value)) {
        return null
    }

    return {"passwordError": true};
}

export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if (/^[0-9]+$/.test(control.value)) {
        return null
    }

    return {"phoneError": true};
}

export function passwordMatch(control: AbstractControl): { [key: string]: boolean } | null{
    if (control.value === control.parent?.get("password")?.value) {
        return null;
    }

    return {"passwordMatchError": true};
}


export function mainPasswordMatch(control: AbstractControl): { [key: string]: boolean } | null{
    if (control.value === control.parent?.get("passwordConf")?.value) {
        return null;
    }

    return {"passwordMatchError": true};
}
