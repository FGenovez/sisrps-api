import { PrimaryColumn, Column, Index, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Rps_Res_Entity } from './rps_res_entity';
import { Rps_Agr_Entity } from './rps_agr_entity';
import { Rps_Dim_Entity } from './rps_dim_entity';

@Index("RPS_PRE_PK", ["preCoddim","preCodigo"], { unique: true })
@Entity("RPS_PRE_PREGUNTAS")

export class Rps_Pre_Entity {

  @PrimaryColumn()
  @Column("number", { primary: true, name: "PRE_CODDIM" , precision: 5, scale: 0 })
  preCoddim?: number;
  
  @PrimaryColumn()
  @Column("number", { primary: true, name: "PRE_CODIGO" , precision: 5, scale: 0 })
  preCodigo?: number;

  @Column("number", { name: "PRE_CODAGR" , precision: 5, scale: 0})
  preCodagr?: number;

  @Column("varchar2", { name: "PRE_DESCRIPCION" , length: 250})
  preDescripcion?: string;  

  @Column("varchar2", { name: "PRE_ESTADO" , length: 1})
  preEstado?: string; 
  
  //RELACIÓN PRE (ENCABEZADO) - RES (DETALLE)
  @OneToMany(() => Rps_Res_Entity,v_pre_e => v_pre_e.encabezado_pre)
  respuestas: Rps_Res_Entity[];  

  //RELACIÓN AGR (MAESTRO) - PRE (DETALLE)
  @ManyToOne(() => Rps_Agr_Entity,v_agr_d => v_agr_d.detalle_pre)
  @JoinColumn([{ name: "PRE_CODAGR", referencedColumnName: "agrCodigo" }])
  encabezado_agr: Rps_Agr_Entity;  

  //RELACIÓN DIM (MAESTRO) - PRE (DETALLE)
  @ManyToOne(() => Rps_Dim_Entity,rps_Dim_Entity => rps_Dim_Entity.preguntas)
  @JoinColumn([{ name: "PRE_CODDIM", referencedColumnName: "dimCoddim" }])
  dim_preguntas: Rps_Dim_Entity;  

}