# NUCLEUS Angular Demo App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## What Have We Changed?

- Added the [NUCLEUS](https://github.com/NextCenturyCorporation/nucleus) and [`@webcomponents/custom-elements`](https://github.com/webcomponents/custom-elements) to the `dependencies` in the [`package.json`](./package.json#L23-L24) file
- Added `@webcomponents/custom-elements` imports to [`src/polyfills.ts`](./src/polyfills.ts#L65-L71)
- Added the CUSTOM_ELEMENTS_SCHEMA and NUCLEUS Angular modules to [`src/app/app.module.ts`](./src/app/app.module.ts)
- Added an example visualization component based on the [stub component](https://github.com/NextCenturyCorporation/nucleus/tree/master/wrappers/angular/stub)
  - [`src/app/example.component.html`](./src/app/example.component.html)
  - [`src/app/example.component.scss`](./src/app/example.component.scss)
  - [`src/app/example.component.ts`](./src/app/example.component.ts)
  - [`src/app/example.module.ts`](./src/app/example.module.ts)
- Added NUCLEUS components and the Example Component to [`src/app/app.component.html`](./src/app/app.component.html)
- Added NUCLEUS initialization and examples of custom data transformations to [`src/app/app.component.ts`](./src/app/app.component.ts)
- Added custom styles to [`src/app/app.component.scss`](./src/app/app.component.scss)
- Updated this README file

## What Else Do I Need to Run the Demo App?

- Run a local NUCLEUS [Data Server](../../README.md#the-data-server) at [http://localhost:8090](http://localhost:8090)
- Ingest the NUCLEUS [demo data](../data) into a local Elasticsearch instance at [http://localhost:9200](http://localhost:9200)

You can change either of these hostnames or ports in [`src/app/app.component.ts`](./src/app/app.component.ts)

## Angular-CLI Info

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
