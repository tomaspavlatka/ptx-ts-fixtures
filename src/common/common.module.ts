import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { IdService } from './services/id.service';
import { DateService } from './services/date.service';

@Module({
  providers: [PrismaService, IdService, DateService],
  exports: [PrismaService, IdService, DateService],
})
export class CommonModule {}
