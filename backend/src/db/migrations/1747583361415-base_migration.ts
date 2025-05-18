import { MigrationInterface, QueryRunner } from 'typeorm'

export class BaseMigration1747583361415 implements MigrationInterface {
  name = 'BaseMigration1747583361415'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "film" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "filmIds" integer array NOT NULL, "categoryId" integer, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )

    await queryRunner.query(`
      INSERT INTO "film" (name) VALUES
      ('The Matrix'),
      ('Inception'),
      ('Interstellar'),
      ('The Dark Knight'),
      ('Pulp Fiction')
    `)
    await queryRunner.query(`
      INSERT INTO "category" (name) VALUES
      ('Action'),
      ('Drama')
    `)
    await queryRunner.query(`
      INSERT INTO "sub_category" (name, "filmIds", "categoryId") VALUES
      ('Sci-Fi', ARRAY[1,2,3], 1),
      ('Superheroes', ARRAY[1,2,4], 1),
      ('Historical', ARRAY[1,3,5], 2),
      ('Romance', ARRAY[2,3,5], 2)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`)
    await queryRunner.query(`DROP TABLE "category"`)
    await queryRunner.query(`DROP TABLE "sub_category"`)
    await queryRunner.query(`DROP TABLE "film"`)
  }
}
