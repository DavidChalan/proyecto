import { Injectable } from '@nestjs/common';
import { CreateContractUpdateDto } from './dto/create-contract-update.dto';
import { UpdateContractUpdateDto } from './dto/update-contract-update.dto';

@Injectable()
export class ContractUpdateService {
  create(createContractUpdateDto: CreateContractUpdateDto) {
    return 'This action adds a new contractUpdate';
  }

  findAll() {
    return `This action returns all contractUpdate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contractUpdate`;
  }

  update(id: number, updateContractUpdateDto: UpdateContractUpdateDto) {
    return `This action updates a #${id} contractUpdate`;
  }

  remove(id: number) {
    return `This action removes a #${id} contractUpdate`;
  }
}
