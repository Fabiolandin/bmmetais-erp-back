import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly prisma: PrismaService
    
    @Inject()
    private readonly jwtService: JwtService


    async login(email: string, senha: string) {

        // Verifica se o funcionário existe
        const funcionario = await this.prisma.funcionario.findUnique({
            where: { email },
        });


        if (!funcionario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await bcrypt.compare(senha, funcionario.senha);

        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Cria o payload do JWT
        const payload = {
            sub: funcionario.id,
            email: funcionario.email,
            role: funcionario.role,
        };

        return {
            access_token: await this.jwtService.sign(payload),
        };
    }
}
