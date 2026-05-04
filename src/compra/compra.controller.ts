import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Compra } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Compras')
@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova compra' })
  create(
    @Body() createCompraDto: CreateCompraDto
  ): Promise<Compra> {
    return this.compraService.create(createCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as compras' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.compraService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma compra pelo ID' })
  findOne(@Param('id') id: string) {
    return this.compraService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma compra pelo ID' })
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.compraService.update(+id, updateCompraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma compra pelo ID' })
  remove(@Param('id') id: string) {
    return this.compraService.remove(+id);
  }
}
