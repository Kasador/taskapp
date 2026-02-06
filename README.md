# TaskApp

TaskApp is a cross-platform personal productivity application built with Expo and TypeScript. The app demonstrates core concepts of mobile and web development including local data persistence, secure settings storage, responsive styling, and structured navigation.

## Project Overview

TaskApp allows users to create, manage, and track tasks across mobile and web platforms. The application uses SQLite for task storage and SecureStore for user preferences.

Key development goals included:

- Cross-platform development using Expo
- Local data persistence with SQLite
- Secure storage using Expo SecureStore
- Modern styling with NativeWind
- Navigation with Expo Router
- Structured debugging and testing across platforms

## Technology Stack

- **Framework:** Expo
- **Language:** TypeScript
- **Styling:** NativeWind
- **Database:** Expo SQLite
- **Secure Storage:** Expo SecureStore
- **Navigation:** Expo Router

## Core Features

### Task Management

- Create tasks with:
  - Title
  - Description
  - Priority (High, Medium, Low)
- Mark tasks complete or incomplete
- Delete tasks with confirmation
- Priority-based color coding
- Dynamic task list updates

### Data Persistence

- SQLite database for task storage
- SecureStore for user preferences (theme and user name)
- Basic error handling for database operations

### Cross-Platform Support

- Fully functional on mobile (iOS) and web
- Responsive layout for various screen sizes
- Platform-aware styling adjustments
- Identical core functionality across platforms

### User Experience

- Settings screen for:
  - User name
  - Theme preference
- Task statistics:
  - Total tasks
  - Completed tasks
- Search and filter by completion status
