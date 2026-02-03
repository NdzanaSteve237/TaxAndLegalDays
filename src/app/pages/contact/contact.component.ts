// src/app/pages/contact/contact.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  form;
  constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    organization: [''],          // ✅ ajouté
    email: ['', [Validators.required, Validators.email]],
    phone: [''],                  // ✅ ajouté
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(15)]],
    consent: [true, [Validators.requiredTrue]],
  });
}
  // Parallax glow
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

  
  // Static contact info (adapter si besoin)
  email = 'taxandlegaldays2026@gmail.com';
  phoneDisplay = '+237 650 09 38 61';
  phoneTel = '+237650093861';
  location = 'UCAC — Campus d’Ekounou, Yaoundé';

  // WhatsApp (tu peux changer le numéro si nécessaire)
  whatsappNumberIntl = '237650093861';
  whatsappMessage = encodeURIComponent(
    'Bonjour, je souhaite obtenir des informations sur Tax & Legal Days 2026 (programme / sponsoring / participation).'
  );

  // Form
  sent = signal(false);
  sending = signal(false);

  get f() {
    return this.form.controls;
  }

  // Build mailto link (no backend required)
  buildMailto(): string {
    const v = this.form.getRawValue();
    const subject = encodeURIComponent(v.subject || 'Demande d’information');
    const body = encodeURIComponent(
      `Bonjour,\n\n` +
      `Nom: ${v.fullName}\n` +
      `Organisation: ${v.organization || '-'}\n` +
      `Email: ${v.email}\n` +
      `Téléphone: ${v.phone || '-'}\n\n` +
      `Message:\n${v.message}\n\n` +
      `Cordialement,`
    );
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  }

  submit() {
    this.sent.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // UX "sending" + ouverture mailto (simple et efficace)
    this.sending.set(true);

    setTimeout(() => {
      window.location.href = this.buildMailto();
      this.sending.set(false);
      this.sent.set(true);
    }, 350);
  }

  openWhatsApp() {
    const url = `https://wa.me/${this.whatsappNumberIntl}?text=${this.whatsappMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Scroll reveal pour les sections
  @ViewChildren('heroSection', { read: ElementRef }) heroSection!: QueryList<ElementRef>;
  @ViewChildren('heroLeft', { read: ElementRef }) heroLeft!: QueryList<ElementRef>;
  @ViewChildren('heroRight', { read: ElementRef }) heroRight!: QueryList<ElementRef>;
  @ViewChildren('contactCard', { read: ElementRef }) contactCards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    // SSR guard
    if (typeof window === 'undefined') return;

    // Attendre que la vue soit complètement initialisée
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  private initScrollReveal(): void {
    // SSR / unsupported browser guard
    if (typeof window === 'undefined') return;

    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Collecter toutes les sections principales
    const allSections: HTMLElement[] = [];
    
    this.heroSection?.toArray().forEach(el => allSections.push(el.nativeElement));

    if (prefersReducedMotion) {
      // Si animations réduites, afficher tout immédiatement
      allSections.forEach(el => el.classList.add('is-visible'));
      this.heroLeft?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.heroRight?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.contactCards?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      return;
    }

    // Observer pour les sections principales
    if (typeof IntersectionObserver === 'undefined') {
      allSections.forEach(el => el.classList.add('is-visible'));
      this.heroLeft?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.heroRight?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      this.contactCards?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
      return;
    }

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

    // Observer pour hero-left et hero-right
    this.heroLeft?.toArray().forEach((left) => {
      sectionObserver.observe(left.nativeElement);
    });

    this.heroRight?.toArray().forEach((right) => {
      sectionObserver.observe(right.nativeElement);
    });

    // Observer pour les cartes de contact avec délais échelonnés
    let cardIndex = 0;
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentIndex = cardIndex++;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, currentIndex * 100);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    this.contactCards?.toArray().forEach((card) => {
      cardObserver.observe(card.nativeElement);
    });
  }
}
