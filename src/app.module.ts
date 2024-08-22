import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { LeadsModule } from './leads/leads.module';
import { InteractionsModule } from './interactions/interactions.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CustomersModule, LeadsModule, InteractionsModule],
  providers: [PrismaService],
})
export class AppModule {}
