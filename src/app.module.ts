import { Module } from '@nestjs/common';
import { DatabaseModule } from './presupuesto/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presupuesto } from './presupuesto/app.entity';
import { AppController } from './presupuesto/app.controller';
import { AppService } from './presupuesto/app.service';
import { App } from './audiencia/app.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      Presupuesto, App
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
