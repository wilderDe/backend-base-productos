import { UtilService } from '../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../common/entity/auditoria.entity'
import { Status } from '../../common/constants'

dotenv.config()

export const ProductoEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(ProductoEstado))
@Entity({ name: 'productos', schema: process.env.DB_SCHEMA_PRODUCTOS })
export class Producto extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Producto',
  })
  id: string

  @Column({
    length: 50,
    type: 'varchar',
    comment: 'Nombre del producto',
  })
  nombre: string

  @Column({
    type: 'numeric',
    comment: 'Cantidad de Producto',
  })
  cantidad: number

  @Column({
    type: 'decimal', // Utilizamos decimal para representar la moneda
    precision: 8, // El numero total de digitos permitidos (incluyendo los decimales)
    scale: 2, // La cantidad de digitos despues del punto decimal
    comment: 'Precio del Producto',
  })
  precio: number

  constructor(data?: Partial<Producto>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ProductoEstado.ACTIVE
  }
}
