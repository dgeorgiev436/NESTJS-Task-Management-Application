import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [
// 	Use ConfigModule for Configuration
	ConfigModule.forRoot({
		envFilePath: [`.env.stage.${process.env.STAGE}`]
	}),
    TasksModule,
	TypeOrmModule.forRootAsync({ // Initialize the TypeOrmModule asynchronous
		imports: [ConfigModule], // Depends on ConfigModule --> Wait for ConfigModule to finish initialization as it is a dependency
		inject: [ConfigService], // Inject the ConfigService
		useFactory: async (configService: ConfigService) => { // Dependency injection for configService 
			return {
				type: "postgres",
				autoLoadEntities: true,
				synchronize: true,
				host: configService.get("DB_HOST"),
				port: configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_DATABASE")
			}
		}
	}),
    AuthModule
  ]
})
export class AppModule {}
