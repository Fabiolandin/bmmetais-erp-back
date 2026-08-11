import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // 'jwt' é o jwt.strategy.ts que foi registrado no sistema passport
  constructor(private reflector: Reflector) { //injeta o reflector, a ferramenta que sabe ler os metadados anexados por decorators 
    super();
  }

  //antes de deixar rodar o comportamento original do guard rodar ele checa se a rota tem o isPublic
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ //getAllAndOverride busca um metadado especifico
      context.getHandler(), //checa primeiro
      context.getClass(), //se não achar checa aqui
    ]);

    //se a rota tiver o public roda normal sem dar check em token
    if (isPublic) {
      return true;
    }

    //se não tiver o public roda o comportamento de checkar o token
    return super.canActivate(context);
  }
}