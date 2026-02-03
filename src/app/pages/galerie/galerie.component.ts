// src/app/pages/galerie/galerie.component.ts
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type GalleryItem = {
  id: string;
  title: string;
  location: string;
  src: string;
  alt: string;
};

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.scss',
})
export class GalerieComponent implements AfterViewInit, OnDestroy {
  // Images de démonstration (à remplacer par tes assets réels)
  items: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Bureau exécutif Tax And Legal days 2026',
      location: 'UCAC • Ekounou',
      src: 'assets/images/team/team.jpeg',
      alt: 'Cérémonie d\'ouverture',
    },
    {
      id: 'g2',
      title: 'Réunion du CTO',
      location: 'Yaoundé',
      src: 'assets/images/gal/class2.jpeg',
      alt: 'Panel de discussion sur la fiscalité',
    },
    {
      id: 'g3',
      title: 'Organisation de l\'année 2024',
      location: 'UCAC',
      src: 'assets/images/gal/avanprec.jpeg',
      alt: 'Session de clinique juridique',
    },
    {
      id: 'g4',
      title: 'Photo symbolique avec la Doyenne FSJP',
      location: 'Campus Ekounou',
      src: 'assets/images/gal/doyenne.jpeg',
      alt: 'Stands et échanges professionnels',
    },
    {
      id: 'g5',
      title: 'Moment de joie à l\'édition 2025',
      location: 'Campus UCAC Ekounou',
      src: 'assets/images/gal/sourir25.jpeg',
      alt: 'Mise en situation - procès fictif',
    },
    {
      id: 'g6',
      title: 'Walt: Parrain professionel de 2025',
      location: 'UCAC',
      src: 'assets/images/gal/walt.jpeg',
      alt: 'Remise de prix et cérémonie de clôture',
    },
    {
      id: 'g7',
      title: 'Séminaire sur la loi de finances 2025',
      location: 'Campus',
      src: 'assets/images/gal/panelstudent.jpeg',
      alt: 'Session de réseautage',
    },
    {
      id: 'g8',
      title: 'Table ronde de l\'édition 2025',
      location: 'Salle de conférence',
      src: 'assets/images/gal/panelpro.jpeg',
      alt: 'Séminaire sur le droit OHADA',
    },
    {
      id: 'g9',
      title: 'Finaliste de la première édition des Olympiades et quizz',
      location: 'UCAC',
      src: 'assets/images/gal/final.jpeg',
      alt: 'Atelier pratique sur les prix de transfert',
    },
  ];

  // Popup state
  isOpen = signal(false);
  selectedIndex = signal<number>(0);

  selected = () => this.items[this.selectedIndex()] ?? null;

  openAt(index: number) {
    this.selectedIndex.set(index);
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
  }

  next() {
    const i = this.selectedIndex();
    this.selectedIndex.set((i + 1) % this.items.length);
  }

  prev() {
    const i = this.selectedIndex();
    this.selectedIndex.set((i - 1 + this.items.length) % this.items.length);
  }

  // Keyboard shortcuts
  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!this.isOpen()) return;

    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  // Scroll reveal
  @ViewChildren('revealItem', { read: ElementRef })
  revealItems!: QueryList<ElementRef<HTMLElement>>;

  // Parallax state
  private rafId: number | null = null;
  private lastScrollTs = 0;
  private reduceMotion = false;
  private parallaxTargets: Array<{
    host: HTMLElement;
    img: HTMLElement;
    currentY: number;
  }> = [];

  @HostListener('window:scroll')
  onScroll() {
    if (this.reduceMotion) return;
    this.lastScrollTs = performance.now();
    this.startParallaxLoop();
  }

  ngAfterViewInit(): void {
    const els = this.revealItems?.toArray().map((r) => r.nativeElement) ?? [];
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'));
      // Even if reveal is not available, we can still setup parallax.
      this.setupParallaxTargets();
      this.lastScrollTs = performance.now();
      this.startParallaxLoop();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));

    // Setup parallax after initial render
    this.reduceMotion =
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.setupParallaxTargets();
    this.lastScrollTs = performance.now();
    this.startParallaxLoop();
  }

  private setupParallaxTargets(): void {
    const els = this.revealItems?.toArray().map((r) => r.nativeElement) ?? [];
    this.parallaxTargets = els
      .map((host) => {
        const img = host.querySelector('.gallery-image img') as HTMLElement | null;
        if (!img) return null;
        // Default values (also set in CSS)
        img.style.setProperty('--parallax-y', '0px');
        return { host, img, currentY: 0 };
      })
      .filter(Boolean) as Array<{ host: HTMLElement; img: HTMLElement; currentY: number }>;
  }

  private startParallaxLoop(): void {
    if (this.rafId !== null) return;
    const tick = () => {
      this.applyParallaxFrame();

      // Stop the loop shortly after scrolling stops (saves CPU).
      const now = performance.now();
      const shouldContinue = now - this.lastScrollTs < 250;
      if (shouldContinue) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = null;
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private applyParallaxFrame(): void {
    if (this.reduceMotion) return;
    if (this.parallaxTargets.length === 0) return;

    const viewportH = window.innerHeight || 0;
    if (viewportH <= 0) return;

    const viewportCenter = viewportH / 2;
    const maxTranslate = 18; // px (subtil et premium)
    const lerpFactor = 0.12; // smoothing
    const activeMargin = 160; // px

    for (const t of this.parallaxTargets) {
      const rect = t.host.getBoundingClientRect();
      if (rect.bottom < -activeMargin || rect.top > viewportH + activeMargin) continue;

      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const normalized = Math.max(-1, Math.min(1, distance / (viewportH * 0.9)));
      const targetY = -normalized * maxTranslate;

      t.currentY += (targetY - t.currentY) * lerpFactor;
      t.img.style.setProperty('--parallax-y', `${t.currentY.toFixed(2)}px`);
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.parallaxTargets = [];
  }

  trackById(_: number, item: GalleryItem) {
    return item.id;
  }
}
