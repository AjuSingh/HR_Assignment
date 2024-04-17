import { inject, injectable } from "inversify";
import Express from "./expressLoader";
import DBLoader from "./dbLoader";

@injectable()
export default class App {

    constructor(
        @inject('Express') private express: Express,
        @inject('DBLoader') private dbLoader: DBLoader
    ) { }

    public async bootstrap() {
        this.express.init();
        await this.dbLoader.load();
    }
}