# Namecheap API Integration

This API provides endpoints for interacting with the Namecheap API, specifically for domain registration.

## Endpoints

### Check Domain Availability

Checks if one or more domains are available for registration.

**URL**: `/api/namecheap/check`

**Method**: `POST`

**Request Body**:

```json
{
  "domains": ["example.com", "example.org"]
}
```

**Success Response**:

```json
{
  "success": true,
  "data": [
    {
      "$": {
        "Domain": "example.com",
        "Available": "false",
        "ErrorNo": "0",
        "Description": "Domain name is not available",
        "IsPremiumName": "false",
        "PremiumRegistrationPrice": "0",
        "PremiumRenewalPrice": "0",
        "PremiumRestorePrice": "0",
        "PremiumTransferPrice": "0",
        "IcannFee": "0.18",
        "EapFee": "0"
      }
    },
    {
      "$": {
        "Domain": "example.org",
        "Available": "true",
        "ErrorNo": "0",
        "Description": "Domain name is available",
        "IsPremiumName": "false",
        "PremiumRegistrationPrice": "0",
        "PremiumRenewalPrice": "0",
        "PremiumRestorePrice": "0",
        "PremiumTransferPrice": "0",
        "IcannFee": "0.18",
        "EapFee": "0"
      }
    }
  ]
}
```

**Error Response**:

```json
{
  "success": false,
  "message": "Please provide an array of domain names to check"
}
```

### Register Domain

Registers a new domain.

**URL**: `/api/namecheap/register`

**Method**: `POST`

**Request Body**:

```json
{
  "domain": "example.com",
  "years": 1,
  "registrantInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "city": "New York",
    "stateProvince": "NY",
    "postalCode": "10001",
    "country": "US",
    "phone": "+1.2125551234",
    "emailAddress": "john.doe@example.com",
    "organizationName": "Example Inc",
    "jobTitle": "CEO"
  },
  "techInfo": {
    "firstName": "Jane",
    "lastName": "Smith",
    "address1": "456 Tech Ave",
    "city": "San Francisco",
    "stateProvince": "CA",
    "postalCode": "94107",
    "country": "US",
    "phone": "+1.4155551234",
    "emailAddress": "jane.smith@example.com"
  },
  "nameservers": [
    "ns1.example.com",
    "ns2.example.com"
  ],
  "addFreeWhoisguard": true,
  "enableWhoisguard": true
}
```

**Notes**:
- If `techInfo`, `adminInfo`, or `auxInfo` are not provided, the `registrantInfo` will be used for those contacts.
- `nameservers` is optional. If not provided, Namecheap's default nameservers will be used.
- `addFreeWhoisguard` and `enableWhoisguard` are optional and default to `true`.

**Success Response**:

```json
{
  "success": true,
  "data": {
    "$": {
      "Domain": "example.com",
      "Registered": "true",
      "ChargedAmount": "10.88",
      "DomainID": "12345",
      "OrderID": "67890",
      "TransactionID": "54321",
      "WhoisguardEnable": "true",
      "NonRealTimeDomain": "false"
    }
  }
}
```

**Error Response**:

```json
{
  "success": false,
  "message": "Domain is not available for registration"
}
```

## Required Fields for Registration

The following fields are required for the `registrantInfo`:

- `firstName`
- `lastName`
- `address1`
- `city`
- `stateProvince`
- `postalCode`
- `country`
- `phone`
- `emailAddress`

## Phone Number Format

Phone numbers should be in the format: `+CountryCode.PhoneNumber`

Example: `+1.2125551234`