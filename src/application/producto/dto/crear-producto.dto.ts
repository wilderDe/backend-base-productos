import { IsNotEmpty, IsNumber, IsPositive } from '../../../common/validation'
import { ApiProperty } from '@nestjs/swagger'

export class CrearProductoDto {
  @ApiProperty()
  @IsNotEmpty()
  nombre: string
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  cantidad: number
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  precio: number
  estado?: string
}
