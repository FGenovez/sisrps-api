import { Column, Entity, ViewEntity } from 'typeorm';

@ViewEntity("RPS_APP_AGRUPPREGUNTAS_V")

export class Rps_App_Entity {
  @Column("number", { name: "AGR_CODIGO" , precision: 5, scale: 0 })
  agrCodigo?: number;
  @Column("varchar2", {name: "AGR_DESCRIPCION" , length: 250 })
  agrDescripcion?: string;
  @Column("number", { name: "DIM_CODIGO" , precision: 5, scale: 0 })
  dimCodigo?: number;  
  @Column("number", {name: "PRE_CODDIM" , precision: 5, scale: 0 })
  preCoddim?: number;  
  
}