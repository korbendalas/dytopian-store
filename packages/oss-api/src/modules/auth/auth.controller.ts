import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../user/dtos/signup.dto';
import { SigninDto } from '../user/dtos/signin.dto';
import { ConfigService } from '@nestjs/config';
import { IDomain } from '../../config/config.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard } from '../../common/guards/at.guard';
import { RtGuard } from '../../common/guards/rt.guard';
import { UserJwt } from '../../common/decorators/param-decorators/user-jwt.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  private readonly frontendUrl: IDomain;
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<IDomain>('domain');
  }

  @Public()
  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
  @Public()
  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@UserJwt() user) {
    return this.authService.refreshTokens(
      parseInt(user.id, 10),
      user.refreshToken,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@UserJwt('id') id: number) {
    this.authService.logout(id);
  }
}
