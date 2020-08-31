# Change Log

All notable changes to this project will be documented in this file.

## 1.0.23

### Changed

- Updated packages to new versions.

  - Bump @babel/runtime from ^7.10.4 to ^7.11.2
  - Bump i18next from ^19.5.6 to ^19.6.3
  - Bump joi from ^17.1.1 to^17.2.0
  - Bump url-polyfill from ^1.1.9 to ^1.1.10
  - Bump whatwg-fetch from ^3.2.0 → to ^3.4.0
  - Bump @babel/core from ^7.10.4 → ^7.11.1 to ^7.11.0
  - Bump @babel/plugin-transform-runtime from ^7.10.4 to ^7.11.0
  - Bump @babel/plugin-transform-typescript from ^7.10.4 to ^7.11.0
  - Bump @babel/preset-env from ^7.10.4 to ^26.0.9
  - Bump @types/jest from ^26.0.7 to ^26.3.0
  - Bump babel-jest from ^26.1.0 to ^26.3.0
  - Bump jest from ^26.1.0 to ^26.3.0
  - Bump jest-each from ^26.1.0 to ^26.3.0
  - Bump jest-get-type from ^26.0.0 to ^0.10.0
  - Bump mini-css-extract-plugin from ^0.9.0 to
  - Bump sass-loader from ^9.0.2 to ^9.0.3
  - Bump snyk from ^1.366.2 to ^1.373.1
  - Bump ts-jest from ^26.1.1 to ^26.2.0
  - Bump ts-loader from ^8.0.0 to ^8.0.2
  - Bump tslint from ^6.1.2 to ^6.1.3
  - Bump typescript from ^3.9.6 to ^3.9.7
  - Bump webpack from ^4.44.0 to ^4.44.1
  - Bump webpack-merge from ^5.0.9 to ^5.1.1

## 1.0.22

### Changed

- Updated packages to new versions.

  - Bump snyk from 1.362.1 to 1.366.2
  - Bump i18next from 19.6.2 to 19.6.3
  - Bump @types/jest from 26.0.4 to 26.0.7
  - Bump url-polyfill from 1.1.9 to 1.1.10
  - Bump webpack from 4.43.0 to 4.44.0

- Fix prototype pollution vulnerability in i18next package.

## 1.0.21

### Changed

- Updated packages to new versions.

## 1.0.20

### Changed

- Updated packages to new versions.

### Changed

- Get rid of preinstall script because of npm-force-resolutions [issue](https://github.com/rogeriochaves/npm-force-resolutions/issues/10).

## 1.0.19

### Fixed

- http-proxy package vulnerability fix (dependency of webpack-dev-server).

## 1.0.18

### Fixed

- Recompiled before deploy

## 1.0.17

### Changed

- Update packages to new versions:
  - babel-jest - 26.0.1
  - i18next-cov - 10.0.2
  - jest-each - 26.0.1
  - jest-get-type - 26.0.0
  - stylelint-webpack-plugin - 2.0.0
  - webpack-dev-server - 3.11.0
  - @securetrading/ts-iin-lookup - 0.0.8
  - @securetrading/ts-luhn-check - 0.0.8

## 1.0.16

### Fixed

- Update packages to new versions.
- minimist package vulnerability fix.

## 1.0.15

### Fixed

- Update packages to new versions.

## 1.0.14

### Fixed

- Vulnerabilities fixed (Prototype Pollution in cpy-cli)

## 1.0.13

### Fixed

- Vulnerabilities fixed (Prototype Pollution in minimist)
  - Removed the unused package resolve-url-loader@3.1.1 completely

## 1.0.12

### Fixed

- Vulnerabilities fixed (Prototype Pollution in minimist)
  - Introduced through: copy-files-from-to@2.3.0 and resolve-url-loader@3.1.1

## 1.0.11

### Fixed

- Wrong proportions for animated card (Mobile devices).
- Changes in Docker configuration.
- Updated bunch of packages.

## 1.0.10

### Fixed

- Wrong proportions for animated card (Mobile devices).

## 1.0.9

### Fixed

- Styling issue on Safari browser.

## 1.0.8

### Fixed

- Animated card styling issues.
- Delete Typedoc.
- binLookup methods moved to remote service.

## 1.0.7

### Fixed

- Updated dependencies and fixed vulnerabilities (eg. Prototype Pollution in Handlebars - [CVE-2019-19919](https://github.com/advisories/GHSA-w457-6q6x-cgp9)).

## 1.0.6

### Fixed

- Resolved serialize-javascript dependency: regular expressions Cross-Site Scripting (XSS) vulnerability.
- Updated bunch of packages.

## 1.0.5

### Fixed

- Flipping card malfunction.
- CVV input value clear after indicating PremierInn card number.
- Flipping card when PremierInn card is indicated.
- Styling issue - change of min-width on mobile devices.

## 1.0.4

### Added

- Communication with js-payments library - receiving formatted values, flipping card if CVV has been indicated etc.
- npm copy script for providing automated way of exporting bundle files.

### Fixed

- Bundled files added to .prettierignore.

## 1.0.3

### Added

- Hiding CVV field when card is recognized as Premier Inn.

### Changed

- Automated tests for animated card.

### Fixed

- Formatting issues.

## 1.0.1-rc.1

## Changed

- Location of bundled files (stcardstyle.css, stcard.js).
- Library target from var to umd.
- Changed .png logos to base64 images.

### Fixed

- Formatting and Validation classes (couple of bugs found).

## 1.0.0-rc.1

### Added

- Animated payment card with example index.html page.
