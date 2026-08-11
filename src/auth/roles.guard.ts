import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate { //can activate é um guard puro do Nest que retorna true ou false
  constructor(private reflector: Reflector) {} //injeta o reflector, a ferramenta que sabe ler os metadados anexados por decorators

  //antes de deixar rodar o comportamento original do guard rodar ele checa se a rota tem o isPublic
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ //getAllAndOverride busca um metadado especifico
      context.getHandler(),
      context.getClass(),
    ]);

    //Se a rota n tiver roles libera.
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    //compara se o a role do decorator e do user que extraiu do banco são iguais
    return requiredRoles.includes(user?.role);
  }
}