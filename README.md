# Aop-Routing
Provides the capability to perform navigation operations in Angular through the use of typescript decorators, without the need to import the Angular Router object

# Installation
Aop-Routing runs on NodeJs and is available as an NPM package
```
npm install aop-routing
```

# Usage
Aop-Routing has a lot of features pertaining to angular routing
1. Add AopRoutingModule to the top level/root module import array.
```
 imports: [
   ...,
    AopRoutingModule
  ]
```
2. Inject Aop-Routig NavigationService into your top level/root module constructor.
```
export class AppModule {
  constructor(private navigationService: NavigationService) {}
 }
```
## Features
### Decorator Navigation
#### RouteNext
The RouteNext decorator can be passed an optional string, and it will perform an imperative routing to the next page at the end of the targetted function.
The below example will automatically route to page1 at the end of the testMethod execution.
```
@RouteNext('page1')
public testMethod(): void {
// some logic
}
```
Should the need be required to pass a dynamic value to RouteNext, this can be done by allowing the targetted function to return a string or an AopNavigator Object.

1. Below example will use the returned string value of the testMethod to route to the page
```
@RouteNext()
public testMethod(): string {
// some logic
return 'page1'
}
```

2. Below example will use the returned AopNavigator object of the test method to perform routing.
```
@RouteNext()
public testMethod(): string {
// some logic
  const obj: AopNavigator = {
     destinationPage: 'Test2',
   };
return obj;
}
```

