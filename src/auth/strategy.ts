import {AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
const fetch = require('node-fetch');

export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],
  ) {

  }

  /**
   * Autenticación de un usuario frente a una acción en la base de datos
   * @param request la solicitud con el token
   * @returns el perfil de usuario, undefined cuando no tiene el permiso o un HttpError
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if(token) {
      let idMenu: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      console.log(this.metadata);

      const datos = {token: token, idMenu: idMenu, accion: accion};
      const urlValidarPermisos = `${ConfiguracionSeguridad.enlaceMicroservicioSeguridad}/validad-permisos`;
      let res = undefined;
      try {
        fetch(urlValidarPermisos, {
          method: 'post',
          body:    JSON.stringify(datos),
          headers: { 'Content-Type': 'application/json'},
        }).then((res: any) => res.json())
          .then((json: any) => {
            res = json;
        });
        if(res) {
          let perfil: UserProfile = Object.assign({
            permitido: "OK"
          });
          return perfil;
        } else {
          return undefined;
        }
      } catch(e) {
        throw new HttpErrors[401]("No se tienen permisos sobre la acción a ejecutar.");
      }
    }
    throw new HttpErrors[401]("No es posible ejecutar la acción por falta de un token.");
  }

}
