import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto, FindOneUserDto, PaginationDto, UpdateUserDto,
  UsersServiceController, UsersServiceControllerMethods
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) { }

  createUser(request: CreateUserDto) {
    return this.usersService.create(request)
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(request: FindOneUserDto) {
    return this.usersService.findOne(request.id);
  }

  updateUser(request: UpdateUserDto) {
     return this.usersService.update(request.id,request);
  }

  removeUser(request: FindOneUserDto){
    return this.usersService.remove(request.id);
  }

  queryUsers(request: Observable<PaginationDto>) {
     return this.usersService.query(request);
  }

}
