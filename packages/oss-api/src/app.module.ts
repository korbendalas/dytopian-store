import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { AtGuard } from './common/guards/at.guard';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { RBAC_POLICY } from './modules/auth/rbac-policy';
import { CommonModule } from './modules/common/common.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { ProductsModule } from './modules/products/products.module';
import { RemovePasswordInterceptor } from './modules/user/interceptors/removePassword.interceptor';
import { ResponseInterceptor } from './modules/common/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    CommonModule,
    PrismaModule,
    AuthModule,
    MailerModule,
    UserModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: RemovePasswordInterceptor },
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: ACGuard },
  ],
})
export class AppModule {}
