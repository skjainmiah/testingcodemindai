import pytest
from utils.bmi_calculator import BMICalculator

class TestBMICalculator:
    def setup_method(self):
        self.calculator = BMICalculator()
    
    def test_calculate_bmi_metric(self):
        # Test with metric units
        bmi = self.calculator.calculate_bmi(180, 80, 'metric')
        assert round(bmi, 2) == 24.69
    
    def test_calculate_bmi_imperial(self):
        # Test with imperial units (5'11" = 71 inches, 176 lbs)
        bmi = self.calculator.calculate_bmi(71, 176, 'imperial')
        assert round(bmi, 2) == 24.52
    
    def test_bmi_categories(self):
        # Test different BMI categories
        assert self.calculator.get_bmi_category(17, 'male') == "Underweight"
        assert self.calculator.get_bmi_category(22, 'female') == "Normal weight"
        assert self.calculator.get_bmi_category(27, 'male') == "Overweight"
        assert self.calculator.get_bmi_category(32, 'female') == "Obesity Class I (Moderate)"
        assert self.calculator.get_bmi_category(37, 'male') == "Obesity Class II (Severe)"
        assert self.calculator.get_bmi_category(42, 'female') == "Obesity Class III (Very Severe)"
    
    def test_ideal_weight_range_metric(self):
        # Test ideal weight calculation for 180cm height
        ideal_range = self.calculator.get_ideal_weight_range(180, 'male', 'metric')
        assert ideal_range['min'] >= 60
        assert ideal_range['max'] <= 85
        assert ideal_range['unit'] == 'kg'
    
    def test_ideal_weight_range_imperial(self):
        # Test ideal weight calculation for 71 inches height
        ideal_range = self.calculator.get_ideal_weight_range(71, 'female', 'imperial')
        assert ideal_range['min'] >= 130
        assert ideal_range['max'] <= 175
        assert ideal_range['unit'] == 'lbs'
    
    def test_recommendations(self):
        # Test that recommendations are returned for different BMI values
        underweight_recs = self.calculator.get_recommendations(17, 'male')
        assert len(underweight_recs) > 0
        assert any('underweight' in rec.lower() for rec in underweight_recs)
        
        normal_recs = self.calculator.get_recommendations(22, 'female')
        assert len(normal_recs) > 0
        assert any('healthy' in rec.lower() for rec in normal_recs)
        
        overweight_recs = self.calculator.get_recommendations(27, 'male')
        assert len(overweight_recs) > 0
        assert any('overweight' in rec.lower() for rec in overweight_recs)