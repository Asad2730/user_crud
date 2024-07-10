import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Users, CreateUserDto, UpdateUserDto, PaginationDto, User } from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {

  private readonly users: Users;

  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.create({ age: 0, username: randomUUID(), password: randomUUID() })
    }
  }


  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID()
    }

    this.users.users.push(user)
    return user;
  }

  findAll(): Users {
    return { users: this.users.users }
  }

  findOne(id: string): User {
    const user = this.users.users.find((i) => i.id === id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndx = this.users.users.findIndex((i) => i.id === id);
    if (userIndx !== -1) {
      this.users.users[userIndx] = {
        ...this.users.users[userIndx],
        ...updateUserDto
      }

      return this.users.users[userIndx];
    }

    throw new NotFoundException(`User not found by id ${id}`)
  }

  remove(id: string): User {
    const userIdx = this.users.users.findIndex((i) => i.id === id);
    if (userIdx !== -1) {
      return this.users.users.splice(userIdx)[0];
    }

    throw new NotFoundException(`User not found by id ${id}`)
  }

  query(paginationStreamDto:Observable<PaginationDto>):Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto:PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
        subject.next({
          users:this.users.users.splice(start,start+paginationDto.skip)
        }) ;
    };

    const onComplete = () => subject.complete();

    paginationStreamDto.subscribe({
      next:onNext,
      complete:onComplete
    });

    return subject.asObservable();
  }


}
