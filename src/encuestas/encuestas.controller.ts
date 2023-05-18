import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { EncuestasService } from './encuestas.service';
import { Rps_Dim_Entity } from './entities/rps_dim_entity';
import { Sis_Rol_Entity } from './entities/sis_rol_entity';
import { Rps_Ede_Entity } from './entities/rps_ede_entity';
import { Rps_Enc_Entity } from './entities/rps_enc_entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('SisRPS - API')
@Controller('sisrps')
export class EncuestasController {
    constructor(private encuestasService: EncuestasService,private authService: AuthService) {}
    @Post('/aut/login')
    @ApiOperation({ summary: 'Valida el usuario que ingresa al SisRPS-API. Los parámetros son [user/pwd/codsis/codmsi]' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Valida el usuario que ingresa al SisRPS-API. Los parámetros son [user/pwd/codsis/codmsi]',
        type: [Sis_Rol_Entity]
      }) 
      async login(
          @Body('user') v_usr: string,
          @Body('pwd') v_pwd: string,
          @Body('codsis') v_sis: number,
          @Body('codmsi') v_msi: number 
          ): Promise<any>{
        const data = await this.encuestasService.token(v_usr, v_pwd, v_sis, v_msi);
         if (!data) {return []}
         else {return data;}
         
      }   
      
      //@UseGuards(JwtAuthGuard)
      @Get('/encGeneral/')
      @ApiOperation({ summary: 'Muestra la encuesta GENERAL'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Muestra la encuesta GENERAL',
          type: [Rps_Dim_Entity],
        })     
        async obtieneEncGeneral() {
        const data = await this.encuestasService.obtieneEncGeneral();
        return {encuesta: data};
      }

      //@UseGuards(JwtAuthGuard)
      @Get('/agrupaciones/')
      @ApiOperation({ summary: 'Lista de agrupaciones de la Encuesta'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de agrupaciones de la Encuesta',
          type: [Rps_Dim_Entity],
        })     
        async obtieneAgrupaciones() {
        const data = await this.encuestasService.obtieneAgrupaciones();
        return {agrupaciones: data};
      }

      //@UseGuards(JwtAuthGuard)
      @Get('/encuesta/:enc')
      @ApiOperation({ summary: 'Lista de agrupaciones de la Encuesta'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de agrupaciones de la Encuesta',
          type: [Rps_Dim_Entity],
        })     
        async obtieneEncuesta(
          @Param('enc') v_enc: number
        ) {
        const data = await this.encuestasService.obtieneEncuesta(v_enc);
        return {encuesta: data};
      }      

      //@UseGuards(JwtAuthGuard)
      @Get('/encPorEmp/:emp')
      @ApiOperation({ summary: 'Describe las Encuestas del Empleado.Parámetro [Código de empleado]'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Describe las Encuestas del Empleado. Parámetro [Código de empleado]',
          type: [Rps_Enc_Entity],
        })     
        async obtieneEncPorEmp(
          @Param('emp') v_emp: string
        ) {
        const data = await this.encuestasService.obtieneEncPorEmp(v_emp);
        return {encuesta: data};
      }      


      //@UseGuards(JwtAuthGuard)
      @Get('/usuarios/')
      @ApiOperation({ summary: 'Lista de Usuarios que tienen el ROL para ingresar a la Encuesta'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de Usuarios que tienen el ROL para ingresar a la Encuesta',
          type: [Rps_Dim_Entity],
        })     
        async obtieneUsuarios() {
        const data = await this.encuestasService.buscaUsuarios();
        return {usuarios: data};
      }

      //@UseGuards(JwtAuthGuard)
      @Get('/usuario/:codemp')
      @ApiOperation({ summary: 'Encuestas por Empleado'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Encuestas por Empleado',
          type: [Rps_Ede_Entity],
        })     
        async cantEvalEmpleado(@Param('codemp') v_emp: string) {
        const data = await this.encuestasService.cantEvalEmpleado(v_emp);
        console.log(data);
        return { data};
      }     

      /* //Está comentariada pero está relacionada con la gebneración del gráfico
      //@UseGuards(JwtAuthGuard)
      @Get('/graph1/')
      @ApiOperation({ summary: 'datos para grafico 1'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'datos para grafico 1',
          type: [Rps_Dim_Entity],
        })     
        async obtieneGraph1() {
        const data = await this.encuestasService.obtieneGraph1();
        return {datos: data};
      }*/




}
