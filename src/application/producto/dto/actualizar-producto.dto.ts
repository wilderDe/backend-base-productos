import { IsNotEmpty, IsNumber } from 'src/common/validation'

export class ActulizarProductoDto {
  @IsNotEmpty()
  nombre: string
  @IsNumber()
  cantidad: number
  @IsNumber()
  precio: number
  estado?: string
}
