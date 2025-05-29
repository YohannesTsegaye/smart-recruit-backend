import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

interface DatabaseError {
  message: string;
}

@Controller()
export class AppController {
  constructor(private dataSource: DataSource) {}

  @Get('/healthcheck')
  async healthCheck() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'healthy',
        database: 'connected',
      };
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      return {
        status: 'unhealthy',
        database: 'disconnected',
        error: dbError.message || 'Unknown database error',
      };
    }
  }
}
