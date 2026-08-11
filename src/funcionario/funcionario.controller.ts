import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Funcionários')
@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  create(
    @Body() createFuncionarioDto: CreateFuncionarioDto
  ): Promise<Omit<Funcionario, 'senha'>> { //no create temos que usar o omit para tirar o senha do return
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ) {
    return this.funcionarioService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID' })
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar um funcionário pelo ID' })
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) 
  : Promise<Omit<Funcionario, 'senha'>> {
    return this.funcionarioService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um funcionário pelo ID' })
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
