import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, Auth_Service } from '@app/common';

@Module({
  imports:[
    ClientsModule.register([
        {
          name:Auth_Service,
          transport:Transport.GRPC,
          options:{
            package:AUTH_PACKAGE_NAME,
            protoLoader:join(__dirname,'../auth.proto')
          }
        }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
