export class MyValidationErrors {
    private _value: string[] = []

    public get value(): string[] {
        return this._value;   
    }
  
    public set value(val: string[]) {
        this._value = val;
    }
  }