import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presupuesto } from './app.entity';
import { Workbook } from 'exceljs';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Presupuesto)
        private readonly appRepository: Repository<Presupuesto>,
    ) { }

    async create(data: Partial<Presupuesto>): Promise<Presupuesto> {
        const nuevoRegistro = this.appRepository.create(data);
        return this.appRepository.save(nuevoRegistro);
    }

    async findAll(): Promise<Presupuesto[]> {
        return this.appRepository.find({
            order: { create_at: 'DESC' },
        });
    }

    async generateExcelData(): Promise<Buffer> {
        const registros = await this.appRepository.find();

        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('Participantes Presupuesto');

        sheet.columns = [
            { header: 'Organización', key: 'organizationName', width: 25 },
            { header: 'Años Fundación', key: 'foundationYears', width: 15 },
            { header: 'Partida Registral', key: 'registrationNumber', width: 20 },
            { header: 'Ubicación', key: 'locationName', width: 25 },
            { header: 'Zona', key: 'zone', width: 15 },
            { header: 'Titular Nombres', key: 'titularFullName', width: 30 },
            { header: 'Titular Cargo', key: 'titularPosition', width: 20 },
            { header: 'Titular Género', key: 'titularGender', width: 15 },
            { header: 'Titular F. Nacimiento', key: 'titularBirthDate', width: 20 },
            { header: 'Titular DNI', key: 'titularDni', width: 15 },
            { header: 'Titular Correo', key: 'titularEmail', width: 25 },
            { header: 'Titular Educación', key: 'titularEducationLevel', width: 25 },
            { header: 'Titular Participó Antes', key: 'titularParticipatedBefore', width: 15 },
            { header: 'Titular Año Participación', key: 'titularParticipationYear', width: 15 },
            { header: 'Suplente Nombres', key: 'suplenteFullName', width: 30 },
            { header: 'Suplente Cargo', key: 'suplentePosition', width: 20 },
            { header: 'Suplente Género', key: 'suplenteGender', width: 15 },
            { header: 'Suplente F. Nacimiento', key: 'suplenteBirthDate', width: 20 },
            { header: 'Suplente DNI', key: 'suplenteDni', width: 15 },
            { header: 'Suplente Correo', key: 'suplenteEmail', width: 25 },
            { header: 'Suplente Educación', key: 'suplenteEducationLevel', width: 25 },
            { header: 'Suplente Participó Antes', key: 'suplenteParticipatedBefore', width: 15 },
            { header: 'Suplente Año Participación', key: 'suplenteParticipationYear', width: 15 },
            { header: 'Fecha Registro', key: 'create_at', width: 20 },
        ];

        sheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFB8CCE4' },
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });

        sheet.getRow(1).height = 30;

        registros.forEach((item) => {
            const row = sheet.addRow({
                organizationName: item.organizationName,
                foundationYears: item.foundationYears,
                registrationNumber: item.registrationNumber,
                locationName: item.locationName,
                zone: item.zone,
                titularFullName: item.titularFullName,
                titularPosition: item.titularPosition,
                titularGender: item.titularGender,
                titularBirthDate: item.titularBirthDate,
                titularDni: item.titularDni,
                titularEmail: item.titularEmail,
                titularEducationLevel: item.titularEducationLevel,
                titularParticipatedBefore: item.titularParticipatedBefore ? 'Sí' : 'No',
                titularParticipationYear: item.titularParticipationYear,
                suplenteFullName: item.suplenteFullName,
                suplentePosition: item.suplentePosition,
                suplenteGender: item.suplenteGender,
                suplenteBirthDate: item.suplenteBirthDate,
                suplenteDni: item.suplenteDni,
                suplenteEmail: item.suplenteEmail,
                suplenteEducationLevel: item.suplenteEducationLevel,
                suplenteParticipatedBefore: item.suplenteParticipatedBefore ? 'Sí' : 'No',
                suplenteParticipationYear: item.suplenteParticipationYear,
                create_at: item.create_at?.toLocaleString() || '',
            });

            row.eachCell(cell => {
                cell.alignment = { wrapText: true, vertical: 'middle' };
            });

            row.height = 40;
        });

        return await workbook.xlsx.writeBuffer() as any;
    }
}
