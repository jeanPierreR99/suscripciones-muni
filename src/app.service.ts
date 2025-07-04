import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from './app.entity';
import { Workbook } from 'exceljs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) { }

  async create(data: Partial<App>): Promise<App> {
    const nuevoRegistro = this.appRepository.create(data);
    return this.appRepository.save(nuevoRegistro);
  }

  async findAll(): Promise<App[]> {
    return this.appRepository.find({
      order: { create_at: 'DESC' },
    });
  }

  async generateExcelData(): Promise<Buffer> {
    const registros = await this.appRepository.find();

    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Participantes');

    sheet.columns = [
      { header: 'Nombres', key: 'nombres', width: 25 },
      { header: 'Documento', key: 'documento', width: 20 },
      { header: 'Edad', key: 'edad', width: 10 },
      { header: 'Dirección', key: 'direccion', width: 30 },
      { header: 'Correo', key: 'correo', width: 25 },
      { header: 'Teléfono', key: 'telefono', width: 15 },
      { header: 'Celular', key: 'celular', width: 15 },
      { header: 'Lengua', key: 'lengua', width: 15 },
      { header: 'Tipo Documento', key: 'tipoDocumento', width: 20 },
      { header: 'Otro Documento', key: 'otroDocumento', width: 20 },
      { header: 'Ajuste', key: 'ajuste', width: 15 },
      { header: 'Ajuste Tipo', key: 'ajusteTipo', width: 25 },
      { header: 'Org. Nombre', key: 'orgNombre', width: 25 },
      { header: 'Org. RUC', key: 'orgRuc', width: 20 },
      { header: 'Org. Dirección', key: 'orgDireccion', width: 30 },
      { header: 'Org. Tipo', key: 'orgTipo', width: 25 },
      { header: 'Intervención', key: 'intervencion', width: 40 },
      { header: 'Aceptación', key: 'aceptacion', width: 10 },
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
        nombres: item.nombres,
        documento: item.documento,
        edad: item.edad,
        direccion: item.direccion,
        correo: item.correo,
        telefono: item.telefono,
        celular: item.celular,
        lengua: item.lengua,
        tipoDocumento: item.tipoDocumento,
        otroDocumento: item.otroDocumento,
        ajuste: item.ajuste,
        ajusteTipo: item.ajusteTipo,
        orgNombre: item.orgNombre,
        orgRuc: item.orgRuc,
        orgDireccion: item.orgDireccion,
        orgTipo: item.orgTipo,
        intervencion: item.intervencion,
        aceptacion: item.aceptacion,
        create_at: item.create_at?.toLocaleString() || '',
      });

      row.eachCell(cell => {
        cell.alignment = { wrapText: true, vertical: 'middle' };
      });

      row.height = 40;
    });

    return await workbook.xlsx.writeBuffer() as Buffer;
  }
}
