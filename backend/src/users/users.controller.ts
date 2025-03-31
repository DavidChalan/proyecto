import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@Request(), 'req') ;{
  return req.user;
}
