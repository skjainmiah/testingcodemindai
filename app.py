import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from utils.bmi_calculator import BMICalculator

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_bmi():
    """Calculate BMI and return weight status."""
    try:
        data = request.get_json()
        
        # Validate input
        height = float(data.get('height'))
        weight = float(data.get('weight'))
        gender = data.get('gender', '').lower()
        unit_system = data.get('unit_system', 'metric')
        
        if height <= 0 or weight <= 0:
            return jsonify({'error': 'Height and weight must be positive numbers'}), 400
        
        if gender not in ['male', 'female']:
            return jsonify({'error': 'Gender must be either male or female'}), 400
        
        # Calculate BMI
        calculator = BMICalculator()
        bmi = calculator.calculate_bmi(height, weight, unit_system)
        category = calculator.get_bmi_category(bmi, gender)
        ideal_weight_range = calculator.get_ideal_weight_range(height, gender, unit_system)
        recommendations = calculator.get_recommendations(bmi, gender)
        
        return jsonify({
            'bmi': round(bmi, 2),
            'category': category,
            'ideal_weight_range': ideal_weight_range,
            'recommendations': recommendations
        })
        
    except ValueError as e:
        return jsonify({'error': 'Invalid input values'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)