import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EncuestasModule } from './encuestas/encuestas.module';
import { Sis_Rol_Entity } from './encuestas/entities/gsi_rol_entity';
import { Sis_Usr_Entity } from './encuestas/entities/gsi_usr_entity';
import { UsersModule } from './encuestas/users/users.module';
@Module({
  imports: [EncuestasModule,AuthModule,
    UsersModule, 
    ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'oracle',
    logging: true,
    /*envFilePath: enviroments[process.env.NODE_ENV] || '.env', // 
    isGlobal: true, */ 
  
    connectString: process.env.ORA_CONECTION, //'192.168.1.14:1521/FINANC',
    port: parseInt(process.env.ORA_PORT),//1521,
    username: process.env.ORA_USERNAME,//'WSISGSI',
    password: process.env.ORA_PASSWORD,//'4pl1c4c10n3sw3b',
    database: process.env.ORA_DATABASE,//'FINANC',  
    schema: process.env.ORA_SCHEMA,
    entities: [Sis_Rol_Entity, Sis_Usr_Entity,],
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }