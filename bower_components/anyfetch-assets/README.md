anyfetch-assets
================

## Introduction

Anyfetch Assets let you style default AnyFetch snippet & full templates, and provides other useful resources such as images for different providers.

The styles tries to remain unobstrusive and respectful of your current layout. Those styles will only apply on template elements (within the namespace `anyfetch-`). They are also made of relative measures (`em`) and font agnostic.

This repository is embedded in every AnyFetch applications. Forking it will let you define custom styles for your document-types, or add an icon for your provider that will be used on all AnyFetch applications.

## Usage

Just run in your terminal:

```shell
bower install --save anyfetch-assets
```

and in your HTML:

```html
<link rel="stylesheet" type="text/css" src="bower_components/anyfetch-assets/dist/index.min.css" />
<script type="text/javascript" src="bower_components/anyfetch-assets/dist/index-moment.min.js"></script>
<script type="text/javascript" charset="utf-8">
anyfetchAssets.formatDates();
</script>
```

## Build

If you want to build this repository:

```
npm install
gulp
```

## Contributing
See [Contributing](CONTRIBUTING.md) for details.
