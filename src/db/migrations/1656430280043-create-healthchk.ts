import { MigrationInterface, QueryRunner } from 'typeorm'

export class createHealthchk1656430280043 implements MigrationInterface {
  name = 'createHealthchk1656430280043'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "health_chk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9fb4a3920361ae3316cdc55612" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "health_chk"`)
  }
}
