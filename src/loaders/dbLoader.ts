import { injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import path from "path";
import { SequelizeTypescriptMigration } from "sequelize-typescript-migration-lts";

@injectable()
export default class DBLoader {


    public async load() {
        try {
            const modelPath = path.join(__dirname, "../models");
            const client = new Sequelize(process.env.DB_URL!, {
                models: [modelPath],
                dialect: 'postgres',
                logging: false
            });

            await SequelizeTypescriptMigration.makeMigration(client, {
                outDir: path.join(__dirname, "../migrations"),
                migrationName: "migrations",
                preview: false,
            });

            await client.sync({ alter: false });
            console.log('Connected to neon db');
        } catch (err) {
            console.log("Error", err);
        }
    }
}