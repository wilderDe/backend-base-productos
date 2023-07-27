import { BaseService } from '../../common/base/base-service'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Messages } from '../../common/constants/response-messages'
import { Status } from '../../common/constants'
import { ProductoRepository } from './producto.repository'
import { CrearProductoDto } from './dto/crear-producto.dto'
import { ActulizarProductoDto } from './dto/actualizar-producto.dto'
@Injectable()
export class ProductoService extends BaseService {
  constructor(
    @Inject(ProductoRepository)
    private productoRepositorio: ProductoRepository
  ) {
    super()
  }

  async crear(productoDto: CrearProductoDto, usuarioAuditoria: string) {
    const productoRepetido = await this.productoRepositorio.buscarPorNombre(
      productoDto.nombre
    )

    if (productoRepetido) {
      throw new ConflictException(Messages.REPEATED_PRODUCT)
    }

    return await this.productoRepositorio.crear(productoDto, usuarioAuditoria)
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    return await this.productoRepositorio.listar(paginacionQueryDto)
  }

  async actualizarDatos(
    id: string,
    productoDto: ActulizarProductoDto,
    usuarioAuditoria: string
  ) {
    const parametro = await this.productoRepositorio.buscarPorId(id)
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    await this.productoRepositorio.actualizar(id, productoDto, usuarioAuditoria)
    return { id }
  }

  async activar(idProducto: string, usuarioAuditoria: string) {
    const parametro = await this.productoRepositorio.buscarPorId(idProducto)
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const productoDto = new ActulizarProductoDto()
    productoDto.estado = Status.ACTIVE
    await this.productoRepositorio.actualizar(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return {
      id: idProducto,
      estado: productoDto.estado,
    }
  }

  async inactivar(idProducto: string, usuarioAuditoria: string) {
    const parametro = await this.productoRepositorio.buscarPorId(idProducto)
    if (!parametro) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const productoDto = new ActulizarProductoDto()
    productoDto.estado = Status.INACTIVE
    await this.productoRepositorio.actualizar(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return {
      id: idProducto,
      estado: productoDto.estado,
    }
  }
}
