import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Sis_Rol_Entity } from './entities/gsi_rol_entity';
import { Sis_Usr_Entity } from './entities/gsi_usr_entity';

@Injectable()
export class EncuestasService {
    constructor(
        @InjectRepository(Sis_Rol_Entity) private sisrolRepository: Repository<Sis_Rol_Entity>,
        @InjectRepository(Sis_Usr_Entity) private sisusrRepository: Repository<Sis_Usr_Entity>,
        private authService: AuthService        
    ){}

    @ApiHeader({
        name: 'Servicio: valida_usuario(v_user: string): Promise<Gsi_Ucl_Entity[]>',
        description: 'Valida Usuario',
      })
      
      async token(v_usr: string, v_pwd: string, v_sis: number, v_msi: number)  {
        const v_user = v_usr.toUpperCase();
        const datos = await this.sisusrRepository.findOne({where :"UPPER(USR_USUARIO) = '"+ v_user + "' AND USR_CODROL in (71,74,75)"});  
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
}
