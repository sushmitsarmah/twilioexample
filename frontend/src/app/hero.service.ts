import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

	private headers = new Headers({'Content-Type': 'application/json'});
	// private heroesUrl = 'api/heroes';  // URL to web api
	private heroesUrl = 'http://localhost:3000/api/heroes';

	constructor(private http: Http) { }

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
	           .toPromise()
	           .then((response) => { 
	           		return response.json() as Hero[] 
	           	})
	           .catch(this.handleError);
	}	

  	// getHeroes(): Promise<Hero[]> {
  	// 	return Promise.resolve(HEROES);
  	// }

 	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise<Hero[]>(resolve =>
		    setTimeout(resolve, 2000)) // delay 2 seconds
		    .then(() => this.getHeroes()
		);
	}

	getHero(id: number): Promise<Hero> {
	  return this.getHeroes()
	             .then(heroes => heroes.find(hero => hero.id === id));
	}

	update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http
	    .put(url, JSON.stringify(hero), {headers: this.headers})
	    .toPromise()
	    .then(() => hero)
	    .catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
	  return this.http
	    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json())
	    .catch(this.handleError);
	}

	delete(id: number): Promise<void> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers})
	    .toPromise()
	    .then(() => null)
	    .catch(this.handleError);
	}			

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}		 
}