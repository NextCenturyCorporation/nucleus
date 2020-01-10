# NUCLEUS Vue Demo App

This project was generated with [Vue CLI](https://cli.vuejs.org/) version 4.1.2.

## What Have We Changed?

- Added the [NUCLEUS](https://github.com/NextCenturyCorporation/nucleus) and [`@webcomponents/webcomponentsjs`](https://github.com/webcomponents/webcomponentsjs) to the `dependencies` and `devDependencies` in the [`package.json`](./package.json#L12) file
- Added `@webcomponents/webcomponents` imports to [`public/index.html`](./public/index.html#L10-L16)
- Added an example visualization Vue component:  [`src/components/ExampleComponent.vue`](./src/components/ExampleComponent.vue)
- Added NUCLEUS components and the Example Component to the HTML part of [`src/App.vue`](./src/App.vue)
- Added NUCLEUS initialization and examples of custom data transformations to the scripts part of [`src/App.vue`](./src/App.vue)
- Added custom styles to the styles part of [`src/App.vue`](./src/App.vue)
- Updated this README file

## What Else Do I Need to Run the Demo App?

- Run a local NUCLEUS [Data Server](../../README.md#the-data-server) at [http://localhost:8090](http://localhost:8090)
- Ingest the NUCLEUS [demo data](../data) into a local Elasticsearch instance at [http://localhost:9200](http://localhost:9200)

You can change either of these hostnames or ports in [`src/App.vue`](./src/App.vue)

## Vue-CLI Info

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
