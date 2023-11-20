import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1700478989271 implements MigrationInterface {
    name = 'FirstMigration1700478989271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stations" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "localization" character varying(50) NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensors" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "value" double precision NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "stationId" integer, CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_2c9180d690c5c1d79afc59ec3f2" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_2c9180d690c5c1d79afc59ec3f2"`);
        await queryRunner.query(`DROP TABLE "sensors"`);
        await queryRunner.query(`DROP TABLE "stations"`);
    }

}
