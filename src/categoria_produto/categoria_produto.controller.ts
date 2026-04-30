import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriaProdutoService } from './categoria_produto.service';
import { CreateCategoriaProdutoDto } from './dto/create-categoria_produto.dto';
import { UpdateCategoriaProdutoDto } from './dto/update-categoria_produto.dto';
import { Categoria_Produto } from '@prisma/client';

@Controller('categoria')
export class CategoriaProdutoController {
  constructor(private readonly categoriaProdutoService: CategoriaProdutoService) { }

  @Post()
  create(
    @Body() createCategoriaProdutoDto: CreateCategoriaProdutoDto
  ): Promise<Categoria_Produto> {
    return this.categoriaProdutoService.create(createCategoriaProdutoDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.categoriaProdutoService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaProdutoDto: UpdateCategoriaProdutoDto) {
    return this.categoriaProdutoService.update(+id, updateCategoriaProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaProdutoService.remove(+id);
  }
}
