import { Observable } from "rxjs";

export interface DemoOperation {
    title: string;
    shortDescription: string;
    description: string;   
    code?: string; 
    observables$: Observable<any>[],
    callback: (source: Observable<any>[]) => Observable<any>;
}
