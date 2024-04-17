import 'reflect-metadata'
import 'dotenv/config'
import DIContainer from './loaders/containerLoader';
import App from './loaders';


function startServer(){
    DIContainer.configure();
    const app = DIContainer.container.get<App>('App');
    app.bootstrap();
}

startServer();