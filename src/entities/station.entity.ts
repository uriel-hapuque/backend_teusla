import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Sensor } from "./sensor.entity";

@Entity("stations")
export class Station{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, unique: true })
    name: string;
  
    @Column({ type: "varchar", length: 50})
    localization: string;
  
    @Column({ type: "boolean"})
    is_active: boolean;

    @OneToMany(() => Sensor, (sensor) => sensor.station)
    sensors: Sensor[];
}