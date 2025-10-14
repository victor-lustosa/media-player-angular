import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent {

  @Input() mediaUrl!: string;
  @Input() mediaTitle!: string;
  @Input() mediaType: 'audio' | 'video' = 'audio';
  @Output() closePlayer = new EventEmitter<void>();

  @ViewChild('mediaElement') mediaElementRef!: ElementRef<HTMLMediaElement>;
  @ViewChild('playerContainer') playerContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('progressBarWrapper') progressBarRef!: ElementRef<HTMLElement>;
  @ViewChild('volumeBarWrapper') volumeBarRef!: ElementRef<HTMLElement>;

  progressPercentage: number = 0;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  isFullscreen: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 0.8;
  private isDraggingProgress: boolean = false;
  private isDraggingVolume: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  @HostListener('window:mousemove', ['$event'])
  onDragMove(event: MouseEvent): void {
    if (this.isDraggingProgress) this.seek(event);
    else if (this.isDraggingVolume) this.setVolume(event);
  }

  @HostListener('window:mouseup', ['$event'])
  onDragEnd(event: MouseEvent): void {
    this.isDraggingProgress = false;
    this.isDraggingVolume = false;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(event: Event): void {
    this.isFullscreen = !!document.fullscreenElement;
    this.cdr.detectChanges(); // Força a atualização da tela
  }

  onMetadataLoaded(): void {
    if (this.mediaElementRef) this.duration = this.mediaElementRef.nativeElement.duration;
  }

  onTimeUpdate(): void {
    if (this.mediaElementRef && !this.isDraggingProgress) {
      this.currentTime = this.mediaElementRef.nativeElement.currentTime;
      if (this.duration > 0) this.progressPercentage = (this.currentTime / this.duration) * 100;
    }
  }

  playPause(): void {
    if (!this.mediaElementRef?.nativeElement) return;
    const media: HTMLMediaElement = this.mediaElementRef.nativeElement;

    if (this.isPlaying) media.pause();
    else media.play().catch(error => console.error("Erro ao tocar mídia:", error));

    this.isPlaying = !this.isPlaying;
  }

  skip(seconds: number): void {
    if (this.mediaElementRef?.nativeElement) this.mediaElementRef.nativeElement.currentTime += seconds;
  }

  toggleMute(): void {
    if (this.mediaElementRef?.nativeElement) {
      this.isMuted = !this.isMuted;
      this.mediaElementRef.nativeElement.muted = this.isMuted;
    }
  }

  toggleFullscreen(): void {
    if (this.mediaType !== 'video') return;

    if (!this.isFullscreen) this.playerContainerRef.nativeElement.requestFullscreen();
    else document.exitFullscreen();
  }

  onSeekStart(event: MouseEvent): void {
    this.isDraggingProgress = true;
    this.seek(event);
  }

  private seek(event: MouseEvent): void {
    if (this.isDraggingProgress && this.duration > 0 && this.progressBarRef?.nativeElement) {
      const progressBar = this.progressBarRef.nativeElement;
      const progressBarRect = progressBar.getBoundingClientRect();
      let pos = (event.clientX - progressBarRect.left) / progressBarRect.width;
      pos = Math.max(0, Math.min(1, pos));
      this.mediaElementRef.nativeElement.currentTime = pos * this.duration;
      this.onTimeUpdate();
    }
  }

  onVolumeDragStart(event: MouseEvent): void {
    this.isDraggingVolume = true;
    this.setVolume(event);
  }

  private setVolume(event: MouseEvent): void {
    if (this.isDraggingVolume && this.volumeBarRef?.nativeElement) {
      const volumeBar = this.volumeBarRef.nativeElement;
      const volumeBarRect = volumeBar.getBoundingClientRect();
      let pos = (event.clientX - volumeBarRect.left) / volumeBarRect.width;
      pos = Math.max(0, Math.min(1, pos));
      this.volume = pos;
      this.mediaElementRef.nativeElement.volume = this.volume;
      this.isMuted = this.volume === 0;
    }
  }

  public pause(): void {
    if (this.mediaElementRef?.nativeElement) {
      this.mediaElementRef.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  onClose(): void {
    this.pause();
    this.closePlayer.emit();
  }
}
