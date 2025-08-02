# Whisper Link - Chat Application Frontend

A modern, real-time chat application built with React, Apollo Client, and GraphQL. This frontend application provides a seamless messaging experience with features like friend management, real-time messaging, and notifications.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.1.0-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.6-blue.svg)

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using GraphQL subscriptions
- **Friend Management**: Add friends, send/receive friend requests
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first approach with excellent tablet and desktop support
- **Modern UI**: Clean and intuitive interface built with TailwindCSS
- **Real-time Notifications**: Live updates for messages and friend requests
- **Avatar System**: User profile pictures and avatars
- **Chat History**: Persistent message storage and retrieval

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite 6.1.0
- **Styling**: TailwindCSS 4.0.6
- **GraphQL Client**: Apollo Client 3.13.0
- **Routing**: React Router DOM 7.1.5
- **Icons**: Heroicons & Lucide React
- **WebSocket**: GraphQL-WS for real-time subscriptions
- **Development**: ESLint for code quality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/preqsy/chat-app-frontend.git
cd chat-app-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

The application connects to a GraphQL server. The server URL is configured in `src/apollo-client.js`:

```javascript
const baseURL = "https://chat-app-server-production-a175.up.railway.app/query"
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── AddFriends.jsx     # Friend addition interface
│   ├── Chat.jsx           # Main chat interface
│   ├── ChatHeader.jsx     # Chat header with user info
│   ├── ChatInput.jsx      # Message input component
│   ├── FriendRequest.jsx  # Friend request management
│   ├── Friends.jsx        # Friends list
│   ├── MessageBubble.jsx  # Individual message display
│   ├── RecentChats.jsx    # Recent conversations
│   ├── SideBar.jsx        # Navigation sidebar
│   └── ...               # Other UI components
├── hooks/              # Custom React hooks
│   ├── useAuth.js         # Authentication logic
│   ├── useChat.js         # Chat functionality
│   └── useDashboard.js    # Dashboard state management
├── pages/              # Main application pages
│   ├── Dashboard.jsx      # Main chat dashboard
│   ├── Login.jsx          # User login
│   ├── Register.jsx       # User registration
│   └── Notification.jsx   # Notifications page
├── assets/             # Static assets (images, icons)
├── apollo-client.js    # GraphQL client configuration
├── router.jsx          # Application routing
├── utils.js            # Utility functions
└── main.jsx           # Application entry point
```

## 🔧 Configuration

### Apollo Client Setup

The application uses Apollo Client for GraphQL operations with the following features:
- HTTP Link for queries and mutations
- WebSocket Link for real-time subscriptions
- Authentication headers
- Automatic token management
- Connection status monitoring

### Routing

Protected routes are implemented with authentication checks:
- `/login` - User login
- `/register` - User registration  
- `/` - Main dashboard (protected)

## 🐳 Docker Deployment

The application includes Docker support for easy deployment:

```bash
# Build the Docker image
docker build -t chat-app-frontend .

# Run the container
docker run -p 80:80 chat-app-frontend
```

The Docker setup uses:
- Multi-stage build for optimized image size
- Nginx for serving static files
- Custom nginx configuration for SPA routing

## 📱 Mobile Responsiveness

The application features a mobile-first design with:
- Responsive layouts for all screen sizes
- Touch-friendly interface elements
- Mobile navigation patterns
- Optimized performance on mobile devices

See `MOBILE_IMPROVEMENTS.md` for detailed information about mobile enhancements.

## 🔑 Key Features

### Authentication
- JWT-based authentication
- Persistent login sessions
- Secure token storage

### Real-time Messaging
- WebSocket connections for instant messaging
- Message delivery confirmations
- Typing indicators
- Online status

### Friend System
- Send and receive friend requests
- Accept/decline friend requests
- Friends list management
- User search functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

This project uses ESLint for code quality. Make sure to run `npm run lint` before committing changes.

## 🔗 Related Projects

- [Chat App Backend](https://github.com/preqsy/chat-app-server) - GraphQL server for this application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Apollo GraphQL for excellent tooling
- TailwindCSS for utility-first styling
- Vite for fast development experience

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

Made with ❤️ by [preqsy](https://github.com/preqsy)
