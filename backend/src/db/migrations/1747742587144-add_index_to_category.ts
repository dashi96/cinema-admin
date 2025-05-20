import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddIndexToCategory1747742587144 implements MigrationInterface {
  name = 'AddIndexToCategory1747742587144'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7745a7cea2687ee7b048f828c7" ON "sub_category" ("name") `)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_23c05c292c439d77b0de816b50"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_7745a7cea2687ee7b048f828c7"`)
  }
}
