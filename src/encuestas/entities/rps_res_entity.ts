import { PrimaryColumn, Column, Index, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Rps_Pre_Entity } from './rps_pre_entity';

@Index("RPS_RES_PK", ["resCoddim","resCodpre","resCodigo"], { unique: true })
@Entity("RPS_RES_RESPUESTAS")

export class Rps_Res_Entity {

    @PrimaryColumn()
    @Column("number", { primary: true, name: "RES_CODDIM" , precision: 5, scale: 0 })
    resCoddim?: number;
    
    @PrimaryColumn()
    @Column("number", { primary: true, name: "RES_CODPRE" , precision: 5, scale: 0 })
    resCodpre?: number;
  
    @PrimaryColumn()
    @Column("number", { primary: true, name: "RES_CODIGO" , precision: 5, scale: 0 })
    resCodigo?: number;
  
    @Column("number", {  name: "RES_VALOR" , precision: 5, scale: 0})
    resValor?: number;
  
    @Column("varchar2", {  name: "RES_ESTADO" , length: 1})
    resEstado?: string;  

    @Column("varchar2", {  name: "RES_DESCRES" , length: 1})
    resDescres?: string;

    //RELACIÓN PRE (MAESTRO) - RES (DETALLE)
    @ManyToOne(() => Rps_Pre_Entity,v_pre_d => v_pre_d.respuestas)
    @JoinColumn([{ name: "RES_CODPRE", referencedColumnName: "preCodigo" }])
    encabezado_pre: Rps_Pre_Entity;

}