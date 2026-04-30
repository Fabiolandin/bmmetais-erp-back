import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from '@prisma/client';

@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) { }

  @Post()
  create(
    @Body() createFornecedorDto: CreateFornecedorDto
  ): Promise<Fornecedor> {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.fornecedorService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFornecedorDto: UpdateFornecedorDto) {
    return this.fornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fornecedorService.remove(+id);
  }
}
