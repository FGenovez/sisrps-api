import { PrimaryColumn, Column, Index, Entity } from 'typeorm';
import { Type } from "class-transformer";
@Index("RPS_EDE_PK", ["edeCodenc","edeCoduni","edeCodemp"], { unique: true })

@Entity("RPS_EDE_EMPDEPENCUESTA")

export class Rps_Ede_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "EDE_CODENC" , precision: 5, scale: 0 })
  edeCodenc?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "EDE_CODUNI" , precision: 5, scale: 0 })
  edeCoduni?: number; 

  @PrimaryColumn()
  @Column("varchar2", { primary: true, name: "EDE_CODEMP" , length: 8})
  edeCodemp?: string;   
}