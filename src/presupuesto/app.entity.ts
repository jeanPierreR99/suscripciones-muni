import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type ZoneType = "CERCADO" | "KM" | "OTROS";
export type Gender = "M" | "F";

@Entity()
export class Presupuesto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // =========================
    // ORGANIZATION DATA
    // =========================
    @Column({ nullable: true })
    organizationName: string;

    @Column({ nullable: true, type: 'int' })
    foundationYears: number;

    @Column({ nullable: true })
    registrationNumber: string;

    @Column({ nullable: true })
    locationName: string;

    @Column({ nullable: true, type: 'varchar', length: 20 })
    zone: ZoneType;

    // =========================
    // TITULAR PARTICIPANT
    // =========================
    @Column({ nullable: true })
    titularFullName: string;

    @Column({ nullable: true })
    titularPosition: string;

    @Column({ nullable: true, type: 'varchar', length: 1 })
    titularGender: Gender;

    @Column({ nullable: true })
    titularBirthDate: string;

    @Column({ nullable: true })
    titularDni: string;

    @Column({ nullable: true })
    titularEmail: string;

    @Column({ nullable: true })
    titularEducationLevel: string;

    @Column({ nullable: true, type: 'boolean' })
    titularParticipatedBefore: boolean;

    @Column({ nullable: true, type: 'int' })
    titularParticipationYear: number;

    // =========================
    // SUPLENTE PARTICIPANT
    // =========================
    @Column({ nullable: true })
    suplenteFullName: string;

    @Column({ nullable: true })
    suplentePosition: string;

    @Column({ nullable: true, type: 'varchar', length: 1 })
    suplenteGender: Gender;

    @Column({ nullable: true })
    suplenteBirthDate: string;

    @Column({ nullable: true })
    suplenteDni: string;

    @Column({ nullable: true })
    suplenteEmail: string;

    @Column({ nullable: true })
    suplenteEducationLevel: string;

    @Column({ nullable: true, type: 'boolean' })
    suplenteParticipatedBefore: boolean;

    @Column({ nullable: true, type: 'int' })
    suplenteParticipationYear: number;

    @Column({ type: 'datetime', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', nullable: true })
    create_at: Date;
}
