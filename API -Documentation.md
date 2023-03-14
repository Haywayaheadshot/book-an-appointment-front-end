# API Documentation
This API allows users to interact with doctors and make reservations. The API supports the following endpoints:

Base URL: /api

Authentication: Users must be authenticated to access the API by providing their username and password.

Error Responses: All endpoints may return a JSON response with success set to false and an errors key that contains a list of error messages.

### Authentication Endpoints
#### Log In
Endpoint: /api/login
Method: POST
Request Body: username, password
Response: { message: 'success' } on successful authentication
Possible Error Responses: { error: 'Wrong username or password' }
#### Example
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json

{
  "user": {
    "username": "johndoe",
    "password": "password123"
  }
}
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "success"
}


#### Sign Up
Endpoint: /api/signup
Method: POST
Request Body: name, email, password, username, photo
Response: { success: true, user_id: resource.id } on successful sign up
Possible Error Responses: { success: false, errors: resource.errors.full_messages }
#### Example: 
POST /api/signup HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json

{
  "user": {
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "password123",
    "photo": "/uploads/users/1/photo.jpg"
  }
}
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "user_id": 1
}



#### Doctors Endpoints
Get All Doctors
Endpoint: /api/doctors
Method: GET
Response: A list of doctors with their name, specialty, years_of_experience, bio, age, qualifications, location_of_work, and photo.
#### Example: 
GET /api/doctors HTTP/1.1
Host: example.com
Accept: application/json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "name": "Dr. John Doe",
    "specialty": "Cardiology",
    "years_of_experience": 10,
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "age": 40,
    "qualifications": "MD, PhD",
    "location_of_work": "New York City",
    "photo": "/uploads/doctors/1/photo.jpg"
  },
  {
    "name": "Dr. Jane Smith",
    "specialty": "Dermatology",
    "years_of_experience": 8,
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "age": 35,
    "qualifications": "MD",
    "location_of_work": "Los Angeles",
    "photo": "/uploads/doctors/2/photo.jpg"
  }
]



### Reservations Endpoints
#### Create Reservation
Endpoint: /api/reservations
Method: POST
Request Body: title, reservation_date, phone_number, purpose, location, doctor_name, user_id
Response: { success: true, reservation_id: @reservation.id } on successful reservation creation
Possible Error Responses: { success: false, errors: @reservation.errors.full_messages } or { success: false, errors: @doctors_reservation.errors.full_messages }
#### Example
POST /api/reservations HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json

{
  "title": "Appointment with Dr. John Doe",
  "reservation_date": "2023-03-20 09:00:00",
  "phone_number": "555-1234",
  "purpose": "Routine checkup",
  "location": "New York City",
  "doctor_name": "Dr. John Doe",
  "username": "johndoe"
}
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "reservation_id


#### Get All Reservations for User
Endpoint: /api/reservations
Method: GET
Request Parameter: username
Response: A list of reservations for the specified user

### Users Endpoints
#### Get User by ID
Endpoint: /api/users/:id
Method: GET
Response: User information for the specified user ID
