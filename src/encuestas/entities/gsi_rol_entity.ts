import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Sis_Usr_Entity } from "./gsi_usr_entity";

@Index("SIS_ROL_PK", ["rolCodcia","rolCodigo"], { unique: true })
@Entity("SIS_ROL_ROLES_WEB")

export class Sis_Rol_Entity {
  @PrimaryColumn()
  @Column("varchar2", { primary: true, name: "ROL_CODCIA" , length: 3 })
  rolCodcia?: string;

  @PrimaryColumn()
  @Column("number", { primary: true, name: "ROL_CODIGO" , precision: 5, scale: 0 })
  rolCodigo?: number;

  @Column("varchar2", { primary: true, name: "ROL_ROLE" , length: 240 })
  rolRole?: string;

  @Column("varchar2", { primary: true, name: "ROL_DESCRIPCION" , length: 200 })
  rolDescripcion?: string;
  
  @Column("varchar2", { primary: true, name: "ROL_ESTADO" , length: 1 })
  rolEstado?: string;  

  @Column("number", { primary: true, name: "ROL_CODSIS" , precision: 3})
  rolCodsis?: number;

  @Column("number", { primary: true, name: "ROL_CODMSI" , precision: 3, scale: 0 })
  rolCodmsi?: number;  


//RELACIÓN USR-ROL (DETALLE) 
@ManyToOne(() => Sis_Usr_Entity, sis_Usr_Entity => sis_Usr_Entity.detalle_rol)
@JoinColumn ([{ name: "ROL_CODCIA", referencedColumnName: "usrCodcia" }])
@JoinColumn ([{ name: "ROL_CODIGO", referencedColumnName: "usrCodrol" }])
encabezado_usr: Sis_Usr_Entity[];   
}
