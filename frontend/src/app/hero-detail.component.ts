import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Hero } from './hero';

import { HeroService } from './hero.service';

@Component({
	selector: 'my-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.styl']
})

export class HeroDetailComponent implements OnInit {

	constructor(
	  private heroService: HeroService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
	  this.route.params
	    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
	    .subscribe(hero => this.hero = hero);
	}

	goBack(): void {
	  this.location.back();
	}	

	save(): void {
	  this.heroService.update(this.hero)
	    .then(() => this.goBack());
	}		

	@Input()
	hero: Hero;	
}