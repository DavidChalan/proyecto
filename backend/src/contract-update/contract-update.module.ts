import { Module } from '@nestjs/common';
import { ContractUpdateService } from './contract-update.service';
import { ContractUpdateController } from './contract-update.controller';

@Module({
  controllers: [ContractUpdateController],
  providers: [ContractUpdateService],
})
export class ContractUpdateModule {}
