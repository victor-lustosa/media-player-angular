import { Component, ViewChild } from '@angular/core';
import { MediaPlayerComponent } from '../media-player/media-player.component';
interface AudioTrack {
  title: string;
  format: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  displayAudioModal: boolean = false;
  selectedTrack: AudioTrack | null = null;

  @ViewChild(MediaPlayerComponent) audioPlayer:
    | MediaPlayerComponent
    | undefined;

  tracks: AudioTrack[] = [
    {
      title: 'Exemplo de Áudio MP3',
      format: 'MP3',
      url: 'assets/audios/formato-mp3.mp3',
    },
    {
      title: 'Exemplo de Áudio WAV',
      format: 'WAV',
      url: 'assets/audios/formato-wav.wav',
    },
    {
      title: 'Exemplo de Áudio MP4 (Áudio)',
      format: 'MP4',
      url: 'assets/audios/formato-mp4.mp4'
    },
    {
      title: 'Exemplo de Áudio OGG',
      format: 'OGG',
      url: 'assets/audios/formato-ogg.ogg',
    },
    {
      title: 'Exemplo de Áudio FLAC',
      format: 'FLAC',
      url: 'assets/audios/formato-flac.flac',
    },
    {
      title: 'Exemplo de Áudio AAC',
      format: 'AAC',
      url: 'assets/audios/formato-aac.aac',
    },
     {
      title: 'Exemplo de Video MKV',
      format: 'MKV',
      url: 'assets/videos/formato-mkv.mkv',
    },
     {
      title: 'Exemplo de Video AVI',
      format: 'AVI',
      url: 'assets/videos/formato-avi.avi',
    },
     {
      title: 'Exemplo de Video WMV',
      format: 'WMV',
      url: 'assets/videos/formato-wmv.wmv',
    },
  ];

playTrack(track: AudioTrack): void {
    this.selectedTrack = track;
    this.displayAudioModal = true;
  }

  onModalHide() {
    this.audioPlayer?.pause();
  }
}
