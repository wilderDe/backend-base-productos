import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductoController } from './producto.controller'
import { ProductoService } from './producto.service'
import { ProductoRepository } from './producto.repository'
import { Producto } from './producto.entity'

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
  imports: [TypeOrmModule.forFeature([Producto])],
})
export class ProductoModule {}
