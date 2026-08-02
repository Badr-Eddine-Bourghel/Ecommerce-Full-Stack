// DTO for auth response

import {} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access Token for authentication',
    example:
      'f1e0cb1f038e9f86cdcc25f44e207c696079b08ad102bc9a379c46d86f1fbc9acf196b9365afb215f6bb79087eec772566ad507e37ee42e4b7001975bed9e22d34ac52b6b72e662398d7aaa7939dba97c24b654cd14236f8baeb21c779bf508eded37cafd52a9bcfb16522a011dd38910d0b5987cf4247d70ae5ad2d',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access tokens',
    example:
      'ab069d67008256d0c01561fb447357f3d4bcca5bbc28fa04dd922a0d54450c71ea7bc74a78d194e2cbe2b6ae927c83050327406b395e08d4ce346efc79655591',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'authentication user information',
    example: {
      id: 'user-123',
      email: 'BOB@example.com',
      firstName: 'Badr Eddine',
      lastName: 'Bourghel',
      role: 'USER',
    },
  })
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: Role;
  };
}
