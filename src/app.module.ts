import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthMiddleware } from './todo/middleware/auth.middleware';
import { TodoController } from './todo/todo.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TodoModule, CommonModule, TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '',
    database: 'todo',
    autoLoadEntities: true,
    synchronize: true,
    logging: true
    }
    ), JwtModule.register({
      global: true,
      secret: 'hamza13072001',
      signOptions: { expiresIn: '3600s' },
    })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'v2/todo',
        method: RequestMethod.POST,
      },
      {
        path: 'v2/todo/update/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'v2/todo/delete/:id',
        method: RequestMethod.DELETE,
      });
      // .forRoutes({ path: 'todo', method: RequestMethod.POST });
  }
}
