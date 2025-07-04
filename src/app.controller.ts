import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './app.entity';
import { Response } from 'express';

@Controller('suscriptions')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAll(): Promise<App[]> {
    return this.appService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<App>): Promise<App> {
    return this.appService.create(data);
  }

  @Get('excel-data')
  async downloadUserTaskReport(
    @Res() res: Response,
  ) {
    const excelBuffer = await this.appService.generateExcelData(
    );
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=Reporte_suscripciones.xlsx`,
      'Content-Length': excelBuffer.length,
    });

    res.send(excelBuffer);
  }
}
