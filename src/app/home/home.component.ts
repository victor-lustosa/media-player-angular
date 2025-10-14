import { Component, ViewChild } from '@angular/core';
import { MediaPlayerComponent } from '../media-player/media-player.component';

interface MediaTrack {
  title: string;
  format: string;
  url: string;
  type: 'audio' | 'video';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  displayMediaModal: boolean = false;
  selectedMedia: MediaTrack | null = null;

  @ViewChild(MediaPlayerComponent) mediaPlayer:
    | MediaPlayerComponent
    | undefined;

  audioTracks: MediaTrack[] = [
    {
      title: 'Áudio MP3',
      format: 'MP3',
      url: 'assets/audios/formato-mp3.mp3',
      type: 'audio',
    },
    {
      title: 'Áudio WAV',
      format: 'WAV',
      url: 'assets/audios/formato-wav.wav',
      type: 'audio',
    },
    {
      title: 'Áudio OGG',
      format: 'OGG',
      url: 'assets/audios/formato-ogg.ogg',
      type: 'audio',
    },
    {
      title: 'Áudio FLAC',
      format: 'FLAC',
      url: 'assets/audios/formato-flac.flac',
      type: 'audio',
    },
    {
      title: 'Áudio AAC',
      format: 'AAC',
      url: 'assets/audios/formato-aac.aac',
      type: 'audio',
    },
  ];

  videoTracks: MediaTrack[] = [
    {
      title: 'Vídeo MP4 de Exemplo',
      format: 'MP4',
      url: 'assets/videos/formato-mp4.mp4',
      type: 'video',
    },
    {
      title: 'Vídeo MKV de Exemplo',
      format: 'MKV',
      url: 'assets/videos/formato-mkv.mkv',
      type: 'video',
    },
    {
      title: 'Vídeo AVI de Exemplo',
      format: 'AVI',
      url: 'assets/videos/formato-avi.avi',
      type: 'video',
    },
    {
      title: 'Vídeo WMV de Exemplo',
      format: 'WMV',
      url: 'assets/videos/formato-wmv.wmv',
      type: 'video',
    },
  ];

  constructor() {}

  playMedia(media: MediaTrack): void {
    this.selectedMedia = media;
    this.displayMediaModal = true;
  }

  onModalHide(): void {
    this.mediaPlayer?.pause();
    this.selectedMedia = null;
  }
}
