import { PrimaryColumn, Column, Index, Entity } from 'typeorm';

@Index("RPS_PEN_PK", ["penCodenc","penCoddim","penCodpre","penCodres"], { unique: true })
@Entity("RPS_PEN_PREGENCUESTA")

export class Rps_Pen_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "PEN_CODENC" , precision: 5, scale: 0 })
  penCodenc?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "PEN_CODDIM" , precision: 5, scale: 0 })
  penCoddim?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "PEN_CODPRE" , precision: 5, scale: 0 })
  penCodpre?: number;
  
  @PrimaryColumn()
  @Column("number", { primary: true, name: "PEN_CODRES" , precision: 5, scale: 0 })
  penCodres?: number;  
}