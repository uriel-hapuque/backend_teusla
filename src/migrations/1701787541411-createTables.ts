import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1701787541411 implements MigrationInterface {
    name = 'CreateTables1701787541411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "localization" character varying(50) NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "UQ_998a2ff0191749951c74b9ba890" UNIQUE ("name"), CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "value" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "stationName" uuid, CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_38a57fec896c5889edf7837b1af" FOREIGN KEY ("stationName") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_38a57fec896c5889edf7837b1af"`);
        await queryRunner.query(`DROP TABLE "sensors"`);
        await queryRunner.query(`DROP TABLE "stations"`);
    }

}
