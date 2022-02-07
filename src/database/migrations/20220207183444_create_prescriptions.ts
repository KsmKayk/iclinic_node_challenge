import { Knex } from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable("prescriptions", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.integer("clinic_id").notNullable()
        table.integer("physician_id").notNullable()
        table.integer("patient_id").notNullable()
        table.text("text").notNullable()
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable()
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable()
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("prescriptions")
}

