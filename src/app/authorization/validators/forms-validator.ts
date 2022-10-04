import { AbstractControl} from "@angular/forms";

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if (/(?=.*[0-9])(?=.*[A-Z])/.test(control.value)) {
        return null
    }

    return {"passwordError": true};
}

export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null{
    if (/(^[0-9]+$)|(^$)/.test(control.value)) {
        return null
    }

    return {"phoneError": true};
}
    
export function passwordConfValidators(group: AbstractControl): { [key: string]: boolean } | null{
    if (group.get("passwordConf")?.touched && group.get("passwordConf")?.value !== group.get("password")?.value) {
        return {"passwordMatchError": true};
    }

    if(group.get("passwordConf")?.value === ""){
        return {"required": true};
    }

    return null;
}



// export function passwordMatchAfterChange(group: FormGroup): { [key: string]: boolean } | null {
//       return (!group.dirty || !group.touched) ||
//               group.value.password === group.value.passwordConf ?
//                 null : { "passwordMatchAfterChangeError": true };
//   }