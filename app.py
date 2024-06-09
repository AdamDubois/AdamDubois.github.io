from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)
DATABASE = 'car_inventory.db'

# Initialize the database and create the table if it doesn't exist
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS cars
                      (id INTEGER PRIMARY KEY, status TEXT)''')
    car_ids = [0] + [87, 98, 99] + list(range(21, 42)) + list(range(42, 68)) + [21, 94] + list(range(68, 85))
    for car_id in car_ids:
        cursor.execute('INSERT OR IGNORE INTO cars (id, status) VALUES (?, ?)', (car_id, 'unknown'))
    conn.commit()
    conn.close()

def get_sorted_cars_by_class():
    classes = {
        "5.5HP": [0],
        "5.5HP_jr": [87, 98, 99],
        "6.5HP": list(range(21, 42)),
        "9HP": list(range(42, 68)),
        "9HP_adapt": [21, 94],
        "13HP": list(range(68, 85))
    }
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT id, status FROM cars')
    cars = cursor.fetchall()
    conn.close()

    sorted_cars = {
        "5.5HP": [], "5.5HP_active_count": 0,
        "5.5HP_jr": [], "5.5HP_jr_active_count": 0,
        "6.5HP": [], "6.5HP_active_count": 0,
        "9HP": [], "9HP_active_count": 0,
        "9HP_adapt": [], "9HP_adapt_active_count": 0,
        "13HP": [], "13HP_active_count": 0
    }
    for car_id, status in cars:
        for car_class, car_range in classes.items():
            if car_id in car_range:
                sorted_cars[car_class].append({"id": car_id, "status": status})
                if status == 'active':
                    sorted_cars[f"{car_class}_active_count"] += 1
                break

    for car_class in classes.keys():
        sorted_cars[car_class] = sorted(sorted_cars[car_class], key=lambda x: x["id"])

    return sorted_cars

@app.route('/')
def home():
    sorted_cars = get_sorted_cars_by_class()
    return render_template('index.html', sorted_cars=sorted_cars)

@app.route('/car_status', methods=['GET'])
def car_status():
    sorted_cars = get_sorted_cars_by_class()
    return jsonify(sorted_cars=sorted_cars)

@app.route('/update_status', methods=['POST'])
def update_status():
    data = request.json
    if 'car_id' not in data or 'status' not in data:
        return jsonify(error="Missing car_id or status"), 400

    car_id = data['car_id']
    status = data['status']
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('UPDATE cars SET status=? WHERE id=?', (status, car_id))
    conn.commit()
    conn.close()
    return jsonify(success=True)

@app.route('/status/<int:car_id>', methods=['GET'])
def get_status(car_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT status FROM cars WHERE id=?', (car_id,))
    car = cursor.fetchone()
    conn.close()
    if car:
        return jsonify(status=car[0])
    else:
        return jsonify(error="Car not found"), 404

@app.route('/status', methods=['GET'])
def get_all_statuses():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT id, status FROM cars')
    cars = cursor.fetchall()
    conn.close()
    return jsonify({car_id: status for car_id, status in cars})

@app.route('/working_cars', methods=['GET'])
def working_cars():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM cars WHERE status="active"')
    count = cursor.fetchone()[0]
    conn.close()
    return jsonify({"working_cars": count})

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)

