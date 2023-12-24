import {UnitMeasurement} from 'assets/enum/UnitMeasurement';

export class Ingredient {
  name!: string
  measurement!: UnitMeasurement
  measurementValue!: number

  constructor(
    name?: string,
    measurement?: UnitMeasurement,
    measurementValue?: number
  ) {
    this.name = name?.toLowerCase() || ''
    this.measurement = measurement || UnitMeasurement.WEIGHT
    this.measurementValue = Number(measurementValue) || 0
  }
}
