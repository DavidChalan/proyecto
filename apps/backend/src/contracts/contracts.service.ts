import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fetch from 'node-fetch';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepo: Repository<Contract>,
  ) { }

  /*Guarda el contrato en la base de datos cuando Make lo genera*/
  async saveFromMake(payload: {
    name: string;
    webViewLink: string;
    type: string;
  }): Promise<Contract> {
    const { name, webViewLink, type } = payload;

    const contract = this.contractsRepo.create({
      name,
      type,
      webViewLink
    });

    return this.contractsRepo.save(contract);
  }

  /*
    Devuelve todos los contratos guardados en orden descendente por fecha
   */
  findAll(): Promise<Contract[]> {
    return this.contractsRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
  /*
    Devuelve un contrato por su ID
   */
  async findOne(id: string) {
    return await this.contractsRepo.findOne({ where: { id: Number(id) } });
  }
  /*
    Elimina un contrato por su ID
   */
  async deleteContract(id: string): Promise<{ deleted: boolean }> {
    const result = await this.contractsRepo.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}
