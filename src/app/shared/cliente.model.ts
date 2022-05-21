export interface Cliente {
  id: number;
  dni: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  rojo: { cantidad: number; porcentaje: number };
  verde: { cantidad: number; porcentaje: number };
  azul: { cantidad: number; porcentaje: number };
  amarillo: { cantidad: number; porcentaje: number };
  cantidadOpiniones: number;
}
