import { CapacitorHttp,HttpResponse } from '@capacitor/core';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeServiceProvider {

  urlToken = 'http://testprogram48.pythonanywhere.com/api/token/'; //URL Token
  urlRefresh = 'http://testprogram48.pythonanywhere.com/api/token/refresh/'; //URL Token refresh
  urlDetectarObjeto = 'http://testprogram48.pythonanywhere.com/api/detectar-objeto/'; //URL Detectar Objeto

  constructor() {
    
  }
 
  getPostToken() {
    let body = { //Objeto con los datos de autenticación
        username: "ownerapi",
        password: "server2023*"
    };
    const doPost = async () => {
        const options = {
          url: this.urlToken,
          headers: {
            'Content-Type': 'application/json'
          },
          data: body,
        };
        const response: HttpResponse = await CapacitorHttp.post(options);
        return response;
      };  
      return doPost;
}

  // Definir un método para enviar el video
  sendVideo(fileNombre:string, dataVideo:string, token:string):any {
    let body = { //Objeto con los datos 
      nombre: fileNombre,
      video: dataVideo
  };
    let headers = { //Header con el tipo de contenido y token
        'Authorization':'Bearer '+token,
        'Content-Type': 'application/json'
      };
    // Enviar el video por API REST a una URL determinada usando Http
    const doPost = async () => {
      const options = {
        url: this.urlDetectarObjeto,
        headers: headers,
        data: body,
      };
      const response: HttpResponse = await CapacitorHttp.post(options);
      return response;
    }; 
    return doPost;
  }
}
