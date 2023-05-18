import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EncuestasModule } from './encuestas/encuestas.module';
import { Rps_Dim_Entity } from './encuestas/entities/rps_dim_entity';
import { Rps_Enc_Entity } from './encuestas/entities/rps_enc_entity';
import { Sis_Rol_Entity } from './encuestas/entities/sis_rol_entity';
import { Sis_Usr_Entity } from './encuestas/entities/sis_usr_entity';
import { UsersModule } from './encuestas/users/users.module';
import { Rps_Eie_Entity } from './encuestas/entities/rps_eie_entity';
import { Rps_Pre_Entity } from './encuestas/entities/rps_pre_entity';
import { Rps_Den_Entity } from './encuestas/entities/rps_den_entity';
import { Rps_App_Entity } from './encuestas/entities/rps_app_entity';
import { Rps_Agr_Entity } from './encuestas/entities/rps_agr_entity';
import { Rps_Ede_Entity } from './encuestas/entities/rps_ede_entity';
import { Rps_Res_Entity } from './encuestas/entities/rps_res_entity';
import { Rps_Pen_Entity } from './encuestas/entities/rps_pen_entity';
@Module({
  imports: [EncuestasModule,AuthModule, UsersModule, 
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'oracle',
    logging: true,
    /*envFilePath: enviroments[process.env.NODE_ENV] || '.env', // 
    isGlobal: true, */ 
      connectString: /*process.env.ORA_CONECTION, //*/'192.168.1.14:1521/FINANC',
    port: /*parseInt(process.env.ORA_PORT),//*/1521,
    username: /*process.env.ORA_USERNAME,//*/'WSISRPS',
    password: /*process.env.ORA_PASSWORD,//*/'4pl1c4c10n3sw3b',
    database: /*process.env.ORA_DATABASE,//*/'FINANC',  
    //schema: /*process.env.ORA_SCHEMA,//*/'SISRPS',
    entities: [
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
      Rps_App_Entity  ],
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }