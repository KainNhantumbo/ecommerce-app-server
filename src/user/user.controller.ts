import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserQueryDto } from './dto/query-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
