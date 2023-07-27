export type LoginResponse = {
  Mensaje: string
  Estado: string
  Autenticado: boolean
  Administrador: boolean
}

export type LoginResult = {
  finalizado: boolean
  mensaje: string
}
