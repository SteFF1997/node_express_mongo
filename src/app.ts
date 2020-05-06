import colors from 'colors';
import express, { Application } from 'express';

class App {
  public app: Application;
  public port: string;

  constructor(appInit: { port: string; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        colors.blue.bold(`App listening on the http://localhost:${this.port}`)
      );
    });
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
