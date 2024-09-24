from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import psycopg2
from psycopg2.extras import Json
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Mail configuration from environment variables
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # From .env
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # From .env
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Database configuration from environment variables
DB_CONFIG = {
    'dbname': os.getenv('DB_NAME'),  # From .env
    'user': os.getenv('DB_USER'),  # From .env
    'password': os.getenv('DB_PASSWORD'),  # From .env
    'host': os.getenv('DB_HOST'),  # From .env
}

# Track whether the table has been created
table_created = False

# Establish a new connection per request
def get_db_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.DatabaseError as e:
        print(f"Database connection error: {e}")
        return None

# API route for sending the contact form email
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json

    name = data.get('name')
    email = data.get('email')
    message_body = data.get('message')

    if not name or not email or not message_body:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = Message(f'New Contact Form Submission from {name}',
                      sender=email,
                      recipients=[os.getenv('MAIL_RECIPIENT')])  # From .env
        msg.body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_body}"

        mail.send(msg)
        return jsonify({"message": "Message sent successfully!"}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send message"}), 500

# API route for order creation
@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.json

    # Log the received data for debugging
    print("Received order data:", data)

    items = data.get('items')
    customer_details = data.get('customerDetails')

    if not items:
        print("Error: Missing items in the order")
        return jsonify({"error": "Missing items in the order"}), 400
    if not customer_details:
        print("Error: Missing customerDetails in the order")
        return jsonify({"error": "Missing customer details"}), 400

    # Extract customer details
    full_name = customer_details.get('fullName')
    dorm_room = customer_details.get('dormRoom')
    date = customer_details.get('date')
    time = customer_details.get('time')
    phone_number = customer_details.get('phoneNumber')

    if not full_name or not dorm_room or not date or not time or not phone_number:
        print("Error: Incomplete customer details")
        return jsonify({"error": "Incomplete customer details"}), 400

    # Establish a new connection for each request
    conn = get_db_connection()
    if not conn:
        print("Error: Could not connect to the database")
        return jsonify({"error": "Database connection error"}), 500

    try:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO orders (full_name, dorm_room, date, time, phone_number, items)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (
            full_name,
            dorm_room,
            date,
            time,
            phone_number,
            Json(items)
        ))
        conn.commit()
        print("Order successfully saved to the database")
        return jsonify({"message": "Order received!"}), 201
    except Exception as e:
        print(f"Error saving order to database: {e}")
        return jsonify({"error": "Failed to save order"}), 500
    finally:
        cursor.close()
        conn.close()

# Create Orders table (check before processing the first request)
@app.before_request
def create_tables_once():
    global table_created
    if not table_created:
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS orders (
                    id SERIAL PRIMARY KEY,
                    full_name VARCHAR(100),
                    dorm_room VARCHAR(100),
                    date VARCHAR(20),
                    time VARCHAR(20),
                    phone_number VARCHAR(20),
                    items JSONB,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            ''')
            conn.commit()
            cursor.close()
            conn.close()
            table_created = True  # Mark the table as created

if __name__ == '__main__':
    app.run(debug=True)
