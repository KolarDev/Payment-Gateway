import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [BankModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
