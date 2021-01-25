import { Injectable } from "@angular/core";
import { concat, merge, Observable, ObservableInput, of } from "rxjs";
import { concatMap, exhaust, exhaustMap, filter, map, mergeAll, mergeMap, scan, switchMap, take, tap } from "rxjs/operators";
import { DemoOperation } from "../shared/demo-operation";


@Injectable({
    providedIn: 'root'
  })
export class OperationService {

    tapOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        tap((data) => console.log(data))
    );

    mapOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        map((data) => `The incoming data is ${data}, and twice that is ${data * 2}.`)
    );

    filterOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        filter((data) => data % 2 === 0)
    );

    scanOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        scan((acc: number[], data: number) => [...acc, data], [])
    );

    concatOperation = (...sources: Observable<any>[]) => concat(...sources);
    mergeOperation = (...sources: Observable<any>[]) => merge(...sources);
    
    tapMapOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        tap(data => console.log(`About to double ${data}`)),
        map((data: number) => `The incoming data is ${data}, and twice that is ${data * 2}.`)
    );

    filterScanOperation = (...sources: Observable<any>[]) => sources[0].pipe(
        filter((data) => data % 2 === 0),
        scan((acc: number[], data: number) => [...acc, data], [])
    );
    
    switchMapOperationFactory(innerObservableFactory: any) {
        return (source: Observable<any>) => {
            return source.pipe(
                switchMap(element => innerObservableFactory(element))
            )
        }
    }

    concatMapOperationFactory(innerObservableFactory: any) {
        return (source: Observable<any>) => {
            return source.pipe(
                concatMap(element => innerObservableFactory(element)),                
            )
        }
    }

    mergeMapOperationFactory(innerObservableFactory: any) {
        return (source: Observable<any>) => {
            return source.pipe(
                mergeMap(element => innerObservableFactory(element))
            )
        }        
    }
    exhaustMapOperationFactory(innerObservableFactory: any) {
        return (source: Observable<any>) => {
            return source.pipe(            
                exhaustMap(element => innerObservableFactory(element))
            )
        }
    }
    
    
    getBasicOperations(...observableFactories: (() => Observable<any>)[]) {
        let operations: DemoOperation[] = [
            {
                title:'tap',
                shortDescription: 'Allows you to do something off to the side without affecting what comes out the other end',
                description: `Named after the tap you put inside a pipe that lets you draw water without changing the main water pipeline, this lets you take the data 
                and perform an operation on it (logging, sending elsewhere), and the data that came in is the same as the data that goes out. Open the console log (F12), 
                and notice that as the data is coming through and outputting on the screen, the console log is also getting the same data logged to it.`,
                code: 'tap((data) => console.log(data))',
                observables$: observableFactories.map(f => f()),
                callback: this.tapOperation
            },
            {
                title:'map',
                shortDescription: `Allows you to transform incoming data to something else`,
                description: `Similar to javascript's "map" method, this takes data incoming from an Observable, and allows you to transform the data into something else.
                This is useful for transforming numeric data into a string message that contains that, doing calculations on incoming data, or fitting the incoming data into a
                class that another component/method is expecting.`,
                code: 'map((data) => `The incoming data is ${data}, and twice that is ${data * 2}.`)',
                observables$: observableFactories.map(f => f()),
                callback: this.mapOperation
            },
            {
                title:'filter',
                shortDescription: `Filters out incoming data if it doesn't match a certain criteria.`,
                description: `Let's be honest, not every bit of data is useful. This operation lets you cut out incoming data that doesn't fit the mold. 
                This example filters out all odd values. `,
                code: 'filter((data) => data % 2 === 0)',
                observables$: observableFactories.map(f => f()),
                callback: this.filterOperation
            },
            {
                title:'concat',
                shortDescription: `Combines multiple observables under one observable, preserving order`,
                description: `This isn't an operator function, it's an rxjs static method that lets you combine streams into one. When one stream comes in, 
                the entirety of that stream gets processed until it completes, and then the next one follows after that.

                This is easy to mess up if you're not explicitly concatenating streams. If, say, you want to concatenate an array of observables, make sure you use
                the spread operator -- concat(...sources) instead of just passing in the straight array of observables -- concat(sources)

                There are two data streams being merged; one is a data stream of numbers 1 through 5, emitted every second. The other is a data stream of 
                numbers 6 through 10, emitted every 800ms.

                Notice how the numbers still maintain their order.`,                
                code: 'concat(source1, source2, source3, ...) OR concat(...sources)',
                observables$: observableFactories.map(f => f()),
                callback: this.concatOperation
            },
            {
                title:'merge',
                shortDescription: `Combines multiple observables under one observable, without preserving the order.`,
                description: `This isn't an operator function, it's an rxjs static method that lets you combine streams into one. 
                When multiple streams are merged, each emitted value gets processed immediately in the pipeline.                
                
                This is easy to mess up if you're not explicitly concatenating streams. If, say, you want to merge an array of observables, make sure you use
                the spread operator -- merge(...sources) instead of just passing in the straight array of observables -- merge(sources)

                There are two data streams being merged; one is a data stream of numbers 1 through 5, emitted every second. The other is a data stream of 
                numbers 6 through 10, emitted every 800ms.

                Notice how the numbers jump out of order.`,                
                code: 'merge(source1, source2, source3, ...) OR merge(...sources)',
                observables$: observableFactories.map(f => f()),
                callback: this.mergeOperation
            },
            {
                title:'scan',
                shortDescription: `Accumulates everything emitted into an array.`,
                description: `Sometimes you want to combine all the data that comes through, either in an array, or a sum. In this example, the "accumulator" is just an array,
                and each item that comes in gets added to the array.`,
                code: 'source.pipe(\r\n' + 
                    '  scan((acc: number[], data: number) => [...acc, data], [])\r\n' + ')',                
                observables$: observableFactories.map(f => f()),
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
                code: 'tap(data => console.log(About to double ${data}`)),\r\n' + 
                    'map((data: number) => `The incoming data is ${data}, and twice that is ${data * 2}.`)',
                observables$: [observableFactory()],
                callback: this.tapMapOperation
            },
            {
                title:'filter-scan',
                shortDescription: 'filters out items before accumulating them',
                description: `Filtering on its own has little value, but if you can collect all the filtered values into one item, the advantages of filter grows exponentially. This example
                filters out all odd values, like in the basic example, and then combines those results into an array, like in the basic example.`,
                code: 
                    'filter((data) => data % 2 === 0),\r\n' + 
                    'scan((acc: number[], data: number) => [...acc, data], [])',
                observables$: [observableFactory()],
                callback: this.filterScanOperation
            },
        ]
        return operations;
    }

    getHigherOrderOperations(outerObservableFactory: () => Observable<any>, innerObservableFactory: (element: any) => Observable<any>) {
        let operations: DemoOperation[] = [
            {
                title:'concatMap',
                shortDescription: 'Flattens all inner data streams into a single stream, ensuring the inner data streams are processed in the order they were received.',
                description: `If the order of a data stream matters, you go with concatMap. This will make sure that everything in the Inner Observable
                is complete before processing data of the next emitted stream. You MUST make sure when using this that you are using data streams/observables that complete,
                otherwise the other streams will never be processed.
                
                This function also ensures that every emitted piece of data is processed.`,
                code: '... .pipe(\n' + 
                    '  concatMap(dataEmitted => getObservableDataFromThisData(dataEmitted))\n' +
                '); ',
                observables$: [outerObservableFactory()],
                callback: this.concatMapOperationFactory(innerObservableFactory)
            },
            {
                title:'switchMap',
                shortDescription: 'Flattens all inner data streams into a single stream, cancelling prior streams if a new one comes in.',
                description: `If one data stream emits and you want that to override the previous data stream, you would use this method. It immediately cancels the
                subscription to the previous inner data stream and subscribes to the present one. Typically this is used for things like a typeahead search, or changing filters on
                a table lookup.
                
                Note that this function does not guarantee to process all data, please use this method with that understanding.`,                
                code: 
                    '... .pipe(\n' + 
                    '  switchMap(dataEmitted => getObservableDataFromThisData(dataEmitted))\n' +
                '); ',
                observables$: [outerObservableFactory()],
                callback: this.switchMapOperationFactory(innerObservableFactory)
            },
            {
                title:'mergeMap',
                shortDescription: 'Flattens all inner data streams into a single stream, and whenever any of the inner data streams emits a value, it process it immediately.',
                description: `If it doesn't matter what the result is of the Outer Observable, and you would rather just process the data as soon as possible, mergeMap is your choice.
                
                This function also ensures that every emitted piece of data is processed.`,
                code: 
                    '... .pipe(\n' + 
                    '  mergeMap(dataEmitted => getObservableDataFromThisData(dataEmitted))\n' +
                '); ',
                observables$: [outerObservableFactory()],
                callback: this.mergeMapOperationFactory(innerObservableFactory)
            },
            {
                title:'exhaustMap',
                shortDescription: 'Flattens all inner data streams into a single stream, not accepting any incoming data streams until the current inner stream is processing.',
                description: `When you care about completing the current process before even considering doing more work, exhaustMap is the function to use. One of the most common uses of this
                is preventing users from submitting a form twice by going crazy with the clicking.
                
                Note that this function does not guarantee to process all data, please use this method with that understanding.`,
                code: 
                    '... .pipe(\n' + 
                    '  exhaustMap(dataEmitted => getObservableDataFromThisData(dataEmitted))\n' +
                '); ',
                observables$: [outerObservableFactory()],
                callback: this.exhaustMapOperationFactory(innerObservableFactory)
            },
        ]
        return operations;
    }

    getComplexOperations() {

    }
}
