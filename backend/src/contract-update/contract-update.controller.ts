import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContractUpdateService } from './contract-update.service';
import { CreateContractUpdateDto } from './dto/create-contract-update.dto';
import { UpdateContractUpdateDto } from './dto/update-contract-update.dto';

@Controller('contract-update')
export class ContractUpdateController {
  constructor(private readonly contractUpdateService: ContractUpdateService) {}

  @Post()
  create(@Body() createContractUpdateDto: CreateContractUpdateDto) {
    return this.contractUpdateService.create(createContractUpdateDto);
  }

  @Get()
  findAll() {
    return this.contractUpdateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractUpdateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractUpdateDto: UpdateContractUpdateDto,
  ) {
    return this.contractUpdateService.update(+id, updateContractUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractUpdateService.remove(+id);
  }
}
