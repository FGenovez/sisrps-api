import { PrimaryColumn, Column, Index, Entity, OneToMany } from 'typeorm';
import { Rps_Pre_Entity } from './rps_pre_entity';

@Index("RPS_AGR_PK", ["agrCodigo"], { unique: true })
@Entity("RPS_AGR_AGRUPACIONES")

export class Rps_Agr_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "AGR_CODIGO" , precision: 1, scale: 0 })
  agrCodigo?: number;

  @Column("varchar2", { primary: true, name: "AGR_DESCRIPCION" , length: 250 })
  agrDescripcion?: string;

  //RELACIÓN AGR (ENCABEZADO) - PRE (DETALLE)
  @OneToMany(() => Rps_Pre_Entity,v_agr_e => v_agr_e.encabezado_agr)
  detalle_pre: Rps_Pre_Entity[];   
}