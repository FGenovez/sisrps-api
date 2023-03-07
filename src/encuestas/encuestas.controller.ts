import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { EncuestasService } from './encuestas.service';


@ApiTags('SisRPS - API')
@Controller('encuestas')
export class EncuestasController {
    constructor(private encuestasService: EncuestasService,private authService: AuthService) {}
    @Post('/aut/login')
    @ApiOperation({ summary: 'Valida el usuario que ingresa al SisRPS-API' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Valida el usuario que ingresa al SisRPS-API',
        /*type: [Gsi_Ucl_Entity]*/
        
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
}
