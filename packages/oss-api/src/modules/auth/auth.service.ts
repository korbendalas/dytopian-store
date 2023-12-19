import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../user/dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import { OSSUser, UserType } from '@prisma/client';
import { SigninDto } from '../user/dtos/signin.dto';
import { UserResponseDTO } from '../user/dtos/response.dto';
import { CommonService } from '../common/common.service';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly jwtExpirationTime: string;
  private readonly jwtRefreshExpirationTime: string;
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly bcryptSalt: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private prismaService: PrismaService,
    private readonly commonService: CommonService, // private readonly blacklistedTokensRepository: EntityRepository<BlacklistedTokenEntity>, // private readonly usersService: UsersService, // private readonly jwtService: JwtService, // private readonly mailerService: MailerService,
  ) {
    this.jwtExpirationTime = configService.get<string>('jwt.access.time');
    this.jwtSecret = configService.get<string>('jwt.access.secret');
    this.jwtRefreshSecret = configService.get<string>('jwt.refresh.secret');
    this.jwtRefreshExpirationTime =
      configService.get<string>('jwt.refresh.time');
    this.bcryptSalt = configService.get<number>('bcrypt.salt');
  }

  async signup({
    firstName,
    lastName,
    email,
    password,
    username,
    userType = UserType.MODERATOR,
  }: SignupDto): Promise<AuthResponseDto> {
    const user = await this.prismaService.oSSUser.findUnique({
      where: { email },
    });
    // TODO - add email service to send user its email and password

    if (user) {
      throw new ConflictException();
    }

    const newUser: OSSUser = await this.prismaService.oSSUser.create({
      data: {
        firstName,
        lastName,
        email,
        password: await this.hashData(password),
        username,
        userType,
      },
    });
    delete newUser.password;
    const { accessToken: token, refreshToken } = await this.generateTokens({
      username,
      id: newUser.id,
    });
    await this.updateRefreshTokenHash(newUser.id, refreshToken);
    return { token, refreshToken, user: { ...newUser } };
  }

  async signin({ email, password }: SigninDto): Promise<AuthResponseDto> {
    const user = await this.prismaService.oSSUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const { accessToken: token, refreshToken } = await this.generateTokens({
      username: user.username,
      id: user.id,
    });
    delete user.password;
    await this.updateRefreshTokenHash(user.id, refreshToken);
    delete user.hashedRefreshToken;
    return { token, refreshToken, user };
  }

  async logout(userId: number) {
    await this.prismaService.oSSUser.updateMany({
      where: { id: userId, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });
  }

  async refreshTokens(
    id: number,
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.prismaService.oSSUser.findUnique({
      where: { id },
    });

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken: token, refreshToken: newRefreshToken } =
      await this.generateTokens({
        username: user.username,
        id: user.id,
      });
    await this.updateRefreshTokenHash(user.id, newRefreshToken);
    return { token, refreshToken: newRefreshToken };
  }

  async generateTokens({ username, id }) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { username, id },
        { expiresIn: this.jwtExpirationTime, secret: this.jwtSecret },
      ),
      this.jwtService.signAsync(
        { username, id },
        {
          expiresIn: this.jwtRefreshExpirationTime,
          secret: this.jwtRefreshSecret,
        },
      ),
    ]);
    return { accessToken: token, refreshToken };
  }
  async checkUsername(username: string): Promise<boolean> {
    const user = await this.prismaService.oSSUser.findUnique({
      where: { username },
    });
    return !!user;
  }

  async updateRefreshTokenHash(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    return this.prismaService.oSSUser.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, Number(process.env.BCRYPT_SALT_ROUNDS));
  }
}
