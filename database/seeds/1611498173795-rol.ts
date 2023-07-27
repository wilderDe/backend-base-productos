import { RolEnum } from '../../src/core/authorization/rol.enum'
import { Rol } from '../../src/core/authorization/entity/rol.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { USUARIO_SISTEMA } from '../../src/common/constants'

export class rol1611498173795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        // id: '1',
        rol: RolEnum.ADMINISTRADOR,
        nombre: 'Administrador',
      },
      {
        // id: '2',
        rol: RolEnum.TECNICO,
        nombre: 'Técnico',
      },
      {
        // id: '3',
        rol: RolEnum.USUARIO,
        nombre: 'Usuario',
      },
    ]
    const roles = items.map((item) => {
      return new Rol({
        rol: item.rol,
        nombre: item.nombre,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
    })
    await queryRunner.manager.save(roles)
  }

  /* eslint-disable */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
