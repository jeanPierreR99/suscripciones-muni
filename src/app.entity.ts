import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class App {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    nombres: string;

    @Column({ nullable: true })
    documento: string;

    @Column({ nullable: true })
    edad: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    correo: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({ nullable: true })
    celular: string;

    @Column({ nullable: true })
    lengua: string;

    @Column({ nullable: true })
    tipoDocumento: string;

    @Column({ nullable: true })
    otroDocumento: string;

    @Column({ nullable: true })
    ajuste: string;

    @Column({ nullable: true })
    ajusteTipo: string;

    @Column({ nullable: true })
    orgNombre: string;

    @Column({ nullable: true })
    orgRuc: string;

    @Column({ nullable: true })
    orgDireccion: string;

    @Column({ nullable: true })
    orgTipo: string;

    @Column({ nullable: true })
    intervencion: string;

    @Column({ nullable: true })
    aceptacion: string;

    @Column({ type: 'datetime', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', nullable: true })
    create_at: Date;
}
