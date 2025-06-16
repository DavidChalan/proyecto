import { Controller, Post, Get, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService,
   private readonly httpService: HttpService
  ) { }
  // ✅ Nuevo endpoint para reenviar datos a Make
  @Post('send-to-make')
  async sendToMake(@Body() payload: any) {
    try {
      const webhookUrl = 'https://hook.eu2.make.com/su3vbrnyzq27guuu8pdvov6lri7bcmzq'; // <-- cambia esto por tu URL real
      const response = await lastValueFrom(
        this.httpService.post(webhookUrl, payload)
      );
      return { success: true, response: response.data };
    } catch (error) {
      throw new HttpException('Error al contactar con Make', HttpStatus.BAD_GATEWAY);
    }
  }
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
