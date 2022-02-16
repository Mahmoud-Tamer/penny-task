import { UserDto } from './../user/user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async findAll(@Request() req): Promise<any[]> {
    try {
      const { authorization } = req.headers;

      const token = authorization.replace('Bearer ', '');
      const userInfo = this.jwtService.decode(token);
      if (
        new Date().getTime() - new Date(userInfo['signDate']).getTime() >=
        1000 * 60 * 60 * 8
      ) {
        throw new UnauthorizedException('expired token');
      }
    } catch (err) {}

    return await this.authService.findAll();
  }

  @Post('signUp')
  async register(@Body() req: UserDto, @Res() res) {
    const result = await this.authService.register(req);
    res.status(result.statusCode).send(result);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  async login(@Body() @Request() req: UserDto, @Res() res) {
    const result = await this.authService.login(req);
    res.status(result.statusCode).send(result);
  }
}
