import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import '../../public/css/styles.styl';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.styl']
})

export class HeroesComponent implements OnInit { 
	imgsrc = '../../public/images/angular.png';
	heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService,
              private router: Router ) { }

  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => this.heroes = heroes);
    // this.heroes = this.heroService.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }  

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }  

  ngOnInit(): void {
    this.getHeroes();
  }  

  onSelect(hero: Hero): void {
	    this.selectedHero = hero;
	}
}