# Changelog

All notable changes to this project will be documented in this file.

## [2.0.2] - 2024-12-28

### Changed

- Enhanced GraphQL scalar and operation variable types
- Improved code readability and formatting
- Simplified variable type validation in helper functions

## [2.0.1] - 2024-12-28

### Fixed

- Updated README import statement to include Operation and OperationVariable
- Updated batch mutation example to use 'graphql' instead of 'gql'

## [2.0.0] - 2024-12-28

### Breaking Changes

- Renamed buildBatchOperation to buildBatchMutation
- Updated return type from BatchOperationResult to BatchMutationResult
- Changed 'gql' property to 'graphql' in BatchOperationResult type

### Changed

- Enhanced documentation and test cases
- Updated related documentation to use new function names

## [1.1.1] - 2024-12-28

### Changed

- Updated usage examples in README to utilize Operation and OperationVariable factory functions

## [1.1.0] - 2024-12-28

### Added

- Comprehensive JSDoc comments for factory functions
- GitHub Actions workflow for NPM publishing

### Changed

- Enhanced type definitions with factory functions
- Improved code organization and documentation

## [1.0.2] - 2024-12-28

### Changed

- Updated .prettierignore and tsconfig.json configurations
- Improved code formatting and organization

## [1.0.1] - 2024-12-28

### Added

- Prettier for code formatting
- Repository and homepage fields to package.json

## [1.0.0] - 2024-12-27

### Added

- Initial release
- Core functionality for building batch mutations
- Helper functions for variable definitions and mutation statements
- Comprehensive test suite
- TypeScript configuration and type definitions
