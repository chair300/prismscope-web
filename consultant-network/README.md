# Consultant Network

A standalone application for managing consultants, projects, and payments. This application has been separated from the main Prismscope platform to allow focused development and deployment.

## Project Structure

```
consultant-network/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── assets/          # Images and static assets
│   ├── public/              # Public assets
│   └── package.json
├── backend/                  # Express.js backend API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── services/            # Business logic services
│   ├── middleware/          # Express middleware
│   ├── utils/               # Utility functions
│   └── package.json
└── docker-compose.yml        # Docker orchestration
```

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Integration

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (or use Docker)
- npm or yarn

### Development Setup

1. **Clone and navigate to the consultant network directory:**
```bash
cd consultant-network
```

2. **Set up the backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

3. **Set up the frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the applications:**
- Frontend: http://localhost:3002
- Backend API: http://localhost:3003
- Health Check: http://localhost:3003/health

### Using Docker

1. **Start all services:**
```bash
docker-compose up -d
```

2. **Stop all services:**
```bash
docker-compose down
```

3. **View logs:**
```bash
docker-compose logs -f
```

## Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=3003
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/consultant_network

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Stripe Configuration
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3002
```

## API Endpoints

### Consultants
- `GET /api/consultants` - Get all consultants
- `GET /api/consultants/:id` - Get consultant by ID
- `POST /api/consultants` - Create consultant profile
- `PUT /api/consultants/:id` - Update consultant profile
- `DELETE /api/consultants/:id` - Delete consultant profile
- `POST /api/consultants/:id/documents` - Upload documents
- `GET /api/consultants/:id/reviews` - Get consultant reviews
- `POST /api/consultants/:id/reviews` - Submit review

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/:id` - Get payment details

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/assign` - Assign consultant

## Features

- **Consultant Management**: Browse, search, and filter consultants
- **Profile Creation**: Consultants can create detailed profiles
- **Project Management**: Create and manage consulting projects
- **Payment Processing**: Integrated Stripe payment system
- **Review System**: Client reviews and ratings
- **Document Upload**: Support for consultant credentials
- **Responsive Design**: Mobile-friendly interface

## Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run start        # Start production server
npm run dev          # Start development server with nodemon
npm run test         # Run tests
```

## Docker Commands

```bash
# Build and start containers
docker-compose up --build

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild specific service
docker-compose up --build [service-name]
```

## Production Deployment

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Set production environment variables**

3. **Using Docker:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

4. **Using PM2:**
```bash
cd backend
pm2 start server.js --name consultant-network-api
```

## Database Schema

### Consultant
- name
- email
- specialties
- experience
- hourlyRate
- availability
- portfolio
- certifications
- reviews

### Project
- title
- description
- client
- consultant
- status
- budget
- timeline
- deliverables

### Payment
- amount
- status
- projectId
- consultantId
- clientId
- stripePaymentId

## Security Considerations

- JWT tokens for authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- Helmet.js for security headers
- CORS configuration
- Environment variable protection

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private - All rights reserved

## Support

For issues or questions, contact: harrison@provoco.ai