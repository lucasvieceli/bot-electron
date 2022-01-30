import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('Config')
export default class Config {
    // @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id?: string;

    @Column()
    intervalWork: string;

    @Column()
    intervalRefreshHeroes: string;

    @Column()
    intervalCheckLogin: string;

    @Column()
    thresholdDefault: string;

    @Column()
    thresholdHeroCommon: string;

    @Column()
    thresholdHeroRare: string;

    @Column()
    thresholdHeroSuperRare: string;

    @Column()
    thresholdHeroEpic: string;

    @Column()
    thresholdHeroLegend: string;

    @Column()
    thresholdHeroSuperLegend: string;

    @Column()
    thresholdButtonMetamask: string;

    @Column()
    thresholdButtonWork: string;

    @Column()
    thresholdBarLife: string;

    @Column()
    newMapEnable: string;

    @Column()
    newMapHeroCommon: string;

    @Column()
    newMapHeroRare: string;

    @Column()
    newMapHeroSuperRare: string;

    @Column()
    newMapHeroEpic: string;

    @Column()
    newMapHeroLegend: string;

    @Column()
    newMapHeroSuperLegend: string;

    @Column()
    newMapTime: string;
}
