# Aop-Routing
Provides the capability to perform [Imperative and Popstate navigation](https://medium.com/analytics-vidhya/angular-routing-imperative-vs-popstate-7d254b495c54) operations in Angular through the ease of typescript decorators, without the need to import the Angular Router object

# Installation
Aop-Routing runs on NodeJs and is available as an NPM package
```
npm install aop-routing
```

# Usage
1. Add **AopRoutingModule** to the top level/root module import array.
```
 imports: [
   ...,
    AopRoutingModule
  ]
```
2. Inject **AopNavigationService** into your top level/root module constructor.
```
export class AppModule {
  constructor(private navigationService: NavigationService) {}
 }
```
## Features
Aop-Routing has a lot of features pertaining to angular routing.
### Decorator Navigation
#### RouteNext
The **RouteNext** decorator can be passed an optional string, and it will automatically perform an imperative routing to the next page at the end of the targetted method's execution.
The below example will automatically route to page1 at the end of the testMethod execution.
```
@RouteNext('page1')
public testMethod(): void {
 ...some logic...
}
```
Should the need be required to pass a dynamic value to RouteNext, this can be done by allowing the targetted function to return a string or an **AopNavigator Object**.

1. Below example will use the returned string value of the testMethod to route to the page
```
@RouteNext()
public testMethod(): string {
 ...some logic...
return 'page1'
}
```

2. Below example will use the returned **AopNavigator object** of the test method to perform routing.
```
@RouteNext()
public testMethod(): string {
 ...some logic...
  const obj: AopNavigator = {
     destinationPage: 'Test2',
   };
return obj;
}
```

#### RouteNextAsync
The **RouteNextAsync** decorator can be used on a function which performs **rxjs** [aysnchronous](https://medium.com/analytics-vidhya/asynchronous-programming-in-a-nutshell-theory-d5fd07cf3b22) operations. The function should return an observable. The **RouteNextAsync** will subscribe to the passed observable and automatically perform imperative navigation.

1. Below example will route to page1 after the asynchronous operation inside the method is complete.
```
@RouteNextAsync('page1')
public testMethod() {
 return of(...some async operations).pipe(
 ...rxjs operators...)
}
```

Should the navigation be dependent on dynamic value from the targetted method, then the method can return an **Observable<string>** or **AopNavigator object** which the decorator will use to perform imperative navigation
   
 
 1. Below example will make the decorator subscribe to the **Observable<string>** value returned from the targetted method and use that value to perform
 imperative routing.
 
 ```
@RouteNextAsync()
public testMethod(): Observable<string> {
   ...some logic...
   return of(1, 2, 3).pipe(
    switchMap(x => {
      return of('page1');
    })
  );
}
 ```
   
 
 2.  Below example will make the decorator subscribe to the **AopNavigator object** returned from the targetted method and use the **destinationPage** property value to perform
 imperative routing.
 
 ```
 @RouteNextAsync()
 public testMethod(): Observable<AopNavigator> {
   ...some logic...
   
    const obj: AopNavigator = {
     destinationPage: 'Test2',
   };

   return of(1, 2, 3).pipe(
    switchMap(x => {
      return of(obj);
    })
  );
 }
 ```
 
 #### NavigationExtras for RouteNext and RouteNextAsync
 An [Angular NavigationExtras object](https://angular.io/api/router/NavigationExtras) can be passed to RouteNext and RouteNextAsync to allow extra options to modify the Router navigation strategy.
  
The below example will route to page1 and set the Router **skipLocationChange** to true
```
@RouteNext('page1',  {skipLocationChange: true})
public testMethod(): void {
 ...some logic...
}
```
 
 
 #### RouteBack
 RouteBack decorator when used on a targetted method, will automatically perform popstate navigation back to the previous page after the end of the targetted method execution.
   
 ```
 @RouteBack()
 public testMethod() {
  ...some logic...
 }
 ```
 
 #### RouteBackAsync
The **RouteBackAsync** decorator can be used on a function which performs **rxjs** [aysnchronous](https://medium.com/analytics-vidhya/asynchronous-programming-in-a-nutshell-theory-d5fd07cf3b22) operations. The function should return an observable. The **RouteBackAsync** will subscribe to the passed observable and automatically perform popstate navigation to the previous page.


#### RouteToState
RouteToState decorator when used on a targetted method, will automatically perform popste navigation to the destination page in the history state. If a negative number is provided, RouteToState will popstate naivage backwards equivalent to the passed integer, likewise it will popstate navigate forwards for a positive integer.


1. Below example will traverse 2 states backwards of the browser history state
```
@RouteToState(-2)
public testMethod() {
 ...some logic...
}
```

2. Below example will traverse 2 states forward of the browser history state
```
@RouteToState(2)
public testMethod() {
 ...some logic...
}
```

#### RouteToStateAsync
The **RouteToStateAsync** decorator can be used on a function which performs **rxjs** [aysnchronous](https://medium.com/analytics-vidhya/asynchronous-programming-in-a-nutshell-theory-d5fd07cf3b22) operations. The function should return an observable. The **RouteToStateAsync** will subscribe to the passed observable and automatically perform popstate navigation traversion of the history state.

1. Below example will subscribe to the targetted method will traverse 2 states backwards of the browser history state after end of targetted method

```
@RouteToStateAsync(-2)
public testMethod() {
...some logic...
 return of(...some async operations).pipe(
 ...rxjs operators...);
}
```

2. Below example will subscribe to the targetted method and use the returned value to traverse 2 states backwards of the browser history state after end of targetted method.

 ```
@RouteToStateAsync()
public testMethod(): Observable<string> {
   ...some logic...
   return of(1, 2, 3).pipe(
    switchMap(x => {
      return of(-2);
    })
  );
}
 ```
 
3. Below example will make the decorator subscribe to the **AopNavigator object** returned from the targetted method and use the **destinationPage** property value to perform
popstate navigation traversal of the browser history state.

 ```
 @RouteToStateAsync()
 public testMethod(): Observable<AopNavigator> {
   ...some logic...
   
    const obj: AopNavigator = {
     destinationPage: -2',
   };

   return of(1, 2, 3).pipe(
    switchMap(x => {
      return of(obj);
    })
  );
 }
 ```

### AopNavigator Interface capabilities
AopNavigator interface contains the following properties that can be used to enhance the decorator functionalities.
* **destinationPage** - This property can be passed a string or numeric value that can be used for the RouteNext, RouteNextAsync, RouteToState and RouteToStateAsync decorators to perform navigation.

* **navigationExtra** - This property takes an [Angular NavigationExtras object](https://angular.io/api/router/NavigationExtras) to allow extra options to modify the Router navigation strategy for RouteNext and RouteNextAsync decorator.

* **preprocess** - This property takes a reference function. This function will be executed prior to any navigations performed by the decorators.

* **param** - This property will take a value of any type that can be used as parameter(s) for the passed function in the preprocess property.
