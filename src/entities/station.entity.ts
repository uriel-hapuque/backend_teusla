import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm"
import { Sensor } from "./sensor.entity";

@Entity("stations")
export class Station{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;
  
    @Column({ type: "varchar", length: 50})
    localization: string;
  
    @Column({ type: "boolean"})
    is_active: boolean;

    @OneToMany(() => Sensor, (sensor) => sensor.station)
    sensor: Sensor[];
}