# MediCore API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### POST /auth/register
```json
{"name":"John","email":"john@example.com","password":"StrongPass@123","role":"pharmacist"}
```

### POST /auth/login
Returns an access token and sets an HTTP-only refresh cookie.

### POST /auth/refresh
Rotates/refreshes the access session.

### POST /auth/logout
Clears refresh session.

### POST /auth/forgot-password
Starts OTP flow. In development the OTP is logged to the backend console.

### POST /auth/verify-otp
Accepts email + OTP and returns a short-lived reset token.

### POST /auth/reset-password
Accepts resetToken + new password.

## Dashboard

`GET /dashboard/summary`

Returns KPI totals, 30-day revenue trend and top-selling medicines.

## Medicines

All medicine endpoints require `Authorization: Bearer <accessToken>`.

- `GET /medicines?q=paracetamol`
- `POST /medicines`
- `PUT /medicines/:id`
- `DELETE /medicines/:id`

## Customers

- `GET /customers`
- `POST /customers`

## Suppliers

- `GET /suppliers`
- `POST /suppliers`

## Sales

- `GET /sales`
- `POST /sales`

Example sale:
```json
{
  "items": [
    {
      "medicine": "MONGOOSE_ID",
      "name": "Paracetamol 500mg",
      "quantity": 2,
      "unitPrice": 25,
      "gstRate": 12
    }
  ],
  "discount": 5,
  "paymentMethod": "upi"
}
```

## Health

`GET /health`
