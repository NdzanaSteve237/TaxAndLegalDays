
// src/app/pages/comite/comite.component.ts
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  computed,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type Person = {
  name: string;
  role: string;
  group: 'Bureau exécutif' | 'Responsables de cellules';
  coRole?: string;
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleClass: string; // For CSS class binding
  description: string;
  photo: string;
  socials: Social[];
}

export interface Social {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  url: string;
}

@Component({
  standalone: true,
  selector: 'app-comite',
  imports: [CommonModule, MatIconModule],
  templateUrl: './comite.component.html',
  styleUrl: './comite.component.scss',
})
export class ComiteComponent implements AfterViewInit {
  people: Person[] = [
    // Bureau exécutif
    { group: 'Bureau exécutif', role: 'Président', name: 'ONANA NGA THEO-LOIC' },
    { group: 'Bureau exécutif', role: 'Vice présidente', name: 'FOUDA MARIE ANGE' },
    { group: 'Bureau exécutif', role: 'Secrétariat Général', name: 'TCHOUANKA YOUMBI EMMANUEL' },
    { group: 'Bureau exécutif', role: 'Secrétariat Général', name: 'FONDJO KUISSU BRENDA' },
    { group: 'Bureau exécutif', role: 'Secrétariat Particulier', name: 'LEKABOTH FERDINAND' },
    { group: 'Bureau exécutif', role: 'Evaluateur Général', name: 'NGEUTCHOUA Ralph' },
    { group: 'Bureau exécutif', role: 'Trésorier', name: 'METANG JOSEMARIA' },
    { group: 'Bureau exécutif', role: 'Commissaire aux comptes', name: 'JOGO LARISSA' },
    { group: 'Bureau exécutif', role: 'Relations Publiques', name: 'MEZENE ABOLO RUTH ASTRIDE' },
    { group: 'Bureau exécutif', role: 'Relations Publiques', name: 'PHILIPPE MAXIME AKOA' },

    // Responsables de cellules
    { group: 'Responsables de cellules', role: 'Communication', name: 'NGAMENI FRANCESCA' },
    { group: 'Responsables de cellules', role: 'Communication', name: 'ESSONO ATANGANA Fernande' },

    { group: 'Responsables de cellules', role: 'Comité scientifique', name: 'BINAM Serena' },
    { group: 'Responsables de cellules', role: 'Comité scientifique', name: 'OLAMA MINDJIMBA Marie Audrey' },

    { group: 'Responsables de cellules', role: 'Clinique juridique', name: 'ELIANE Olivier' },
    { group: 'Responsables de cellules', role: 'Clinique juridique', name: 'MENGUE ZIBI Oceanne' },

    { group: 'Responsables de cellules', role: 'Foire des métiers', name: 'BAYIHA OBATE Hanniel' },
    { group: 'Responsables de cellules', role: 'Foire des métiers', name: 'FONDJO KUISSU Brenda' },

    { group: 'Responsables de cellules', role: 'Olympiades & Quiz', name: 'MEKA FOTIE' },
    { group: 'Responsables de cellules', role: 'Olympiades & Quiz', name: 'KAMGNE WAFO Ivanna' },

    { group: 'Responsables de cellules', role: 'Gastronomie', name: 'LEUMOU Christianne' },
    { group: 'Responsables de cellules', role: 'Gastronomie', name: 'TSITSI EBA Djene' },

    { group: 'Responsables de cellules', role: 'Décoration', name: 'MAFOTEU NDEBI Tanya' },
    { group: 'Responsables de cellules', role: 'Décoration', name: 'FOTSO NGUEMGNE Lorrainne' },

    { group: 'Responsables de cellules', role: 'Protocole', name: 'SILLA TONYE Catherine La Grande' },
    { group: 'Responsables de cellules', role: 'Protocole', name: 'NGOUNOU KENMOE Michelle' },

    { group: 'Responsables de cellules', role: 'Logistique', name: 'HALIM ADAM' },
    { group: 'Responsables de cellules', role: 'Logistique', name: 'NJINKOUE HEUBIA Niels' },

    { group: 'Responsables de cellules', role: 'Intermède', name: 'FOTSO NGUEMGNE Lorraine' },
    { group: 'Responsables de cellules', role: 'Procès fictif', name: 'MBARGA MESSE Patrick-Landry' },

    { group: 'Responsables de cellules', role: 'Ressources humaines', name: 'SIKADI DORCAS Franceska' },
    { group: 'Responsables de cellules', role: 'Ressources humaines', name: 'ANDOMO MICHELE-ELIE' },

    { group: 'Responsables de cellules', role: 'Brunch et Awards', name: 'ABOMO ZE Laury' },
    { group: 'Responsables de cellules', role: 'Brunch et Awards', name: 'AFANE NGONO Cassandra' },
  ];

