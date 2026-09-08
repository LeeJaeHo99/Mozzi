import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './modules/base/filters/httpException.filter';
import { LogInterceptor } from './modules/base/interceptors/LogInterceptor.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // HELMET
    app.use(helmet());

    // CORS
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });

    // SWAGGER
    const config = new DocumentBuilder().setTitle('Mozzi API').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('Mozzi-api', app, document);

    // GUARD
    app.useGlobalGuards();

    // INTERCEPTOR
    app.useGlobalInterceptors(
        new LogInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    // PIPE
    app.useGlobalPipes(new ValidationPipe());

    // FILTER
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(Number(process.env.PORT));
}

bootstrap();