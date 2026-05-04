import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bmmetais ERP API')
    .setDescription('Documentação da API do sistema de gestão Bmmetais ERP')
    .setVersion('1.0')
    .addBearerAuth() // Adicione este método se sua API usa autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A UI do Swagger estará disponível em '/swagger'

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
