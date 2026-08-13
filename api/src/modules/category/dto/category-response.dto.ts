// DTO for category response

import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: '45ger4-567hgl3gql-zob1ga2',
    description: 'The unique identifier for the category',
  })
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 'Devices and gadgets including phones, laptops, and accessoires',
    description: 'A brief description of the category',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: 'electronics',
    description: 'The HRL-friendly slug for the category',
    nullable: true,
  })
  slug: string | null;

  @ApiProperty({
    example: 'https://example.com/images/electornics.png',
    description: 'URL of the category image',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    example: true,
    description: 'Indicates if the category is active ',
  })
  isActive: boolean;

  @ApiProperty({
    example: 150,
    description: 'Number of the product in the category',
  })
  productCount: number;

  @ApiProperty({
    example: '20005-06-03T15:30:00Z',
    description: 'The date and time when the category was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '20005-06-03T15:30:00Z',
    description: 'The date and time when the category was last updated',
  })
  updatedAt: Date;
}
