// src/app/pages/program/program.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  computed,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type ProgramItem = {
  time?: string;
  title: string;
  desc: string;
  tag: 'Pédagogique' | 'Professionnel' | 'Grand public' | 'Cérémonie';
  icon: string;
};

type ProgramDay = {
  key: 'J1' | 'J2' | 'J3';
  label: string;
  date: string;
  theme?: string;
  items: ProgramItem[];
};

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './program.component.html',
  styleUrl: './program.component.scss',
})
export class ProgramComponent {
  // Parallax state (signals)
  private mouseX = signal(0);
  private mouseY = signal(0);
  private scrollY = signal(0);

  // Active day tab
  activeDayKey = signal<ProgramDay['key']>('J1');

  days: ProgramDay[] = [
    {
      key: 'J1',
      label: 'Jour 1',
      date: '03 Mars 2026',
      theme: 'Ouverture & Table ronde',
      items: [
        {
          time: 'Matin',
          title: 'Cérémonie officielle d’ouverture',
          desc: 'Lancement officiel des Tax & Legal Days 2026, coupure du ruban symbolique et accueil des invités.',
          tag: 'Cérémonie',
          icon: 'emoji_events',
        },
        {
          time: 'Après-midi',
          title: 'Table ronde : Fiscalité et prix de transfert',
          desc: 'Échanges entre professionnels et participants sur les enjeux actuels, bonnes pratiques et perspectives.',
          tag: 'Professionnel',
          icon: 'forum',
        },
        {
          time: 'Soir',
          title: 'Activités pédagogiques & networking',
          desc: 'Moments d’échanges informels, orientation et rencontres entre étudiants, intervenants et partenaires.',
          tag: 'Grand public',
          icon: 'groups',
        },
      ],
    },
    {
      key: 'J2',
      label: 'Jour 2',
      date: '04 Mars 2026',
      theme: 'Loi de finances & Clinique juridique',
      items: [
        {
          time: 'Matin',
          title: 'Séminaire : Loi de Finances 2026',
          desc: 'Analyse des novations fiscales et douanières, focus fiscalité locale. Animé par WALT (parrain pro).',
          tag: 'Pédagogique',
          icon: 'school',
        },
        {
          time: 'Après-midi',
          title: 'Foire des métiers',
          desc: 'Découverte des débouchés (cabinet, entreprise, administration, conseil). Rencontres et guidance.',
          tag: 'Grand public',
          icon: 'work',
        },
        {
          time: 'Après-midi',
          title: 'Clinique juridique (ouverte au public)',
          desc: 'Consultations encadrées: réponses aux questions de droit & fiscalité, avec appui de professionnels.',
          tag: 'Professionnel',
          icon: 'gavel',
        },
      ],
    },
    {
      key: 'J3',
      label: 'Jour 3',
      date: '05 Mars 2026',
      theme: 'Simulation & clôture',
      items: [
        {
          time: 'Matin',
          title: 'Procès fictif & stratégie arbitrale',
          desc: 'Mise en pratique des acquis, immersion procédurale, focus sur une étape clé de la sentence arbitrale.',
          tag: 'Pédagogique',
          icon: 'policy',
        },
        {
          time: 'Après-midi',
          title: 'Le Cercle des Experts',
          desc: 'Plate-forme d’échanges intellectuels: juristes, fiscalistes et dirigeants sur une thématique au choix.',
          tag: 'Professionnel',
          icon: 'psychology',
        },
        {
          time: 'Soir',
          title: 'Cérémonie de clôture + Awards/Quiz',
          desc: 'Récompenses, bilan, remerciements (partenaires, sponsors, intervenants).',
          tag: 'Cérémonie',
          icon: 'military_tech',
        },
      ],
    },
  ];

  activeDay = computed(() => this.days.find(d => d.key === this.activeDayKey())!);

  // Parallax styles computed
  orbStyle = computed(() => {
    const x = this.mouseX();
    const y = this.mouseY();
    const s = this.scrollY();

    // normalized: -1..1 (approx)
    const nx = (x - 0.5) * 2;
    const ny = (y - 0.5) * 2;

    // subtle moves + scroll influence
    const tx = nx * 18;
    const ty = ny * 14 + (s * 0.02);

    return {
      transform: `translate3d(${tx}px, ${ty}px, 0)`,
    };
  });

  gridStyle = computed(() => {
    const s = this.scrollY();
    return {
      transform: `translate3d(0, ${s * 0.03}px, 0)`,
    };
  });

  headerParallaxStyle = computed(() => {
    const s = this.scrollY();
    return {
      transform: `translate3d(0, ${s * 0.12}px, 0)`,
    };
  });

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.mouseX.set(e.clientX / w);
    this.mouseY.set(e.clientY / h);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY.set(window.scrollY || 0);
  }

  setDay(key: ProgramDay['key']) {
    this.activeDayKey.set(key);
  }

  tagClass(tag: ProgramItem['tag']) {
    switch (tag) {
      case 'Cérémonie':
        return 'tag tag-gold';
      case 'Pédagogique':
        return 'tag tag-blue';
      case 'Professionnel':
        return 'tag tag-purple';
      default:
        return 'tag tag-soft';
    }
  }
}
