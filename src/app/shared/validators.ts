import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

export function emailValidator(contorl: AbstractControl): ValidationErrors | null {
    if(!contorl.value) {
        return null;
    }
    return /^[a-zA-Z0-9\.-]{5,}@[a-z]{3,}\.(bg|com)$/.test(contorl.value) ? null : {
        invalidEmail: true
    };
}

export function sameValue(getTargetControl: () => AbstractControl | null, removeSubscriptions: Observable<any>) {
    let subscription: Subscription | null = null;
    return function (control: AbstractControl) {

        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
        }
        const targetControl = getTargetControl();
        if (!targetControl) {
            return null;
        }
        subscription = targetControl.valueChanges
            .pipe(
                takeUntil(removeSubscriptions)
            )
            .subscribe({
                next: () => {
                    control.updateValueAndValidity();
                },
                complete: () => {
                    subscription = null;
                }
            });
            return targetControl.value === control.value ? null : { invalid: true}
    };
}