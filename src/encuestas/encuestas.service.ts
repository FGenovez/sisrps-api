import { HttpException, HttpStatus, Injectable, UnauthorizedException, Get } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { getManager, Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


import { Rps_Agr_Entity } from './entities/rps_agr_entity';
import { Rps_Dim_Entity } from './entities/rps_dim_entity';
import { Rps_Ede_Entity } from './entities/rps_ede_entity';
import { Rps_Enc_Entity } from './entities/rps_enc_entity';
import { Rps_Pre_Entity } from './entities/rps_pre_entity';
import { Rps_Res_Entity } from './entities/rps_res_entity';
import { Sis_Rol_Entity } from './entities/sis_rol_entity';
import { Sis_Usr_Entity } from './entities/sis_usr_entity';
import { Rps_App_Entity } from './entities/rps_app_entity';
import { Rps_Pen_Entity } from './entities/rps_pen_entity';

@Injectable()
export class EncuestasService {
    constructor(
        @InjectRepository(Sis_Rol_Entity) private sisrolRepository: Repository<Sis_Rol_Entity>,
        @InjectRepository(Sis_Usr_Entity) private sisusrRepository: Repository<Sis_Usr_Entity>,
        @InjectRepository(Rps_Dim_Entity) private dimensionesRepository: Repository<Rps_Dim_Entity>,
        @InjectRepository(Rps_Enc_Entity) private encuestasRepository: Repository<Rps_Enc_Entity>,
        @InjectRepository(Rps_Pre_Entity) private preguntasRepository: Repository<Rps_Pre_Entity>,
        @InjectRepository(Rps_Agr_Entity) private agrupacionesRepository: Repository<Rps_Agr_Entity>,
        @InjectRepository(Rps_Res_Entity) private respuestasRepository: Repository<Rps_Res_Entity>,
        @InjectRepository(Rps_App_Entity) private agrupregRepository: Repository<Rps_App_Entity>,
        @InjectRepository(Rps_Pen_Entity) private pregencuestaRepository: Repository<Rps_Pen_Entity>,
        private authService: AuthService        
    ){}
    @ApiHeader({
        name: 'Servicio: valida_usuario(v_user: string): Promise<Sis_Ucl_Entity[]>',
        description: 'Valida Usuario',
      })
      
      async token(v_usr: string, v_pwd: string, v_sis: number, v_msi: number)  {
        const v_user = v_usr.toUpperCase();
        const datos = await this.sisusrRepository.findOne({where :"UPPER(USR_USUARIO) = '"+ v_user + "' AND USR_CODROL in (80)"});  
         if(!datos)
          throw new HttpException('El Usuario no posee permisos para ingresar al Sistema', HttpStatus.FORBIDDEN);      
          
          const roles = await this.sisrolRepository.findOne({where :"ROL_CODIGO = "+ datos.usrCodrol});    
            
          const parametros = {
            user: v_usr,
            pwd: v_pwd,
            codsis: roles.rolCodsis,
            codmsi: roles.rolCodmsi
           }
          const v_rol = datos.usrCodrol
          const v_nrol = roles.rolRole
          const register = await axios.post('http://movil.cel.gob.sv:8080/cel-rest/service/login', parametros)
          const v_ccel = register.data.codcel;
          if(!register || register.data.coduni == 0)
            throw new HttpException('Ha ocurrido un error al tratar de iniciar sesión en la aplicación', HttpStatus.FORBIDDEN);
          else{
            const user = await this.authService.login({v_usr,v_ccel});
            if (!user) {
              throw new UnauthorizedException();
            }
            
            register.data.username = v_user.toUpperCase();
            register.data.unidad = register.data.dependencia;
            register.data.rolusr = {rolCodigo: v_rol, rolRole: v_nrol };
            register.data.tokenFirst = user;
    
            console.log(register.data);
            return register.data;
          }
       
      }

      @ApiHeader({
        name: 'Muestra la encuesta GENERAL',
        description: 'Muestra la encuesta GENERAL',
    })

    async obtieneEncGeneral() {
      const agr = await this.agrupregRepository 
      .createQueryBuilder("agr")
      .orderBy("agr.AGR_CODIGO")
      .getMany();

      const dim =  await this.dimensionesRepository
      .createQueryBuilder('dim')
      .where('dim.DIM_CODDIM = 0')
      .orderBy("dim.DIM_CODDIM, dim.DIM_CODIGO ")
      .getMany();  

      const dims =  await this.dimensionesRepository
      .createQueryBuilder('dims')
      .where('dims.DIM_CODDIM != 0')
      .orderBy("dims.DIM_CODDIM, dims.DIM_CODIGO ")
      .getMany();       

      const cpre =  await this.preguntasRepository
      .createQueryBuilder('cpre')
      .getMany(); 

      const pre =  await this.preguntasRepository
      .createQueryBuilder('pre')
      .getMany();        

      const res =  await this.respuestasRepository
      .createQueryBuilder('res')
      .getMany();  

      
        let agrupaciones: {
          agrCodigo: number,
          agrDescripcion: string,
          dimCodigo:number,
          preCoddim: number,
          dimensiones
        }[]=[]

        let dimensiones:  {
          dimCodigo: number,
          dimDescripcion: string,
          subdimensiones
        }[]=[]

        let subdimensiones:  {
          dimCodigo: number,
          dimCoddim: number,
          dimDescripcion: string,
          preguntas
        }[]=[]

        let preguntas:  {
          preCoddim: number,
          preCodigo: number,
          preCodagr: number,
          preDescripcion: string,
          respuestas
        }[]=[]        

        let respuestas:  {
          resCoddim: number,
          resCodpre: number,
          resCodigo: number,
          resValor: number,
          resEstado: string,
          resDescres:string
        }[]=[] 

        let ll_agr = 0
        let ll_cagr = 0
        let ll_dim =0
        let ll_subagr = 0
        let ll_cdim = 0
        let ll_ddim = 0
        agrupaciones = [];     
        agr.forEach(agr=>{
          dimensiones= [] 
          dim.forEach(dim => {if(agr.dimCodigo == dim.dimCodigo ){
            subdimensiones= []
            if (ll_cdim == dim.dimCodigo){
              null
            }else{
            dimensiones.push({
            dimCodigo: dim.dimCodigo,
            dimDescripcion: dim.dimDescripcion,
            subdimensiones })}
            ll_dim++
            
            dims.forEach(dims=> {if(dim.dimCodigo == dims.dimCoddim){
              preguntas=[]
              ll_cdim=0
              cpre.forEach(cpre => {if(dims.dimCodigo == cpre.preCoddim && cpre.preCodagr == agr.agrCodigo){ll_cdim++}});
                if (ll_cdim > 0){
                subdimensiones.push({
                  dimCodigo: dims.dimCodigo,
                  dimCoddim: dims.dimCoddim,
                  dimDescripcion: dims.dimDescripcion,
                  preguntas})}

              pre.forEach(pre=>{if(pre.preCodagr == agr.agrCodigo &&  pre.preCoddim == dims.dimCodigo){
                respuestas=[]
                preguntas.push({
                  preCoddim: pre.preCoddim,
                  preCodigo: pre.preCodigo,
                  preCodagr: pre.preCodagr,
                  preDescripcion:pre.preDescripcion,
                  respuestas})

                res.forEach(res=>{if(res.resCoddim == pre.preCoddim && res.resCodpre == pre.preCodigo){
                  respuestas.push({
                    resCoddim: res.resCoddim,
                    resCodpre: res.resCodpre,
                    resCodigo: res.resCodigo,
                    resValor: res.resValor,
                    resEstado: res.resEstado,
                    resDescres:res.resDescres})
                }})//Fin Respuestas
              }})//Fin Preguntas
        }})//Fin Subdimensiones
        ll_ddim = dim.dimCodigo

    }})//Fin Dimensiones
        
    if(ll_cagr == agr.agrCodigo ){ll_agr++} else {ll_agr= 0 }
    if (ll_agr == 0){
    agrupaciones.push({
      agrCodigo: agr.agrCodigo,
      agrDescripcion: agr.agrDescripcion,
      dimCodigo: agr.dimCodigo,
      preCoddim: agr.preCoddim,
      dimensiones})}
    ll_cagr = agr.agrCodigo
  })//Fin Agrupaciones
    return agrupaciones ;
    }   

    @ApiHeader({
      name: 'Servicio: buscausuarios()',
      description: 'BUSCA Agrupacines',
  })
    async obtieneAgrupaciones() {
      const agr = await this.agrupregRepository 
      .createQueryBuilder("agr")
      .orderBy("agr.AGR_CODIGO")
      .getMany();

    return agr;
    }

    @ApiHeader({
      name: 'Servicio: buscausuarios()',
      description: 'BUSCA Agrupacines',
    })
  async obtieneEncuesta(v_enc:number) {
          const dim =  await this.dimensionesRepository 
          .createQueryBuilder('dim')
          .where('dim.DIM_CODDIM = 0')
          .andWhere(qb => {
            const subQuery = qb.subQuery()
                .select("sub.DIM_CODDIM ")
                .from(Rps_Dim_Entity, "sub")
                .andWhere(qb => {
                  const subQuery1 = qb.subQuery()
                      .select("pen.PEN_CODDIM ")
                      .from(Rps_Pen_Entity, "pen")
                      .where("pen.PEN_CODDIM = sub.DIM_CODIGO")
                      .andWhere('pen.PEN_CODENC   = :enc', { enc: v_enc })
                      .getQuery();
                  return "(sub.DIM_CODIGO) IN " + subQuery1;                
                  
                })
                .getQuery();
            return "(dim.DIM_CODIGO) IN " + subQuery;
            })          
          .orderBy("dim.DIM_CODDIM, dim.DIM_CODIGO ")
          .getMany();  


    
          const dims =  await this.dimensionesRepository
          .createQueryBuilder('dims')
          .where('dims.DIM_CODDIM != 0')
          .andWhere(qb => {
            const subQuery = qb.subQuery()
                .select("pen.PEN_CODDIM ")
                .from(Rps_Pen_Entity, "pen")
                .where("dims.DIM_CODIGO = pen.PEN_CODDIM")
                .andWhere('pen.PEN_CODENC   = :enc', { enc: v_enc })
                .getQuery();
            return "(dims.DIM_CODIGO) IN " + subQuery;
            })         
          .orderBy("dims.DIM_CODDIM, dims.DIM_CODIGO ")
          .getMany();       
    
    
          const pre =  await this.preguntasRepository
          .createQueryBuilder('pre')
          .andWhere(qb => {
            const subQuery = qb.subQuery()
                .select("pen.PEN_CODDIM, pen.PEN_CODPRE")
                .from(Rps_Pen_Entity, "pen")
                   .where("pre.PRE_CODDIM = pen.PEN_CODDIM")
                .andWhere("pre.PRE_CODIGO = pen.PEN_CODPRE")
                .andWhere('pen.PEN_CODENC = :enc', { enc: v_enc })
                .getQuery();
            return "(pre.PRE_CODDIM, pre.PRE_CODIGO) IN " + subQuery;
            })          
          .getMany();        
    
          const res =  await this.respuestasRepository
          .createQueryBuilder('res')
          .getMany();  
    
          
    
            let dimensiones:  {
              dimCodigo: number,
              dimDescripcion: string,
              subdimensiones
            }[]=[]
    
            let subdimensiones:  {
              dimCodigo: number,
              dimCoddim: number,
              dimDescripcion: string,
              preguntas
            }[]=[]
    
            let preguntas:  {
              preCoddim: number,
              preCodigo: number,
              preCodagr: number,
              preDescripcion: string,
              respuestas
            }[]=[]        
    
            let respuestas:  {
              resCoddim: number,
              resCodpre: number,
              resCodigo: number,
              resValor: number,
              resEstado: string,
              resDescres:string
            }[]=[] 
    
            let ll_dim =0
            let ll_cdim = 0
            let ll_ddim = 0


              dimensiones= [] 
              dim.forEach(dim => {
                subdimensiones= []
                
                dims.forEach(dims=> {if(dim.dimCodigo == dims.dimCoddim){
                  preguntas=[]
                  ll_cdim=0
                    subdimensiones.push({
                      dimCodigo: dims.dimCodigo,
                      dimCoddim: dims.dimCoddim,
                      dimDescripcion: dims.dimDescripcion,
                      preguntas})
    
                  pre.forEach(pre=>{if(  pre.preCoddim == dims.dimCodigo){
                    respuestas=[]
                    preguntas.push({
                      preCoddim: pre.preCoddim,
                      preCodigo: pre.preCodigo,
                      preCodagr: pre.preCodagr,
                      preDescripcion:pre.preDescripcion,
                      respuestas})
    
                    res.forEach(res=>{if(res.resCoddim == pre.preCoddim && res.resCodpre == pre.preCodigo){
                      respuestas.push({
                        resCoddim: res.resCoddim,
                        resCodpre: res.resCodpre,
                        resCodigo: res.resCodigo,
                        resValor: res.resValor,
                        resEstado: res.resEstado,
                        resDescres:res.resDescres})
                    }})//Fin Respuestas
                  }})//Fin Preguntas
            }})//Fin Subdimensiones
            ll_ddim = dim.dimCodigo
            dimensiones.push({
              dimCodigo: dim.dimCodigo,
              dimDescripcion: dim.dimDescripcion,
              subdimensiones })
              ll_dim++
        //}
      })//Fin Dimensiones
            
        return dimensiones ;
    }

    @ApiHeader({
      name: 'Servicio: buscausuarios()',
      description: 'BUSCA Agrupacines',
  })
  async obtieneEncPorEmp(v_emp:string) {
    const enc = await this.encuestasRepository
    .createQueryBuilder('enc')
    .where(qb => {
      const subQuery = qb.subQuery()
          .select("ede.EDE_CODENC")
          .from(Rps_Ede_Entity, "ede")
             .where("enc.ENC_CODIGO = ede.EDE_CODENC")
          .andWhere('ede.EDE_CODEMP = :emp', { emp: v_emp })
          .getQuery();
      return "(enc.ENC_CODIGO) IN " + subQuery;
      })          
    .getMany();

      return enc;

  }


    @ApiHeader({
      name: 'Servicio: Lista de Usuarios que tienen el ROL para ingresar a la Encuesta',
      description: 'Lista de Usuarios que tienen el ROL para ingresar a la Encuesta',
  })
  async buscaUsuarios(): Promise<Sis_Usr_Entity[]> {
    const register = await this.sisusrRepository.find({  
      where: {
        usrCodrol :80
      },      
      order: {
        usrUsuario: 'ASC'
      }
    });
    return register;
  }   
  
  async cantEvalEmpleado(v_emp: String) {
    const start = new Date();
    const enc = await this.encuestasRepository
    .createQueryBuilder('enc')
    .where("enc.ENC_FECFIN <= :start}")
    .getCount();
  } 



  async obtieneGraph1(){
  const  register = ({
        "name": "CU",
        "series": [
          {
            "name": "5",
            "value": 5
          },
          {
            "name": "2",
            "value": 2
          },
          {
            "name": "12",
            "value": 12
          }
        ]
      });

    console.log(register);
    return register;
  }   



}

