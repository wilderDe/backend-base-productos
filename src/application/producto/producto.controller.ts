import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from '../../core/authorization/guards/casbin.guard'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { BaseController } from '../../common/base/base-controller'
import { ParamIdDto } from '../../common/dto/params-id.dto'
import { ProductoService } from './producto.service'
import { CrearProductoDto } from './dto/crear-producto.dto'
import { ActulizarProductoDto } from './dto/actualizar-producto.dto'

@Controller('productos')
@UseGuards(JwtAuthGuard, CasbinGuard)
export class ProductoController extends BaseController {
  constructor(private productoServicio: ProductoService) {
    super()
  }

  @Get()
  async listar(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.productoServicio.listar(paginacionQueryDto)
    return this.successListRows(result)
  }

  @Post()
  async crear(@Req() req, @Body() productoDto: CrearProductoDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoServicio.crear(
      productoDto,
      usuarioAuditoria
    )
    return this.successCreate(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Req() req,
    @Body() productoDto: ActulizarProductoDto
  ) {
    const { id: idProducto } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoServicio.actualizarDatos(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req, @Param() params: ParamIdDto) {
    const { id: idProducto } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoServicio.activar(
      idProducto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req, @Param() params: ParamIdDto) {
    const { id: idProducto } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoServicio.inactivar(
      idProducto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }
}
