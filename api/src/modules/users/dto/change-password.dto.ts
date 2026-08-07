import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

// DTO for changing user password

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password for the user',
    example: 'CurrentP@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Current pasword must not be empty' })
  currentPassword: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'NewP@ssw0rd!',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'New password must not be empty' })
  @MinLength(8, { message: 'New password must be at least 8 charachters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'New Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;
}
