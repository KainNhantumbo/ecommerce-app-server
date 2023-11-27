import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { DecodedPayload } from 'src/types';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findOneById(@Req() req: Request) {
    const { id } = req['user'] as DecodedPayload;
    return this.userService.findOneById(id);
  }

  @Patch('/')
  updateOne(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req['user'] as DecodedPayload;
    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete('/')
  deleteOne(@Req() req: Request) {
    const { id } = req['user'] as DecodedPayload;
    return this.userService.deleteOne(id);
  }
}
