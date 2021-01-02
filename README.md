# Aop-Routing
Provides the capability to perform [Imperative and Popstate navigation](https://medium.com/analytics-vidhya/angular-routing-imperative-vs-popstate-7d254b495c54) operations in Angular through the ease of typescript decorators, **without the need to import the Angular Router object**

# Installation
Aop-Routing runs on NodeJs and is available as an NPM package
```
npm install aop-routing
```

# Usage
1. Add **AopRoutingModule** to the top level/root module import array.
```
 imports: [
   ...
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
Aop-Routing has a lot of features pertaining to navigation in an Angular app.
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
  
1. Below example will popstate navigate back to previous page after the asynchronous operation inside the method is complete.
```
@RouteBackAsync()
public testMethod() {
 return of(...some async operations).pipe(
 ...rxjs operators...)
}
```


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
---
### AopNavigator Interface capabilities
AopNavigator interface contains the following properties that can be used to enhance the decorator functionalities.
* **destinationPage** - This property can be passed a string or numeric value that can be used for the RouteNext, RouteNextAsync, RouteToState and RouteToStateAsync decorators to perform navigation.

* **navigationExtra** - This property takes an [Angular NavigationExtras object](https://angular.io/api/router/NavigationExtras) to allow extra options to modify the Router navigation strategy for RouteNext and RouteNextAsync decorator.

* **preprocess** - This property takes a reference function. This function will be executed prior to any navigations performed by the decorators.

* **param** - This property will take a value of any type that can be used as parameter(s) for the passed function in the preprocess property.

---
### Custom user defined navigation logic
Custom logic can be passed to the AopRouting library to override the default navigation logic of the decorators.
1. Create a class that extends the **AopBaseNavigation** abstract class.
```
export class SampleClass extends AopBaseNavigation {}
```

2. Implement the required abstract methods of the **AopBaseNavigation** abstract class.
* goToNextPage()
* goToPreviousPage()
* goToState()

```
export class SampleClass extends AopBaseNavigation {
 public goToNextPage(...) {
  ...custom logic...
}

 public goToPreviousPage(...) {
  ...custom logic...
}

 public goToState(...) {
  ...custom logic...
}

```

3. In the top level/root module add the **AopProxyNavigationService** to the providers array and set the **useClass** to the newly created class
```
@NgModule({
  imports: [
    ...
    AopRoutingModule
  ],
  providers: [{provide: ProxyNavigationService, useClass: SampleClass}],
})
```
4. The above steps will override the default decorator navigation logic, which means the decorators will now use the custom methods of the newly created class **SampleClass**

---

### Experiemental Features
AopRouting can dynamically modify the routing table during runtime of an Angular application.
```diff
- Note the below features are experimental and should be used with caution
```
  
To enable the experimental features of the AopRouting library, pass an object with **experimentalNav** property set to true to the **AopRoutingModule** forRoot method to the top level/root module:
  
```
@NgModule({
  ...
  imports: [
    ...
    AopRoutingModule.forRoot({expirementNav: true})
  ],
  ...
})
```
  
The below Routing table will be used to demonstrate the features and examples:
```
const routes: Routes = [
  {path: 'page1', component: Page1Component},
  {path: 'page2', component: Page2Component }
];
```

#### Adding new Path to the Routing Table at runtime.
A new Path can be dynamically created and to the Routing table and also navigated to at runtime . Suppose we want to add **page3** that should route to **Page3Component**

1. Create a routeTransform object and set the **path** and **component* property:
```
 const routeTransform: RouteTransform = {
    path: 'page3',
    component: Page3Component
 };
```

2. In the RouteNext or RouteNextAsync deocrator of the targetted function, return an **AopNav** object with the routeTransform property set.
```
@RouteNext()
public testMethod() {
  const routeTransform: RouteTransform = {
    path: 'page3',
    component: Page3Component
 };
  return {routeTransform}
}
```

#### Changing component of a Path at runtime
A component that has been statically set to a path can be changed and navigated to at runtime. Suppose we want to change **page1** to route to **Page3Component** instead:

1. Create a routeTransform object and set the **path** and **component* property:
```
 const routeTransform: RouteTransform = {
    path: 'page1',
    component: Page3Component
 };
```

2. In the RouteNext or RouteNextAsync deocrator of the targetted function, return an **AopNav** object with the routeTransform property set:
```
@RouteNext()
public testMethod() {
  const routeTransform: RouteTransform = {
    path: 'page1',
    component: Page3Component
 };
  return {routeTransform}
}
```
#### Add CanActivate guard(s) at runtime
CanActivate guards can be added to a path at runtime. Suppose we want to add a guard **page1** path

1. Create a routeTransform object and set the **path1** and **canActivateGuards** property by providing the name(s) of CanActivate guard(s) to be added:
```
 const routeTransform: RouteTransform = {
    path: 'page1',
    canActivateGuards: [guard1, guard2]
 };
```

2. In the RouteNext or RouteNextAsync deocrator of the targetted function, return an **AopNav** object with the routeTransform property set:
```
@RouteNext()
public testMethod() {
  const routeTransform: RouteTransform = {
    path: 'page1',
    canActivateGuards: [guard1, guard2]
 };
  return {routeTransform}
}
```

#### Removing guard(s) from a path
To remove CanActivate guards from a path at runtime, it's the same steps as adding guards. If the guards provided exist in the routing table, they will be removed.

#### Removing all CanActivate guards associated to a path.
To remove all CanActivate guards associated to a path is the same steps as adding a guard. Instead the canActivateGuards property should be set to an empty array.
```  
@RouteNext()
public testMethod() {
  const routeTransform: RouteTransform = {
    path: 'page1',
    canActivateGuards: []
 };
  return {routeTransform}
}
```

```diff
- Changes made to the Routing table are not persistent. They are reverted back upon completion of navigation
```
