import { TicketGlobalService } from './ticket-global.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs"; 
import { Injectable } from '@angular/core';


@Injectable({providedIn:'root'})
export class TicketRoutingResolveService implements Resolve<null>{

    constructor(private ticketGlobalService:TicketGlobalService, private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id'] : null;

        if(id){
            return this.ticketGlobalService.returnAdmin(id).pipe(
                mergeMap((rol: any) =>{
                    if(rol.response)
                    {
                        return of(rol.response);
                    }else{
                        this.router.navigate(['404']);
                        return EMPTY;
                    }
                } )
            )
        }
        return of(null);
    }
}