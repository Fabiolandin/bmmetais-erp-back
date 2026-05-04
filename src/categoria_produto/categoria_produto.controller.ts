import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriaProdutoService } from './categoria_produto.service';
import { CreateCategoriaProdutoDto } from './dto/create-categoria_produto.dto';
import { UpdateCategoriaProdutoDto } from './dto/update-categoria_produto.dto';
import { Categoria_Produto } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias de Produtos')
@Controller('categoria')
export class CategoriaProdutoController {
  constructor(private readonly categoriaProdutoService: CategoriaProdutoService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  create(
    @Body() createCategoriaProdutoDto: CreateCategoriaProdutoDto
  ): Promise<Categoria_Produto> {
    return this.categoriaProdutoService.create(createCategoriaProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.categoriaProdutoService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma categoria pelo ID' })
  findOne(@Param('id') id: string) {
    return this.categoriaProdutoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria pelo ID' })
  update(@Param('id') id: string, @Body() updateCategoriaProdutoDto: UpdateCategoriaProdutoDto) {
    return this.categoriaProdutoService.update(+id, updateCategoriaProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma categoria pelo ID' })
  remove(@Param('id') id: string) {
    return this.categoriaProdutoService.remove(+id);
  }
}
