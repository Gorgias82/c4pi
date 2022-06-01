import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Console } from 'console';
import * as e from 'express';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  panelOpenState!: boolean;
  numbers: number[] = [];
  test: FormGroup;
  errorNumeros: boolean[] = [];
  testIncompleto: boolean = true;
  setColorEmpleadoSub!: Subscription;
  respuestaSetColor: string = '';
  errorSetColor!: boolean;
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.test = this.fb.group({});
    // this.test.patchValue({"3B" : [Validators.required]});
    let key;
    let control: FormControl;
    for (let i = 1; i < 7; i++) {
      key = i + 'A';
      control = new FormControl(0, Validators.compose([Validators.required]));
      this.test.setControl(key, control);
      key = i + 'B';
      // , this.createCheckNumberValidator(key)
      control = new FormControl(0, Validators.compose([Validators.required]));
      this.test.setControl(key, control);
    }
  }
  onChangeNumber(key: string) {
    let element;
    let value;
    if (this.test.get(key) !== null) {
      element = this.test.get(key);
    }
    if (element !== null) {
      value = element?.value;
    }
    let number = key.charAt(0);
    let letra = key.charAt(1);
    let valuePar;
    let numberValid = false;
    let error: boolean = false;
    let indiceLinea: number = 0;

    if (letra === 'A') {
      valuePar = this.test.get(number + 'B');
    } else {
      valuePar = this.test.get(number + 'A');
    }

    if (valuePar !== null) {
      if (value + valuePar.value === 3) {
        numberValid = true;
      }

      error = value + valuePar.value !== 3;
      switch (number) {
        case '1':
          this.errorNumeros[0] = error;
          indiceLinea = letra === 'B' ? 0 : 1;
          break;
        case '2':
          this.errorNumeros[1] = error;
          indiceLinea = letra === 'B' ? 2 : 3;
          break;
        case '3':
          this.errorNumeros[2] = error;
          indiceLinea = letra === 'B' ? 4 : 5;
          break;
        case '4':
          this.errorNumeros[3] = error;
          indiceLinea = letra === 'B' ? 6 : 7;
          break;
        case '5':
          this.errorNumeros[4] = error;
          indiceLinea = letra === 'B' ? 8 : 9;
          break;
        case '6':
          this.errorNumeros[5] = error;
          indiceLinea = letra === 'B' ? 10 : 11;
          break;
      }
    }

    let indice2 = indiceLinea % 2 === 0 ? indiceLinea + 1 : indiceLinea - 1;
    const linea = document.getElementsByClassName('mat-form-field-ripple')[
      indiceLinea
    ];
    const linea2 = document.getElementsByClassName('mat-form-field-ripple')[
      indice2
    ];
    const titulo = document.getElementsByTagName('mat-label')[indiceLinea];
    const titulo2 = document.getElementsByTagName('mat-label')[indice2];
    if (linea !== undefined && linea2 !== undefined) {
      linea.className = error ? 'lineaIncorrecta' : 'lineaCorrecta';
      linea2.className = error ? 'lineaIncorrecta' : 'lineaCorrecta';
    }
    if (titulo !== undefined && titulo2 !== undefined) {
      titulo.className = error ? 'tituloIncorrecto' : 'tituloCorrecto';
      titulo2.className = error ? 'tituloIncorrecto' : 'tituloCorrecto';
    }
    let valor = 0;

    for (let i = 1; i < 7; i++) {
      valor += this.test.get(i + 'A')?.value as unknown as number;
      valor += this.test.get(i + 'B')?.value as unknown as number;
    }

    if (valor === 6 * 3) {
      this.testIncompleto = false;
    } else {
      this.testIncompleto = true;
    }
  }
  // createCheckNumberValidator(key: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value as unknown as number;
  //     let number = key.charAt(0);
  //     let letra = key.charAt(1);
  //     let valuePar;
  //     let numberValid = false;
  //     let error :boolean = false;
  //     let indiceLinea : number = 0;
  //     if (letra === 'A') {
  //       valuePar = this.test.get(number + 'B');
  //     } else {
  //       valuePar = this.test.get(number + 'A');
  //     }

  //     if (valuePar !== null) {
  //       if (value + valuePar.value === 3) {

  //         numberValid = true;
  //       }

  //       error = (value + valuePar.value) !== 3;
  //       switch (number) {
  //         case '1':
  //           this.errorNumeros[0] = error;
  //           indiceLinea = letra === 'B'? 0 : 1;
  //           break;
  //         case '2':
  //           this.errorNumeros[1] = error;
  //           indiceLinea = letra === 'B'? 2 : 3;
  //           break;
  //         case '3':
  //           this.errorNumeros[2] = error;
  //           indiceLinea = letra === 'B'? 4 : 5;
  //           break;
  //         case '4':
  //           this.errorNumeros[3] = error;
  //           indiceLinea = letra === 'B'? 6 : 7;
  //           break;
  //         case '5':
  //           this.errorNumeros[4] = error;
  //           indiceLinea = letra === 'B'? 8 : 9;
  //           break;
  //         case '6':
  //           this.errorNumeros[5] = error;
  //           indiceLinea = letra === 'B'? 10 :11;
  //           break;
  //       }
  //     }

  //     let indice2 = indiceLinea % 2 === 0? indiceLinea +1 : indiceLinea -1;
  //     const linea = document.getElementsByClassName('mat-form-field-ripple')[indiceLinea] ;
  //     const linea2 = document.getElementsByClassName('mat-form-field-ripple')[indice2] ;
  //     const titulo = document.getElementsByTagName('mat-label')[indiceLinea] ;
  //     const titulo2 = document.getElementsByTagName('mat-label')[indice2] ;
  //     if(linea !== undefined && linea2 !== undefined){
  //       linea.className = error? 'lineaIncorrecta' : 'lineaCorrecta';
  //       linea2.className = error? 'lineaIncorrecta' : 'lineaCorrecta';
  //     }
  //     if(titulo !== undefined && titulo2 !== undefined){
  //       titulo.className = error? 'tituloIncorrecto' : 'tituloCorrecto';
  //       titulo2.className = error? 'tituloIncorrecto' : 'tituloCorrecto';
  //     }

  //     return numberValid ? { checkNumber: true } : null;
  //   }
  // }

  ngOnInit(): void {
    // for(let i = 0; i <6;i++){
    //   this.errorNumeros.push(false);
    // }
    this.numbers = [0, 1, 2, 3];
    this.panelOpenState = false;
  }

  onSubmit(form: FormGroup) {
    let valorA = 0;
    let valorB = 0;
    let relaciones = 0;
    let tareas = 0;
    let extrovertido = 0;
    let introvertido = 0;
    let color = -1;
    let colorNombre: string;
    for (let i = 1; i < 7; i++) {
      valorA = this.test.get(i + 'A')?.value as unknown as number;
      valorB = this.test.get(i + 'B')?.value as unknown as number;
      switch (i) {
        case 1:
          relaciones += valorA;
          tareas += valorB;
          break;
        case 2:
          extrovertido += valorB;
          introvertido += valorA;
          break;
        case 3:
          relaciones += valorB;
          tareas += valorA;
          break;
        case 4:
          extrovertido += valorA;
          introvertido += valorB;
          break;
        case 5:
          relaciones += valorA;
          tareas += valorB;
          break;
        case 6:
          extrovertido += valorB;
          introvertido += valorA;
          break;
      }
    }

    if (introvertido > extrovertido) {
      //verde introvertido+relaciones
      //azul introvertido+tareas
      color = relaciones > tareas ? 1 : 2;
    } else {
      //amarillo extrovertido+relaciones
      //rojo extrovertido+tareas
      color = relaciones > tareas ? 3 : 0;
    }
    console.log(color);
    switch (color) {
      case 0:
        colorNombre = 'rojo';
        break;
      case 1:
        colorNombre = 'verde';
        break;
      case 2:
        colorNombre = 'azul';
        break;
      case 3:
        colorNombre = 'amarillo';
        break;
    }
    let id_empleado = localStorage.getItem('id') as unknown as number;
    this.mainService.setColorEmpleado({ id: id_empleado, color: color });
    this.setColorEmpleadoSub = this.mainService
      .getSetColorUpdatedListener()
      .subscribe((respuesta: boolean) => {
        if (respuesta) {
          localStorage.setItem('color', color as unknown as string);
          this.errorSetColor = false;
          this.respuestaSetColor = `Se ha actualizado correctamente su color a ${colorNombre}`;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.errorSetColor = true;
          this.respuestaSetColor = 'No se ha podido actualizar su color';
        }
      });
  }
}
