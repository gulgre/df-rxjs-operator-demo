import { Injectable } from "@angular/core";
import { observable, Observable, pipe } from "rxjs";
import { concat, filter, map, scan, tap } from "rxjs/operators";
import { DemoOperation } from "../shared/demo-operation";


@Injectable({
    providedIn: 'root'
  })
export class OperationService {

    tapOperation = (source: Observable<any>) => source.pipe(
        tap((data) => console.log(data))
    );

    mapOperation = (source: Observable<any>) => source.pipe(
        map((data) => `The incoming data is ${data}, and twice that is ${data * 2}.`)
    );

    filterOperation = (source: Observable<any>) => source.pipe(
        filter((data) => data % 2 === 0)
    );

    scanOperation = (source: Observable<any>) => source.pipe(
        scan((acc: number[], data: number) => [...acc, data], [])
    );

    tapMapOperation = (source: Observable<any>) => source.pipe(
        tap(data => console.log(`About to double ${data}`)),
        map((data: number) => `The incoming data is ${data}, and twice that is ${data * 2}.`)
    );

    filterScanOperation = (source:Observable<any>) => source.pipe(
        filter((data) => data % 2 === 0),
        scan((acc: number[], data: number) => [...acc, data], [])
    );
    
    getBasicOperations(observableFactory: () => Observable<any>) {
        let operations: DemoOperation[] = [
            {
                title:'tap',
                shortDescription: 'Allows you to do something off to the side without affecting what comes out the other end',
                description: `Named after the tap you put inside a pipe that lets you draw water without changing the main water pipeline, this lets you take the data 
                and perform an operation on it (logging, sending elsewhere), and the data that came in is the same as the data that goes out. Open the console log (F12), 
                and notice that as the data is coming through and outputting on the screen, the console log is also getting the same data logged to it.`,
                observable$: observableFactory(),
                callback: this.tapOperation
            },
            {
                title:'map',
                shortDescription: `Allows you to transform incoming data to something else`,
                description: `Similar to javascript's "map" method, this takes data incoming from an Observable, and allows you to transform the data into something else.
                This is useful for transforming numeric data into a string message that contains that, doing calculations on incoming data, or fitting the incoming data into a
                class that another component/method is expecting.`,
                observable$: observableFactory(),
                callback: this.mapOperation
            },
            {
                title:'filter',
                shortDescription: `Filters out incoming data if it doesn't match a certain criteria.`,
                description: `Let's be honest, not every bit of data is useful. This operation lets you cut out incoming data that doesn't fit the mold. 
                This example filters out all odd values. `,
                observable$: observableFactory(),
                callback: this.filterOperation
            },
            {
                title:'scan',
                shortDescription: `Accumulates everything emitted into an array.`,
                description: `Sometimes you want to combine all the data that comes through, either in an array, or a sum. In this example, the "accumulator" is just an array,
                and each item that comes in gets added to the array.`,
                observable$: observableFactory(),
                callback: this.scanOperation
            },
        ]
        return operations;
    }

    getCombinedOperations(observableFactory: () => Observable<any>) {
        let operations: DemoOperation[] = [
            {
                title:'tap-map',
                shortDescription: 'Allows for logging of incoming items prior to transformation',
                description: `In development, you will often want to see what the data looks like at a certain stage, prior to manipulating. Combining tap and map operators
                allows you to do this very thing. You can also use tap-map combinations to make side calls to a server, or update information elsewhere in the app before
                transforming raw data into a formatted value for the user to see. Use the console log window (F12) to see what's getting logged, prior to the value being mapped for display`,
                observable$: observableFactory(),
                callback: this.tapMapOperation
            },
            {
                title:'filter-scan',
                shortDescription: 'filters out items before accumulating them',
                description: `Filtering on its own has little value, but if you can collect all the filtered values into one item, the advantages of filter grows exponentially. This example
                filters out all odd values, like in the basic example, and then combines those results into an array, like in the basic example.`,
                observable$: observableFactory(),
                callback: this.filterScanOperation
            },
        ]
        return operations;
    }

    getHigherOrderOperations() {

    }

    getComplexOperations() {

    }
}
