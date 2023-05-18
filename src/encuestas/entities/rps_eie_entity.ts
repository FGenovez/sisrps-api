import { PrimaryColumn, Column, Index, Entity } from 'typeorm';
import { Type } from "class-transformer";
@Index("RPS_EIE_PK", ["eieCodenc","eieCoduni","eieCodemp","eieCoddim","eieCodpre","eieCodres"], { unique: true })

@Entity("RPS_EIE_EVALINDENCUESTA")

export class Rps_Eie_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "EIE_CODENC" , precision: 5, scale: 0 })
  eieCodenc?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "EIE_CODUNI" , precision: 5, scale: 0 })
  eieCoduni?: number; 

  @PrimaryColumn()
  @Column("varchar2", { primary: true, name: "EIE_CODEMP" , length: 8})
  eieCodemp?: string;   

  @PrimaryColumn()
  @Column("number", { primary: true, name: "EIE_CODDIM" , precision: 5, scale: 0 })
  eieCoddim?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "EIE_CODPRE" , precision: 5, scale: 0 })
  eieCodpre?: number;   

  @PrimaryColumn()
  @Column("number", { primary: true, name: "EIE_CODRES" , precision: 5, scale: 0 })
  eieCodres?: number;    
}