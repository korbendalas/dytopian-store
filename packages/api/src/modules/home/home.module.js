// import { ClassSerializerInterceptor, Module } from '@nestjs/common';
// import { HomeController } from './home.controller';
// import { HomeService } from './home.service';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { DatabaseModule } from '@database/database.module';
//
// @Module({
//   imports: [DatabaseModule],
//   controllers: [HomeController],
//   providers: [
//     HomeService,
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: ClassSerializerInterceptor,
//     },
//   ],
// })
// export class HomeModule {}
