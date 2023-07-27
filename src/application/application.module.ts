import { Module } from '@nestjs/common'
import { ParametroModule } from './parametro/parametro.module'
import { ProductoModule } from './producto/producto.module'

@Module({
  imports: [ParametroModule, ProductoModule],
})
export class ApplicationModule {}
