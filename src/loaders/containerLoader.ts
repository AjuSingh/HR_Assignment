import { Container } from "inversify";
import Express from "./expressLoader";
import App from ".";
import DBLoader from "./dbLoader";
import AuthController from "../Controller/AuthController";
import CategoryController from "../Controller/CategoryController";
import ServiceController from "../Controller/ServiceController";

export default class DIContainer {
    static container = new Container();


    static configure() {
        DIContainer.container.bind<App>('App').to(App).inSingletonScope();
        DIContainer.container.bind<Express>('Express').to(Express).inSingletonScope();
        DIContainer.container.bind<DBLoader>('DBLoader').to(DBLoader).inSingletonScope();
        DIContainer.container.bind<AuthController>('AuthController').to(AuthController).inSingletonScope();
        DIContainer.container.bind<CategoryController>('CategoryController').to(CategoryController).inSingletonScope();
        DIContainer.container.bind<ServiceController>('ServiceController').to(ServiceController).inSingletonScope();
    }
}