  bureau = computed(() => this.filterByGroup('Bureau exécutif'));
  cellules = computed(() => this.filterByGroup('Responsables de cellules'));

  private filterByGroup(group: Person['group']) {
    return this.people.filter(p => p.group === group);
  }

  // Scroll reveal
  //@ViewChildren('revealCard', { read: ElementRef })
  //revealCards!: QueryList<ElementRef<HTMLElement>>;

  
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  // Signal for team members data
  teamMembers = signal<TeamMember[]>([
    {
      id: '1',
      name: 'ONANA NGA THEO-LOIC',
      role: 'Président',
      roleClass: 'chef',
      description: '',
      photo: 'assets/images/team/president.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '2',
      name: 'FOUDA MARIE ANGE',
      role: 'Vice présidente',
      roleClass: 'chef',
      description: '',
      photo: 'assets/images/team/vice_presi.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '3',
      name: 'TCHOUANKA YOUMBI EMMANUEL',
      role: 'Secrétariat Général',
      roleClass: 'directeur',
      description: '',
      photo: 'assets/images/team/sg.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '4',
      name: 'NGUEUTCHOUA Ralph',
      role: 'Evaluateur Général',
      roleClass: 'directeur',
      description: '',
      photo: 'assets/images/team/evaluator_general.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '5',
      name: 'ANDOMO ANDOMO MICHELE-ELIE',
      role: 'Responsable des Ressources Humaines',
      roleClass: 'developpeur',
      description: '',
      photo: 'assets/images/team/rh.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '6',
      name: 'SILLA TONYE',
      role: 'Responsable de la Cellule Protocole',
      roleClass: 'responsable',
      description: '',
      photo: 'assets/images/team/celprotocol.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: '7',
      name: 'ESSENGUE NNENGUE RUPHINE',
      role: 'Responsable Foire des Métiers',
      roleClass: 'directeur',
      description: '',
      photo: 'assets/images/team/respo_metier.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    
    {
      id: '8',
      name: 'NGAMENI FRANCESCA',
      role: 'Responsable Communication',
      roleClass: 'directeur',
      description: '',
      photo: 'assets/images/team/celcom.jpeg',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    }
  ]);

  topMembers = computed(() => this.teamMembers().slice(0, 3));
  scrollMembers = computed(() => this.teamMembers().slice(3));

  ngAfterViewInit(): void {
    // SSR guard (Angular/Vite SSR: window/IntersectionObserver not available)
    if (typeof window === 'undefined') return;

    this.setupIntersectionObserver();

    const els = this.revealCards?.toArray().map(r => r.nativeElement) ?? [];
    if (typeof IntersectionObserver === 'undefined' || els.length === 0) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(el => io.observe(el));
  }

  /**
   * Setup Intersection Observer for reveal animations
   */
  private setupIntersectionObserver(): void {
    // SSR / unsupported browser guard
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (!this.revealCards) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.revealCards.forEach(card => {
      observer.observe(card.nativeElement);
    });
  }

  /**
   * TrackBy function for ngFor optimization
   */
  trackByMember(index: number, member: TeamMember): string {
    return member.id;
  }

  /**
   * Get Material Icon name for social platform
   */
  getSocialIcon(platform: string): string {
    const iconMap: Record<string, string> = {
      facebook: 'facebook',
      twitter: 'twitter',
      instagram: 'instagram',
      linkedin: 'linkedin'
    };

    return iconMap[platform] || 'link';
  }

  trackByPerson(_: number, p: Person) {
    return `${p.group}-${p.role}-${p.name}`;
  }

  roleIcon(role: string) {
    const r = role.toLowerCase();
    if (r.includes('président')) return 'verified';
    if (r.includes('trésor')) return 'account_balance_wallet';
    if (r.includes('secrét')) return 'edit_note';
    if (r.includes('scientifique')) return 'biotech';
    if (r.includes('communication')) return 'campaign';
    if (r.includes('logistique')) return 'local_shipping';
    if (r.includes('protocole')) return 'badge';
    if (r.includes('clinique')) return 'gavel';
    if (r.includes('quiz') || r.includes('olympiades')) return 'emoji_events';
    if (r.includes('décoration')) return 'palette';
    if (r.includes('gastronomie')) return 'restaurant';
    if (r.includes('ressources')) return 'groups';
    if (r.includes('procès')) return 'policy';
    return 'person';
  }
}
