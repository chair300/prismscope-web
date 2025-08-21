# Prismscope Consultants Backend

Complete backend API for the Prismscope Consultant Network with payment processing, application management, and authentication.   We need you to link all your work our platform:  Linkedin, github, company website and we generate an AI and personal evaluation of your fit into our projects.   We really focus on helping you keep doing your best work while providing growth opertunities.

## 🚀 Features

### Core Functionality
- **Consultant Application Processing**: Complete application submission with file uploads
- **Stripe Payment Integration**: Secure credit card processing for $99 registration fee
- **OAuth Integration**: Support for LinkedIn, Google, Microsoft, and GitHub OAuth
- **File Upload Management**: Resume upload with cloud storage support
- **Email Notifications**: Automated emails for application status updates
- **Application Status Tracking**: Complete workflow from application to approval

### API Endpoints

#### Consultant Applications (`/api/consultants`)
- `POST /apply` - Submit consultant application with payment
- `GET /:id` - Get application details
- `GET /:id/status` - Get application status
- `PUT /:id` - Update application (before payment)
- `GET /` - List all applications (admin)
- `GET /stats` - Application statistics

#### Payment Processing (`/api/payments`)
- `POST /create-intent` - Create Stripe payment intent
- `POST /confirm` - Confirm payment
- `GET /:paymentIntentId` - Get payment status
- `POST /webhook` - Stripe webhook handler
- `POST /:paymentIntentId/refund` - Process refund
- `GET /dashboard` - Payment analytics

#### Authentication (`/api/auth`)
- `POST /login` - Consultant login
- `POST /set-password` - Set password for approved consultants
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `GET /verify-token` - Token verification

#### File Upload (`/api/upload`)
- `POST /resume` - Upload resume file
- `GET /resume/:filename` - Download resume
- `DELETE /resume/:filename` - Delete resume

## 🛠 Setup Instructions

### Prerequisites
- Node.js 18+
- Couchbase
- Stripe Account (for payment processing)
- SMTP Email Service (Gmail, SendGrid, etc.)

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required Configuration:**

```env
# Database
COUCHBASE_URL=
COUCHBASE_BUCKET=
COUCHBASE_USER=admin
COUCHBASE_PASSWORD=password

# JWT Security
JWT_SECRET=your_super_secure_jwt_secret_64_chars_minimum

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 2. Database Setup

**Docker container Couchbase:**
```bash

### 3. Stripe Setup

1. Create [Stripe Account](https://stripe.com)
2. Get API keys from Dashboard → Developers → API Keys
3. Set up webhook endpoint:
   - URL: `https://yourdomain.com/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Get webhook secret and add to `.env`

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Start Development Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:3001`

## 🔧 Database Schema

### Consultant Model
```javascript
{
  // Personal Information
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  phone: String
  location: String (required)
  
  // Professional Information
  company: String
  website: String
  linkedIn: String
  github: String
  yearsExperience: Enum ['1-3', '3-5', '5-10', '10+']
  expertise: [String] (required)
  industries: [String] (required)
  projectsCompleted: String
  certifications: String
  message: String
  
  // OAuth Data
  oauthProvider: Enum ['linkedin', 'google', 'microsoft', 'github']
  oauthId: String
  profilePicture: String
  
  // File Uploads
  resume: {
    filename: String
    originalName: String
    size: Number
    mimetype: String
    s3Url: String
  }

  
  // Status Tracking
  status: Enum ['pending_payment', 'payment_completed', 'under_review', 'approved', 'rejected']
  paymentStatus: Enum ['pending', 'completed', 'failed', 'refunded']
  paymentIntentId: String
  paymentAmount: Number (default: 9900)
  paymentDate: Date
  
  // Platform Configuration
  platformFeeRate: Number (15-40%, default: 25%)
  isActive: Boolean
  
  // Timestamps
  applicationDate: Date
  reviewDate: Date
  approvalDate: Date
}
```

### Payment Model
```javascript
{
  paymentIntentId: String (required, unique)
  consultantId: ObjectId (required)
  amount: Number (required)
  currency: String (default: 'usd')
  status: String (required)
  paymentMethod: Object
  fees: Object
  refunds: [Object]
  metadata: Object
  events: [Object] // Webhook events
}
```

## 💳 Payment Processing Flow

### Registration Payment Flow
1. **Application Submission**: User submits consultant application
2. **Payment Intent Creation**: Stripe PaymentIntent created for $99
3. **Frontend Payment**: User completes payment with credit card
4. **Webhook Processing**: Stripe webhook confirms payment
5. **Status Update**: Application status updated to "under_review"
6. **Email Confirmation**: Confirmation email sent to consultant

### Payment States
- `pending` - Payment not started
- `requires_payment_method` - Need credit card
- `requires_confirmation` - Need user confirmation
- `processing` - Payment being processed
- `succeeded` - Payment completed successfully
- `failed` - Payment failed

## 🔐 Security Features

- **Rate Limiting**: 100 requests per 15-minute window
- **Input Validation**: Express-validator for all endpoints
- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers enabled
- **File Upload Limits**: 10MB max file size
- **Webhook Signature Verification**: Stripe webhook security

## 📧 Email Integration

### Supported Providers
- **Gmail SMTP**: Configure with app password
- **SendGrid**: API-based email service
- **Custom SMTP**: Any SMTP server

### Email Templates
- **Application Confirmation**: Sent after application submission
- **Payment Confirmation**: Sent after successful payment
- **Application Status Updates**: Approval/rejection notifications
- **Password Reset**: Secure password reset links

## 🚀 Production Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t prismscope-consultants-backend .

# Run container
docker run -d \
  --name prismscope-backend \
  -p 3001:3001 \
  --env-file .env \
  prismscope-consultants-backend
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/prismscope_consultants
JWT_SECRET=super_secure_64_char_secret_for_production
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
FRONTEND_URL=https://yourdomain.com
```

### Health Checks
- **Endpoint**: `GET /health`
- **Response**: Server status, database connection, service health

## 📊 Monitoring & Logging

### Winston Logging
- **Development**: Console with colors
- **Production**: JSON format with file rotation
- **Log Levels**: error, warn, info, debug

### Error Handling
- **Global Error Handler**: Catches all unhandled errors
- **Validation Errors**: User-friendly error messages
- **Database Errors**: Proper error mapping
- **Payment Errors**: Stripe-specific error handling

## 🔧 Testing

### API Testing with curl

**Submit Application:**
```bash
curl -X POST http://localhost:3001/api/consultants/apply \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "location": "New York, USA",
    "yearsExperience": "5-10",
    "expertise": ["Machine Learning/AI"],
    "industries": ["Technology"]
  }'
```

**Check Application Status:**
```bash
curl http://localhost:3001/api/consultants/{id}/status
```

**Create Payment Intent:**
```bash
curl -X POST http://localhost:3001/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{"consultantId": "consultant_id_here"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📞 Support

For technical issues or questions:
- **Email**: support@provoco.ai
- **Documentation**: See API docs at `/api/docs` (when implemented)
- **Issues**: Create GitHub issue with reproduction steps

## 📋 TODO / Roadmap

- [ ] API Documentation with Swagger/OpenAPI
- [ ] Unit and Integration Tests
- [ ] S3 File Storage Integration
- [ ] Admin Dashboard API
- [ ] Consultant Performance Metrics
- [ ] Project Assignment System
- [ ] Real-time Notifications
- [ ] API Rate Limiting by User
- [ ] Database Backup Strategy
- [ ] Monitoring Dashboard
