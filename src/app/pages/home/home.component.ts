import { CommonModule,isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type Highlight = {
  day: string;
  date: string;
  title: string;
  items: string[];
};

type Benefit = {
  icon: string;
  title: string;
  desc: string;
};

type Faq = {
  question: string;
  answer: string;
  isOpen: boolean;
};

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  theme = 'Fiscalité & Prix de Transfert';
  dates = '02–05 Mars 2026';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  benefits: Benefit[] = [
    {
      icon: 'school',
      title: 'Apprentissage',
      desc: 'Loi de finances 2026, fiscalité locale, prix de transfert et pratiques terrain avec des experts.',
    },
    {
      icon: 'groups',
      title: 'Réseautage',
      desc: 'Rencontres avec juristes, fiscalistes, cabinets, institutions et acteurs économiques.',
    },
    {
      icon: 'workspace_premium',
      title: 'Opportunités',
      desc: 'Stages, immersion pro, échanges directs et visibilité auprès de structures partenaires.',
    },
  ];

  highlights: Highlight[] = [
    {
      day: 'Jour 1',
      date: '03 Mars 2026',
      title: 'Ouverture & Table ronde',
      items: [
        'Cérémonie officielle d’ouverture (ruban symbolique)',
        'Table ronde : Fiscalité et prix de transfert',
      ],
    },
    {
      day: 'Jour 2',
      date: '04 Mars 2026',
      title: 'Séminaire & Clinique juridique',
      items: [
        'Séminaire sur la loi de finances 2026 (WALT)',
        'Foire des métiers (débouchés)',
        'Clinique juridique ouverte au public',
      ],
    },
    {
      day: 'Jour 3',
      date: '05 Mars 2026',
      title: 'Simulation & Clôture',
      items: [
        'Procès fictif & formation arbitrale',
        'Cercle des experts (thématique libre)',
        'Cérémonie de clôture + Awards/Quiz',
      ],
    },
  ];

  partners = [
    { name: 'Chazai Wamba', logo: 'assets/images/partner/Chazai_Wamba.jpg' },
    { name: 'AKOA MBALLA & Co', logo: 'assets/images/partner/AKOA_MBALLA_&_Co.png' },
    { name: 'JURITAX conseil', logo: 'assets/images/partner/JURITAX_conseil.png' },
    { name: 'Yaoundé Toastmasters club', logo: 'assets/images/partner/Yaoundé_Toastmasters_club.png' },
    { name: 'L\'oeil du reporter', logo: 'assets/images/partner/L_oeil_du_reporter.png' },
    { name: 'Innov communication', logo: null },
    { name: 'H3 télévision', logo: null }
  ];

  contactEmail = 'taxandlegaldays2026@gmail.com';
  contactPhone = '+237 650 09 38 61';

  faqs: Faq[] = [
    {
      question: 'Qui peut participer aux Tax & Legal Days ?',
      answer: 'L\'événement est ouvert à tous : étudiants en droit, fiscalistes, juristes, professionnels des affaires, entreprises et toute personne intéressée par les questions fiscales et juridiques. La clinique juridique du Jour 2 est également accessible au grand public.',
      isOpen: false
    },
    {
      question: 'L\'inscription est-elle obligatoire ?',
      answer: 'Oui, l\'inscription est recommandée pour mieux organiser l\'événement et vous garantir une place, notamment pour les ateliers et la foire des métiers. Les modalités d\'inscription seront communiquées via nos canaux officiels (email et réseaux sociaux).',
      isOpen: false
    },
    {
      question: 'Quel est le coût de participation ?',
      answer: 'La participation aux conférences et tables rondes est gratuite. Certaines activités spécifiques (formations certifiantes, ateliers avancés) peuvent faire l\'objet de frais d\'inscription symboliques pour couvrir les supports pédagogiques.',
      isOpen: false
    },
    {
      question: 'Comment devenir sponsor ou partenaire ?',
      answer: 'Nous proposons trois formules : Silver, Gold et Diamond, offrant différents niveaux de visibilité (campus UCAC, réseaux sociaux, supports imprimés, stands à la foire). Contactez-nous à taxandlegaldays2026@gmail.com ou consultez notre page Sponsoring pour obtenir le dossier complet.',
      isOpen: false
    },
    {
      question: 'Où se déroule l\'événement exactement ?',
      answer: 'L\'événement aura lieu sur le Campus d\'Ekounou de l\'Université Catholique d\'Afrique Centrale (UCAC), situé à Yaoundé, Cameroun. Des indications précises seront communiquées aux participants inscrits.',
      isOpen: false
    },
    {
      question: 'Y a-t-il des opportunités de stage ou d\'emploi ?',
      answer: 'Oui ! La foire des métiers du Jour 2 permet des échanges directs avec cabinets d\'avocats, fiduciaires, institutions et entreprises partenaires. C\'est une excellente occasion de déposer votre CV et d\'explorer des opportunités de stage ou d\'insertion professionnelle.',
      isOpen: false
    },
    {
      question: 'Puis-je obtenir une attestation de participation ?',
      answer: 'Oui, une attestation de participation sera délivrée aux participants présents aux différentes sessions. Pour certaines formations (arbitrage, clinique juridique), des certificats spécifiques pourront être remis.',
      isOpen: false
    },
    {
      question: 'Comment rester informé des actualités de l\'événement ?',
      answer: 'Suivez-nous sur nos réseaux sociaux (Facebook, LinkedIn, Twitter) et abonnez-vous à notre liste de diffusion en nous contactant par email. Toutes les mises à jour importantes seront communiquées régulièrement.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  // Références aux sections
  @ViewChildren('aboutSection', { read: ElementRef }) aboutSection!: QueryList<ElementRef>;
  @ViewChildren('benefitsSection', { read: ElementRef }) benefitsSection!: QueryList<ElementRef>;
  @ViewChildren('highlightsSection', { read: ElementRef }) highlightsSection!: QueryList<ElementRef>;
  @ViewChildren('partnersSection', { read: ElementRef }) partnersSection!: QueryList<ElementRef>;
  @ViewChildren('ctaSection', { read: ElementRef }) ctaSection!: QueryList<ElementRef>;
  @ViewChildren('faqSection', { read: ElementRef }) faqSection!: QueryList<ElementRef>;
  @ViewChildren('contactSection', { read: ElementRef }) contactSection!: QueryList<ElementRef>;
  
  @ViewChildren('cardItem', { read: ElementRef })
  cardItems!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initScrollReveal();
      }, 100);
    }
  }


  private initScrollReveal(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Collecter toutes les sections
    const allSections: HTMLElement[] = [];
    
    this.aboutSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.benefitsSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.highlightsSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.partnersSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.ctaSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.faqSection?.toArray().forEach(el => allSections.push(el.nativeElement));
    this.contactSection?.toArray().forEach(el => allSections.push(el.nativeElement));

    if (prefersReducedMotion) {
      // Si animations réduites, afficher tout immédiatement
      allSections.forEach(el => el.classList.add('is-visible'));
      this.cardItems?.toArray().forEach(el => el.nativeElement.classList.add('is-visible'));
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

    // Observer pour les cartes avec délais échelonnés
    let cardIndex = 0;
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Délai progressif pour un effet cascade
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

    this.cardItems?.toArray().forEach((card) => {
      cardObserver.observe(card.nativeElement);
    });
  }
}
