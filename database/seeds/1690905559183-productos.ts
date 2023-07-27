import { Producto } from 'src/application/producto/producto.entity'
import { USUARIO_SISTEMA } from 'src/common/constants'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class Productos1690905559183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        nombre: 'Galletas Oreo',
        cantidad: 100,
        precio: 2.5,
      },
      {
        nombre: 'Coca Cola 2 litros',
        cantidad: 200,
        precio: 10,
      },
      {
        nombre: 'Pepsi 2 Litros',
        cantidad: 200,
        precio: 10,
      },
      {
        nombre: 'Red Bull',
        cantidad: 50,
        precio: 15,
      },
      {
        nombre: 'Monster',
        cantidad: 70,
        precio: 15,
      },
      {
        nombre: 'Galletas Cracker',
        cantidad: 80,
        precio: 5,
      },
      {
        nombre: 'For Loko',
        cantidad: 150,
        precio: 25,
      },
      {
        nombre: 'Burguesa en Lata',
        cantidad: 130,
        precio: 9,
      },
      {
        nombre: 'Paceña en Lata',
        cantidad: 20,
        precio: 5,
      },
      {
        nombre: 'Chanceller',
        cantidad: 60,
        precio: 50,
      },
      {
        nombre: 'Red label',
        cantidad: 50,
        precio: 70,
      },
    ]
    const productos = items.map((item) => {
      return new Producto({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
    })
    await queryRunner.manager.save(productos)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
