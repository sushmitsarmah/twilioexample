import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import '../../public/css/styles.styl';
import { Hero } from './hero';
import { HeroService } from './hero.service';


const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [HeroService]
})

export class AppComponent implements OnInit { 
	imgsrc = '../../public/images/angular.png';
	heroes = HEROES;
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => this.heroes = heroes);
    // this.heroes = this.heroService.getHeroes();
  }  

  ngOnInit(): void {
    this.getHeroes();
  }  

  onSelect(hero: Hero): void {
	    this.selectedHero = hero;
	}
}