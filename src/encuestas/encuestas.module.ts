import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EncuestasController } from './encuestas.controller';
import { EncuestasService } from './encuestas.service';
import { Rps_App_Entity } from './entities/rps_app_entity';
import { Rps_Agr_Entity } from './entities/rps_agr_entity';
import { Rps_Den_Entity } from './entities/rps_den_entity';
import { Rps_Dim_Entity } from './entities/rps_dim_entity';
import { Rps_Ede_Entity } from './entities/rps_ede_entity';
import { Rps_Eie_Entity } from './entities/rps_eie_entity';
import { Rps_Enc_Entity } from './entities/rps_enc_entity';
import { Rps_Pre_Entity } from './entities/rps_pre_entity';
import { Sis_Rol_Entity } from './entities/sis_rol_entity';
import { Sis_Usr_Entity } from './entities/sis_usr_entity';
import { Rps_Res_Entity } from './entities/rps_res_entity';
import { Rps_Pen_Entity } from './entities/rps_pen_entity';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([ 
      Sis_Rol_Entity, 
      Sis_Usr_Entity,
      Rps_Dim_Entity, 
      Rps_Enc_Entity, 
      Rps_Den_Entity,
      Rps_Eie_Entity, 
      Rps_Pre_Entity, 
      Rps_Res_Entity,
      Rps_Ede_Entity, 
      Rps_Agr_Entity,
      Rps_Pen_Entity,
      Rps_App_Entity 
    ])],
  controllers: [EncuestasController],
  providers: [EncuestasService]
})
export class EncuestasModule {}
