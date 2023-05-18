import { PrimaryColumn, Column, Index, Entity } from 'typeorm';
@Index("RPS_DEN_PK", ["denCodenc","denCoduni"], { unique: true })
@Entity("RPS_DEN_DEPENCUESTA")

export class Rps_Den_Entity {
  
  @PrimaryColumn()
  @Column("number", { primary: true, name: "DEN_CODENC" , precision: 5, scale: 0 })
  denCodenc?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "DEN_CODUNI" , precision: 5, scale: 0 })
  denCoduni?: number;  
}