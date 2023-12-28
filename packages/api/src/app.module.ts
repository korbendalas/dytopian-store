import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
// import { HomeModule } from './modules/home/home.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import type { ClientOpts } from 'redis';
import { AtGuard } from './common/guards/at.guard';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { RBAC_POLICY } from './modules/auth/rbac-policy';
import { CartModule } from './modules/cart/cart.module';
import { CommonModule } from './modules/common/common.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { ProductsModule } from './modules/products/products.module';
import { RemovePasswordInterceptor } from './modules/user/interceptors/removePassword.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    // CacheModule.register<ClientOpts>({
    //   store: redisStore,
    //   isGlobal: true,
    //   ttl: 60,
    //   host: '127.0.0.1',
    //   port: 6379,
    //   // url: 'redis://localhost:6379',
    //   //  host: 'redis://localhost:6379', // process.env.REDIS_HOST,
    //   //port: Number(process.env.REDIS_PORT),
    //   // ttl: Number(process.env.REDIS_TTL),
    // }),
    CommonModule,
    PrismaModule,
    AuthModule,
    MailerModule,
    UserModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UserInterceptor,
    // },

    { provide: APP_INTERCEPTOR, useClass: RemovePasswordInterceptor },
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: ACGuard },
  ],
})
export class AppModule {}
