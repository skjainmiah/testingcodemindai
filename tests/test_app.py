import pytest
import json
from app import app

class TestApp:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client
    
    def test_index_route(self, client):
        response = client.get('/')
        assert response.status_code == 200
        assert b'BMI Calculator' in response.data
    
    def test_health_check(self, client):
        response = client.get('/health')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'healthy'
    
    def test_calculate_bmi_valid(self, client):
        # Test valid BMI calculation
        response = client.post('/calculate',
            json={
                'height': 180,
                'weight': 80,
                'gender': 'male',
                'unit_system': 'metric'
            }
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'bmi' in data
        assert 'category' in data
        assert 'ideal_weight_range' in data
        assert 'recommendations' in data
    
    def test_calculate_bmi_invalid_values(self, client):
        # Test with negative values
        response = client.post('/calculate',
            json={
                'height': -180,
                'weight': 80,
                'gender': 'male',
                'unit_system': 'metric'
            }
        )
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
    
    def test_calculate_bmi_invalid_gender(self, client):
        # Test with invalid gender
        response = client.post('/calculate',
            json={
                'height': 180,
                'weight': 80,
                'gender': 'invalid',
                'unit_system': 'metric'
            }
        )
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
    
    def test_calculate_bmi_missing_data(self, client):
        # Test with missing data
        response = client.post('/calculate',
            json={
                'height': 180,
                'gender': 'male'
            }
        )
        assert response.status_code == 400