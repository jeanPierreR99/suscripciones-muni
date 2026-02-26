import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Presupuesto } from './app.entity';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('presupuesto')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    async findAll(): Promise<Presupuesto[]> {
        return this.appService.findAll();
    }

    @Post()
    async create(@Body() data: Partial<Presupuesto>): Promise<Presupuesto> {
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
            'Content-Disposition': `attachment; filename=Reporte_presupuesto.xlsx`,
            'Content-Length': excelBuffer.length,
        });

        res.send(excelBuffer);
    }
}
