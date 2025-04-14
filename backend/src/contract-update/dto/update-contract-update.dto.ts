import { PartialType } from '@nestjs/mapped-types';
import { CreateContractUpdateDto } from './create-contract-update.dto';

export class UpdateContractUpdateDto extends PartialType(
  CreateContractUpdateDto,
) {}
