import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-simple-audio-player',
  templateUrl: './simple-audio-player.component.html',
  styleUrls: ['./simple-audio-player.component.scss'],
})
export class SimpleAudioPlayerComponent {
  @Input() audioUrl!: string;
  @Input() audioTitle: string = 'Título do áudio';
  progressPercentage: number = 0;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBarWrapper') progressBarRef!: ElementRef<HTMLElement>;
  @ViewChild('volumeBarWrapper') volumeBarRef!: ElementRef<HTMLElement>;

  isPlaying: boolean = false;
  isMuted: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 0.75;
  private isDraggingProgress: boolean = false;
  private isDraggingVolume: boolean = false;
  constructor() {}

  onMetadataLoaded(): void {
    if (this.audioPlayerRef) {
      this.duration = this.audioPlayerRef.nativeElement.duration;
    }
  }

  onTimeUpdate(): void {
    if (this.audioPlayerRef) {
      this.currentTime = this.audioPlayerRef.nativeElement.currentTime;
      if (this.duration > 0) {
        this.progressPercentage = (this.currentTime / this.duration) * 100;
      } else {
        this.progressPercentage = 0;
      }
    }
  }

  public pause(): void {
    if (this.audioPlayerRef) {
      this.audioPlayerRef.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  playPause() {

    if (!this.audioPlayerRef?.nativeElement) {
      console.error(
        'ERRO: A referência ao audioPlayerRef não foi encontrada! Verifique o #audioPlayer no HTML.'
      );
      return;
    }

    const audio: HTMLAudioElement = this.audioPlayerRef.nativeElement;

    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch((error) => {
            this.isPlaying = false;
          });
      }
    }
  }

  skip(seconds: number) {
    this.audioPlayerRef.nativeElement.currentTime += seconds;
  }

  @HostListener('window:mousemove', ['$event'])
  onDragMove(event: MouseEvent): void {
    if (this.isDraggingProgress) {
      this.seek(event);
    } else if (this.isDraggingVolume) {
      this.setVolume(event);
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onDragEnd(event: MouseEvent): void {
    this.isDraggingProgress = false;
    this.isDraggingVolume = false;
  }

  onSeekStart(event: MouseEvent): void {
    this.isDraggingProgress = true;
    this.seek(event);
  }

  private seek(event: MouseEvent): void {
    if (this.isDraggingProgress && this.duration > 0) {
      const progressBar = this.progressBarRef.nativeElement;
      const progressBarRect = progressBar.getBoundingClientRect();
      let clickPositionX = event.clientX - progressBarRect.left;

      if (clickPositionX < 0) clickPositionX = 0;
      if (clickPositionX > progressBarRect.width)
        clickPositionX = progressBarRect.width;

      const newTime = (clickPositionX / progressBarRect.width) * this.duration;
      this.audioPlayerRef.nativeElement.currentTime = newTime;
      this.onTimeUpdate();
    }
  }

  onVolumeDragStart(event: MouseEvent): void {
    this.isDraggingVolume = true;
    this.setVolume(event);
  }

  private setVolume(event: MouseEvent): void {
    if (this.isDraggingVolume) {
      const volumeBar = this.volumeBarRef.nativeElement;
      const volumeBarRect = volumeBar.getBoundingClientRect();
      let clickPositionX = event.clientX - volumeBarRect.left;

      if (clickPositionX < 0) clickPositionX = 0;
      if (clickPositionX > volumeBarRect.width)
        clickPositionX = volumeBarRect.width;

      const newVolume = clickPositionX / volumeBarRect.width;

      this.volume = newVolume;
      this.audioPlayerRef.nativeElement.volume = this.volume;
      this.isMuted = this.volume === 0;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioPlayerRef.nativeElement.muted = this.isMuted;
  }
}
