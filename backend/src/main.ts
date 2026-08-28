import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // HELMET
    app.use(helmet());

    // CORS
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });


    await app.listen(Number(process.env.PORT));
}

bootstrap();