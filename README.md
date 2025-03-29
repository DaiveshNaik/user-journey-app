
# User Management Application

A React application that integrates with the Reqres API to perform basic user management functions including authentication, listing users, and editing/deleting user records.

## Live Demo

Access the live application at: https://lovable.dev/projects/e60fa3de-6d4d-491a-b86e-804c0111e1ac

## Features

### Authentication
- Login screen with email/password authentication
- Token-based authentication with session persistence
- Protected routes that require authentication

### User Management
- Paginated list of users with avatar display
- View detailed user information
- Edit user details (first name, last name, email)
- Delete users with confirmation dialog
- Success/error notifications for all operations

### UI/UX
- Responsive design that works on mobile and desktop
- Clean, modern interface using Tailwind CSS and Shadcn UI
- Smooth transitions and loading states

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: For type safety
- **React Router**: Navigation between pages
- **Tailwind CSS**: Styling
- **Shadcn UI**: Component library
- **React Query**: Data fetching and caching
- **Reqres API**: Backend API service

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd user-management-app
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## API Integration

This application uses the [Reqres API](https://reqres.in/) for demonstration purposes. The following endpoints are used:

- `POST /api/login`: User authentication
- `GET /api/users?page=<page_number>`: Fetch paginated user list
- `GET /api/users/<user_id>`: Fetch specific user details
- `PUT /api/users/<user_id>`: Update user information
- `DELETE /api/users/<user_id>`: Delete a user

## Test Credentials

To log in to the application, use the following credentials:
- **Email**: eve.holt@reqres.in
- **Password**: cityslicka

## Assumptions and Considerations

1. **Mock API Limitations**: 
   - The Reqres API is a mock API, so changes aren't actually persisted on the server.
   - When a user is "deleted" or "updated", the changes appear to work in the UI but won't persist if you refresh or revisit the page.

2. **Authentication**:
   - The auth token is stored in localStorage for persistence between sessions.
   - There is no token expiration handling as the Reqres API doesn't provide token expiration.

3. **Error Handling**:
   - The application handles common API errors and displays user-friendly messages.
   - Network errors and API timeouts are handled gracefully.

4. **Performance Considerations**:
   - React Query is used for efficient data fetching, caching, and state management.
   - List pagination is implemented to improve performance with large datasets.

5. **Accessibility**:
   - Basic accessibility features are implemented, including proper semantic HTML and ARIA attributes.

## Future Enhancements

- Add user creation functionality
- Implement advanced filtering and sorting
- Add dark mode support
- Enhance form validation
- Implement unit and integration tests

## License

This project is open source and available under the [MIT License](LICENSE).
