import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Producto } from './producto.entity'
import { ActulizarProductoDto } from './dto/actualizar-producto.dto'
import { CrearProductoDto } from './dto/crear-producto.dto'

@Injectable()
export class ProductoRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where({ id: id })
      .getOne()
  }

  async buscarPorNombre(nombre: string) {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where({ nombre: nombre })
      .getOne()
  }

  async actualizar(
    id: string,
    productoDto: ActulizarProductoDto,
    usuarioAuditoria: string
  ) {
    return await this.dataSource.getRepository(Producto).update(
      id,
      new Producto({
        ...productoDto,
        usuarioModificacion: usuarioAuditoria,
      })
    )
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .select([
        'producto.id',
        'producto.nombre',
        'producto.cantidad',
        'producto.precio',
        'producto.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'id':
        query.addOrderBy('producto.id', sentido)
        break
      case 'nombre':
        query.addOrderBy('producto.nombre', sentido)
        break
      case 'cantidad':
        query.addOrderBy('producto.cantidad', sentido)
        break
      case 'precio':
        query.addOrderBy('producto.precio', sentido)
        break
      case 'estado':
        query.addOrderBy('producto.estado', sentido)
        break
      default:
        query.orderBy('producto.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('producto.nombre ilike :filtro', { filtro: `%${filtro}%` })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async crear(productoDto: CrearProductoDto, usuarioAuditoria: string) {
    return await this.dataSource
      .getRepository(Producto)
      .save(new Producto({ ...productoDto, usuarioCreacion: usuarioAuditoria }))
  }
}
