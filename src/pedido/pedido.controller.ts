import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Pedidos')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  create(
    @Body() createPedidoDto: CreatePedidoDto
  ): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.pedidoService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar um pedido pelo ID' })
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Deletar um pedido pelo ID' })
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
