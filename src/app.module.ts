import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { JobpostModule } from './jobpost/jobpost.module';

@Module({
  imports: [DatabaseModule, JobpostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
