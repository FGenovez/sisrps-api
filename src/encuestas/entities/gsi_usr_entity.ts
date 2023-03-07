import { Type } from "class-transformer";
import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { Sis_Rol_Entity } from "./gsi_rol_entity";

@Index("SIS_USR_PK", ["usrCodcia","usrUsuario","usrCodrol"], { unique: true })
@Entity("SIS_USR_USUARIO_ROL_WEB")

export class Sis_Usr_Entity {
  @PrimaryColumn()
  @Column("varchar2", { primary: true, name: "USR_CODCIA" , length: 3 })
  usrCodcia?: string;

  @PrimaryColumn()
  @Column("varchar2", { primary: true, name: "USR_USUARIO" , length: 30 })
  usrUsuario?: string;

  @Column("number", { primary: true, name: "USR_CODROL" , precision:5, scale: 0 })
  usrCodrol?: number;

  @Column("varchar2", { primary: true, name: "USR_USRCREA" , length: 50 })
  usrUsrcrea?: string;
  
  @Column("timestamp", { primary: true, name: "USR_FECCREA" , nullable: true})
  @Type(() => Date)
  usrFeccrea?: Date | null;

//RELACIÓN USR-ROL (ENCABEZADO)
@OneToMany(() => Sis_Rol_Entity, sis_Rol_Entity => (sis_Rol_Entity.encabezado_usr))
detalle_rol: Sis_Rol_Entity[];

}
