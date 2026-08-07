// DTO

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Badr Eddine',
    nullable: true,
  })
  firstName: string | null;

  @ApiProperty({
    description: 'User last name',
    example: 'Bourghel',
    nullable: true,
  })
  lastName: string | null;

  @ApiProperty({ description: 'User role', enum: Role })
  role: Role;

  @ApiProperty({
    description: 'Account creation date',
    example: '2005-06-03T12:25:45.7892',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last account update date',
    example: '2005-06-03T12:25:45.7892',
  })
  updatedAt: Date;
}
