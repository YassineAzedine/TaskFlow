import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { SprintsModule } from './sprints/sprints.module';

@Module({
  imports: [
    // Charge le .env globalement
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure MongoDB Atlas via Mongoose de manière asynchrone
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        dbName: config.get<string>('MONGODB_DB') || 'trello_db',
      }),
    }),

    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    SprintsModule,
  ],
})
export class AppModule {}
