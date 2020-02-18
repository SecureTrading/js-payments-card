# Change Log

All notable changes to this project will be documented in this file.

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
