import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Autenticar funcionário e gerar token JWT '})
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.senha);
    }

}
