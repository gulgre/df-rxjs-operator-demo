import { Observable } from "rxjs";

export interface DemoOperation {
    title: string;
    shortDescription: string;
    description: string;   
    code?: string; 
    observable$: Observable<any>,
    callback: (source: Observable<any>) => Observable<any>;
}
