import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) { }

  /**
   * Este endpoint lo llama Make.com automáticamente una vez el contrato ha sido generado
   */
  @Post('save-from-make')
  async saveFromMake(@Body() body: { name: string; webViewLink: string; type: string }) {
    return await this.contractsService.saveFromMake(body);
  }

  /**
   * Este endpoint lo llama el frontend para obtener la lista de contratos guardados
   */
  @Get()
  async findAll() {
    return await this.contractsService.findAll();
  }

  // ✅ Esto es lo que te falta
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  /* Este endpoint elimina un contrato por su ID */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.contractsService.deleteContract(id);
    if (result.deleted) {
      return {
        message: `Contrato con el id ${ id } eliminado correctamente`
      };

    } else {
      return { message: `Contrato con el id ${ id } no encontrado`};
    }
  }
}
