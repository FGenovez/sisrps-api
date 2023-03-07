import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EncuestasController } from './encuestas.controller';
import { EncuestasService } from './encuestas.service';
import { Sis_Rol_Entity } from './entities/gsi_rol_entity';
import { Sis_Usr_Entity } from './entities/gsi_usr_entity';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([ 
      Sis_Rol_Entity,
      Sis_Usr_Entity,
    ])],
  controllers: [EncuestasController],
  providers: [EncuestasService]
})
export class EncuestasModule {}
