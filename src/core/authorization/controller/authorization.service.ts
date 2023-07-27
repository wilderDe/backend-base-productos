import { BaseService } from '../../../common/base/base-service'
import { Injectable, Query } from '@nestjs/common'
import { AuthZManagementService } from 'nest-authz'
import { FiltrosPoliticasDto } from '../dto/filtros-politicas.dto'
import { ModuloService } from '../service/modulo.service'

export interface politicaType {
  sujeto: string
  objeto: string
  accion: string
  app: string
}

type politicasResultType = [Array<politicaType>, number]

@Injectable()
export class AuthorizationService extends BaseService {
  constructor(
    private readonly authZManagerService: AuthZManagementService,
    private readonly moduloService: ModuloService
  ) {
    super()
  }

  async listarPoliticas(
    @Query() paginacionQueryDto: FiltrosPoliticasDto
  ): Promise<politicasResultType> {
    const { limite, pagina, filtro, aplicacion, orden, descendente } =
      paginacionQueryDto

    const politicas = await this.authZManagerService.getPolicy()

    let result = politicas.map((politica) => ({
      sujeto: politica[0],
      objeto: politica[1],
      accion: politica[2],
      app: politica[3],
    }))

    switch (orden) {
      case 'sujeto':
        result = result.sort((a, b) => {
          const compareResult = a.sujeto.localeCompare(b.sujeto)
          return descendente ? -compareResult : compareResult
        })
        break
      case 'objeto':
        result = result.sort((a, b) => {
          const compareResult = a.objeto.localeCompare(b.objeto)
          return descendente ? -compareResult : compareResult
        })
        break
      case 'accion':
        result = result.sort((a, b) => {
          const compareResult = a.accion.localeCompare(b.accion)
          return descendente ? -compareResult : compareResult
        })
        break
      case 'app':
        result = result.sort((a, b) => {
          const compareResult = a.app.localeCompare(b.app)
          return descendente ? -compareResult : compareResult
        })
        break
    }

    if (filtro) {
      result = result.filter(
        (r) =>
          r.sujeto.toLowerCase().includes(filtro.toLowerCase()) ||
          r.objeto.toLowerCase().includes(filtro.toLowerCase()) ||
          r.accion.toLowerCase().includes(filtro.toLowerCase()) ||
          r.app.toLowerCase().includes(filtro.toLowerCase())
      )
    }
    if (aplicacion) {
      result = result.filter((r) =>
        r.app.toLowerCase().includes(aplicacion.toLowerCase())
      )
    }

    if (!limite || !pagina) {
      return [result, result.length]
    }
    const i = limite * (pagina - 1)
    const f = limite * pagina

    const subset = result.slice(i, f)
    return [subset, result.length]
  }

  async crearPolitica(politica: politicaType) {
    const { sujeto, objeto, accion, app } = politica
    await this.authZManagerService.addPolicy(sujeto, objeto, accion, app)
    return politica
  }

  async actualizarPolitica(
    politica: politicaType,
    politicaNueva: politicaType
  ) {
    const { sujeto, objeto, accion, app } = politicaNueva
    await this.eliminarPolitica(politica)
    await this.authZManagerService.addPolicy(sujeto, objeto, accion, app)
  }

  async eliminarPolitica(politica: politicaType) {
    const { sujeto, objeto, accion, app } = politica
    await this.authZManagerService.removePolicy(sujeto, objeto, accion, app)
    return politica
  }

  async obtenerRoles() {
    return await this.authZManagerService.getFilteredPolicy(3, 'frontend')
  }

  async obtenerPermisosPorRol(rol: string) {
    const politicas = await this.authZManagerService.getFilteredPolicy(
      3,
      'frontend'
    )
    const modulos = await this.moduloService.listarTodo()
    const politicasRol = politicas.filter((politica) => politica[0] === rol)
    return modulos
      .map((modulo) => ({
        ...modulo,
        subModulo: modulo.subModulo.filter((subModulo) =>
          politicasRol.some((politica) => politica[1] === subModulo.url)
        ),
      }))
      .filter((modulo) => modulo.subModulo.length > 0)
  }
}
