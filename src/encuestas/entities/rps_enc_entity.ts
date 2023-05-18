import { PrimaryColumn, Column, Index, Entity } from 'typeorm';
import { Type } from "class-transformer";
@Index("RPS_ENC_PK", ["encCodigo"], { unique: true })

@Entity("RPS_ENC_ENCUESTAS")

export class Rps_Enc_Entity {
  @PrimaryColumn()
  @Column("number", { primary: true, name: "ENC_CODIGO" , precision: 5, scale: 0 })
  encCodigo?: number;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "ENC_CODENC" , precision: 5, scale: 0 })
  encCodenc?: number;  


  @Column("varchar2", { primary: true, name: "ENC_DESCRIPCION" , length: 500 })
  encDescripcion?: string;

  @Column("timestamp", { name: "ENC_FINICIAL", nullable: true })
  @Type(() => Date)
  encFinici?: Date | null;
  
  @Column("timestamp", { name: "ENC_FFINAL", nullable: true })
  @Type(() => Date)
  encFfinal?: Date | null;  

  @Column("varchar2", { primary: true, name: "ENC_TIPO" , length: 1 })
  encTipo?: string;  

}