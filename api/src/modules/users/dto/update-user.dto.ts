import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

// DTO for updating user profile
export class UpdateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'BOB@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Badr Eddine',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bourghel',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
