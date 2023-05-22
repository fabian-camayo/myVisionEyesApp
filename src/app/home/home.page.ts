import { Component, OnInit } from '@angular/core';
import { HomeServiceProvider } from './home-service';
import { from } from 'rxjs';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { Filesystem  } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';

interface TokenResponse {
  refresh: string;
  access: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  detectado:any;
  token: any; //Variable para guardar el token
  refresh: any; //Variable para guardar el token refresh

  constructor(public homeServiceProvider: HomeServiceProvider, private mediaCapture: MediaCapture) {
  }
  ngOnInit(): void {
    this.playAudio('inicio.mp3');
    
  }
  async playAudio(audio:string) {
    try {
      let audioContext = new AudioContext();
      let response = await fetch('assets/'+audio);
      let audioData = await response.arrayBuffer();
      let audioBuffer = await audioContext.decodeAudioData(audioData);
      let source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    } catch (error) {
      // Manejar el error
    }
  }

   async grabarVideo() { 
    from(this.homeServiceProvider.getPostToken()()).subscribe((data:any) => { 
      this.refresh = (data.data as TokenResponse).refresh; // Guardar el token de refresh 
      this.token = (data.data as TokenResponse).access; // Guardar el token de access 
    }); 

    // Capturar Video
    let options: CaptureVideoOptions = { limit: 1, duration:1 };
    this.mediaCapture.captureVideo(options)
    .then(
      (data: MediaFile[] | CaptureError) => {
        // if...else statement:
        let dataAny:any = data;
        if (typeof data  === 'object' && dataAny.length) {
          this.readSecretFile(data);
          this.deleteSecretFile(data);
        } else if (typeof data === 'object' && dataAny.code) {
          this.detectado =(data as CaptureError).code // hacer algo con el error
        } else {
          this.detectado = 'No se recibió ningún dato' // hacer algo por defecto
        }
      }
    );
  }
  async deleteSecretFile(data:any){
    try {
      await Filesystem.deleteFile({
        path: (data as MediaFile[])[0].fullPath
      });
    } catch (error) {
      this.detectado = error;
    }
  };
  async readSecretFile (data:any){
    try {
      const contents = await Filesystem.readFile({
        path: (data as MediaFile[])[0].fullPath
      });
      const info = await Device.getInfo();
      from(this.homeServiceProvider.sendVideo(info.name+".mp4",contents.data, this.token)()).subscribe((data:any) => { 
              this.detectado = "OBJETO: "+data.data; // Guardar respuesta
              if (data.data==="Sillas") {
                this.playAudio('silla.mp3');
              }

              if (data.data ==="Tijeras") {
                this.playAudio('tijera.mp3');
              }

              if (data.data==="Vidrios Piso") {
                this.playAudio('vidrios.mp3');
              }

              if (data.data==="Ventana") {
                this.playAudio('ventana.mp3');
              }

              if (data.data==="Puntillas") {
                this.playAudio('puntilla.mp3');
              }

              if (data.data==="Puerta Cerrada") {
                this.playAudio('puerta_cerrada.mp3');
              }

              if (data.data==="Persona") {
                this.playAudio('persona.mp3');
              }

              if (data.data==="Perro") {
                this.playAudio('perro.mp3');
              }

              if (data.data==="Pared") {
                this.playAudio('pared.mp3');
              }

              if (data.data==="Mesa") {
                this.playAudio('mesa.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Gato") {
                this.playAudio('gato.mp3');
              }
              if (data.data.replace(/\s+/g, '')==="Escalera") {
                this.playAudio('escalera.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Cuchillo") {
                this.playAudio('cuchillo.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Cuchilla") {
                this.playAudio('cuchilla.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Cama") {
                this.playAudio('cama.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Balon") {
                this.playAudio('balon.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="Armario") {
                this.playAudio('armario.mp3');
              }

              if (data.data.replace(/\s+/g, '')==="AguaRegada") {
                this.playAudio('agua.mp3');
              }

            });
    } catch (error) {
      this.detectado = "ERROR: "+error;
    }
  };
}

