import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  panelOpenState !: boolean;
  numbers : number[] = [];
  test : FormGroup;
  constructor(private fb: FormBuilder) { 
    this.test = this.fb.group({});
    // this.test.patchValue({"3B" : [Validators.required]});
    let key;
    let control : FormControl;
    for(let i =1 ; i< 7;i++){
      key = i + "A";
      control = new FormControl(0, Validators.compose([Validators.required, this.createCheckNumberValidator(key)]));      
      
      this.test.setControl(key,control);
      key = i + "B";
      control = new FormControl(0, Validators.compose([Validators.required, this.createCheckNumberValidator(key)]));      
     
      this.test.setControl(key,control);
    }
    
    
    
 ;
    
    
  }

  createCheckNumberValidator(key :string): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value as unknown as number;
     
        if (!value) {
        return null;
        }
        let number = key.charAt(0);
        let letra = key.charAt(1);
        let valuePar;
        let numberValid = false;
        
        if(letra === 'A'){
          valuePar = this.test.get(number + 'B') ;
        }else{
          valuePar = this.test.get(number + 'A');
        }
        
        console.log(value);
        if(valuePar !== null){
          if(value + valuePar.value === 3){
          numberValid = true;
          }
        }

        return !numberValid ? {checkNumber:true}: null;
    }
}

  ngOnInit(): void {
    console.log(this.test);
    this.numbers = [0,1,2,3];
    this.panelOpenState = false;
  }

  onSubmit(form: FormGroup){

  }
}
