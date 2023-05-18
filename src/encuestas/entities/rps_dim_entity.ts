import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Rps_Pre_Entity } from "./rps_pre_entity";

@Index("RPS_DIM_PK", ["dimCodigo"], { unique: true })
@Entity("RPS_DIM_DIMENSIONES")

export class Rps_Dim_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "DIM_CODIGO" , precision: 5, scale: 0 })
  dimCodigo?: number;

  @Column("number", { primary: true, name: "DIM_CODDIM" , precision: 5, scale: 0 })
  dimCoddim?: number;  

  @Column("varchar2", { primary: true, name: "DIM_DESCRIPCION" , length: 250 })
  dimDescripcion?: string;

  @Column("varchar2", { primary: true, name: "DIM_ESTADO" , length: 1 })
  dimEstado?: string;


@Column("number", { primary: true, name: "DIM_CSUBD" , precision: 2, scale: 0 })
dimCsubd?: number;  

@Column("number", { primary: true, name: "DIM_VIL1" , precision: 6, scale: 2 })
dimVil1?: number;      

@Column("number", { primary: true, name: "DIM_VLF1" , precision: 6, scale: 2 })
dimVlf1?: number;  
@Column("number", { primary: true, name: "DIM_VIL2" , precision: 6, scale: 2 })
dimVil2?: number;  
@Column("number", { primary: true, name: "DIM_VLF2" , precision: 6, scale: 2 })
dimVlf2?: number;  

@Column("number", { primary: true, name: "DIM_VIL3" , precision: 6, scale: 2 })
dimVil3?: number;  
@Column("number", { primary: true, name: "DIM_VLF3" , precision: 6, scale: 2 })
dimVlf3?: number;  
@Column("number", { primary: true, name: "DIM_PUNTOSP" , precision: 5, scale: 0 })
dimPuntosp?: number;  

@OneToMany(() => Rps_Pre_Entity, (rps_Pre_Entity) => (rps_Pre_Entity.dim_preguntas))
@JoinColumn ([{ name: "DIM_CODIGO", referencedColumnName: "preCoddim" }])
preguntas: Rps_Pre_Entity[];

@OneToMany(() => Rps_Dim_Entity, rps_Dim_Entity => rps_Dim_Entity.parent)
@JoinColumn ([{ name: "DIM_CODIGO", referencedColumnName: "dimCoddim" }])
children: Rps_Dim_Entity[];

@ManyToOne(() => Rps_Dim_Entity, rps_Dim_Entity => rps_Dim_Entity.children)
@JoinColumn ([{ name: "DIM_CODDIM", referencedColumnName: "dimCodigo" }])
parent: Rps_Dim_Entity;

}