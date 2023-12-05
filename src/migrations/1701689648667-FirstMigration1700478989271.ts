import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration17004789892711701689648667 implements MigrationInterface {
    name = 'FirstMigration17004789892711701689648667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_29c7d588c0c08daae28f20f0feb"`);
        await queryRunner.query(`ALTER TABLE "sensors" RENAME COLUMN "station.name" TO "stationName"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_38a57fec896c5889edf7837b1af" FOREIGN KEY ("stationName") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_38a57fec896c5889edf7837b1af"`);
        await queryRunner.query(`ALTER TABLE "sensors" RENAME COLUMN "stationName" TO "station.name"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_29c7d588c0c08daae28f20f0feb" FOREIGN KEY ("station.name") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
