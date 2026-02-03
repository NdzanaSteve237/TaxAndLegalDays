import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type Pack = {
  name: 'Silver' | 'Gold' | 'Diamond';
  price: string;
  tagline: string;
  highlight?: boolean;
  perks: { label: string; ok: boolean }[];
};

@Component({
  standalone: true,
  selector: 'app-sponsoring',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sponsoring.component.html',
  styleUrl: './sponsoring.component.scss',
})
export class SponsoringComponent implements AfterViewInit {
  // Parallax / glow
  private mouseX = signal(0.5);
  private mouseY = signal(0.5);

  glowStyle = computed(() => {
    const x = this.mouseX() * 100;
    const y = this.mouseY() * 100;
    return { backgroundPosition: `${x}% ${y}%` };
  });

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.mouseX.set(e.clientX / w);
    this.mouseY.set(e.clientY / h);
  }

  packs: Pack[] = [
    {
      name: 'Silver',
      price: '100.000 – 350.000 FCFA',
      tagline: 'Visibilité essentielle + présence sur supports clés.',
      perks: [
        { label: 'Logo sur affiches (campus & au-delà)', ok: true },
        { label: 'Logo sur flyers', ok: true },
        { label: 'Logo sur réseaux sociaux', ok: true },
        { label: 'Logo sur programme remis à l’auditoire', ok: true },
        { label: 'Spot vidéo', ok: false },
        { label: 'Billets d’invitation', ok: false },
        { label: 'Espace tente (foire des métiers)', ok: false },
        { label: 'Texte de présentation sur réseaux', ok: false },
      ],
    },
    {
      name: 'Gold',
      price: '400.000 – 750.000 FCFA',
      tagline: 'Visibilité renforcée + activation plus premium.',
      highlight: true,
      perks: [
        { label: 'Logo sur affiches (campus & au-delà)', ok: true },
        { label: 'Logo sur flyers', ok: true },
        { label: 'Logo sur réseaux sociaux', ok: true },
        { label: 'Logo sur programme remis à l’auditoire', ok: true },
        { label: 'Billets d’invitation', ok: true },
        { label: 'Spot vidéo', ok: true },
        { label: 'Texte de présentation (80 mots)', ok: true },
        { label: 'Espace tente (foire des métiers)', ok: true },
      ],
    },
    {
      name: 'Diamond',
      price: 'À partir de 800.000 FCFA',
      tagline: 'Package prestige + maximum de visibilité & avantages.',
      perks: [
        { label: 'Logo sur affiches (campus & au-delà)', ok: true },
        { label: 'Logo sur flyers', ok: true },
        { label: 'Logo sur réseaux sociaux', ok: true },
        { label: 'Logo sur programme remis à l’auditoire', ok: true },
        { label: 'Spot vidéo', ok: true },
        { label: 'Attestations (participants olympiades)', ok: true },
        { label: 'Texte de présentation (150 mots)', ok: true },
        { label: 'Invitations brunch de clôture (x4)', ok: true },
      ],
    },
  ];

  advantages = [
    {
      icon: 'campaign',
      title: 'Couverture publicitaire',
      desc: 'Affiches, flyers, roll-up, réseaux sociaux et supports officiels.',
    },
    {
      icon: 'verified',
      title: 'Image valorisante',
      desc: 'Soutien à la jeunesse et aux activités scientifiques & éducatives de l’UCAC.',
    },
    {
      icon: 'handshake',
      title: 'Réseau & notoriété',
      desc: 'Visibilité auprès d’un public juridique, fiscal et institutionnel.',
    },
  ];

  email = 'taxandlegaldays2026@gmail.com';
  phone = '+237 650 09 38 61';

  // Scroll reveal pour les sections
  @ViewChildren('heroSection', { read: ElementRef }) heroSection!: QueryList<ElementRef>;
  @ViewChildren('packsSection', { read: ElementRef }) packsSection!: QueryList<ElementRef>;
  @ViewChildren('ctaSection', { read: ElementRef }) ctaSection!: QueryList<ElementRef>;
  @ViewChildren('sectionHead', { read: ElementRef }) sectionHead!: QueryList<ElementRef>;
  @ViewChildren('contactCard', { read: ElementRef }) contactCard!: QueryList<ElementRef>;
  @ViewChildren('advItem', { read: ElementRef }) advItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('packItem', { read: ElementRef }) packItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('ctaBox', { read: ElementRef }) ctaBox!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Attendre que la vue soit complètement initialisée
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  private initScrollReveal(): void {
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Collecter toutes les sections principales
    const allSections: HTMLElement[] = [];
    
    this.heroSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.packsSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.ctaSection?.toArray().forEach(el => allSections.push(el.nativeElement));

    if (prefersReducedMotion) {
      // Si animations réduites, afficher tout immédiatement
      allSections.forEach(el => el.classList.add('is-visible'));
      this.sectionHead?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.contactCard?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.advItems?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.packItems?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.ctaBox?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      return;
    }

    // Observer pour les sections principales
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    allSections.forEach((section) => {
      sectionObserver.observe(section);
    });

    // Observer pour le section-head
    const sectionHeadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionHeadObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    this.sectionHead?.toArray().forEach((head) => {
      sectionHeadObserver.observe(head.nativeElement);
    });

    // Observer pour la carte de contact
    this.contactCard?.toArray().forEach((card) => {
      sectionObserver.observe(card.nativeElement);
    });

    // Observer pour les avantages avec délais échelonnés
    let advIndex = 0;
    const advObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentIndex = advIndex++;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, currentIndex * 100);
            advObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    this.advItems?.toArray().forEach((adv) => {
      advObserver.observe(adv.nativeElement);
    });

    // Observer pour les packs avec délais échelonnés
    let packIndex = 0;
    const packObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentIndex = packIndex++;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, currentIndex * 150);
            packObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    this.packItems?.toArray().forEach((pack) => {
      packObserver.observe(pack.nativeElement);
    });

    // Observer pour la CTA box
    this.ctaBox?.toArray().forEach((box) => {
      sectionObserver.observe(box.nativeElement);
    });
  }
}
