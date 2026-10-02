import { Module } from '@nestjs/common';
import { BankClientService } from './bank.client.service';

@Module({
  providers: [BankClientService]
})
export class BankModule {}
