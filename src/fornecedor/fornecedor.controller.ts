import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Fornecedores')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo fornecedor' })
  create(
    @Body() createFornecedorDto: CreateFornecedorDto
  ): Promise<Fornecedor> {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os fornecedores' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.fornecedorService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um fornecedor pelo ID' })
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um fornecedor pelo ID' })
  update(@Param('id') id: string, @Body() updateFornecedorDto: UpdateFornecedorDto) {
    return this.fornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um fornecedor pelo ID' })
  remove(@Param('id') id: string) {
    return this.fornecedorService.remove(+id);
  }
}
