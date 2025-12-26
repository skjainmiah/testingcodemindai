class BMICalculator:
    """Class to handle BMI calculations and health recommendations."""
    
    def calculate_bmi(self, height, weight, unit_system='metric'):
        """
        Calculate BMI based on height and weight.
        
        Args:
            height: Height in cm (metric) or inches (imperial)
            weight: Weight in kg (metric) or pounds (imperial)
            unit_system: 'metric' or 'imperial'
            
        Returns:
            BMI value
        """
        if unit_system == 'imperial':
            # Convert to metric
            height = height * 2.54  # inches to cm
            weight = weight * 0.453592  # pounds to kg
        
        # Convert height to meters
        height_m = height / 100
        
        # Calculate BMI
        bmi = weight / (height_m ** 2)
        return bmi
    
    def get_bmi_category(self, bmi, gender):
        """
        Determine BMI category based on WHO standards.
        
        Args:
            bmi: BMI value
            gender: 'male' or 'female'
            
        Returns:
            BMI category string
        """
        if bmi < 18.5:
            return "Underweight"
        elif 18.5 <= bmi < 25:
            return "Normal weight"
        elif 25 <= bmi < 30:
            return "Overweight"
        elif 30 <= bmi < 35:
            return "Obesity Class I (Moderate)"
        elif 35 <= bmi < 40:
            return "Obesity Class II (Severe)"
        else:
            return "Obesity Class III (Very Severe)"
    
    def get_ideal_weight_range(self, height, gender, unit_system='metric'):
        """
        Calculate ideal weight range based on height and gender.
        
        Args:
            height: Height in cm (metric) or inches (imperial)
            gender: 'male' or 'female'
            unit_system: 'metric' or 'imperial'
            
        Returns:
            Dictionary with min and max ideal weight
        """
        if unit_system == 'imperial':
            height = height * 2.54  # Convert to cm
        
        height_m = height / 100
        
        # Calculate ideal weight range (BMI 18.5-25)
        min_weight = 18.5 * (height_m ** 2)
        max_weight = 25 * (height_m ** 2)
        
        # Adjust slightly for gender
        if gender == 'male':
            min_weight *= 1.05
            max_weight *= 1.05
        else:
            min_weight *= 0.95
            max_weight *= 0.95
        
        if unit_system == 'imperial':
            min_weight = min_weight * 2.20462  # kg to pounds
            max_weight = max_weight * 2.20462
        
        return {
            'min': round(min_weight, 1),
            'max': round(max_weight, 1),
            'unit': 'lbs' if unit_system == 'imperial' else 'kg'
        }
    
    def get_recommendations(self, bmi, gender):
        """
        Provide health recommendations based on BMI.
        
        Args:
            bmi: BMI value
            gender: 'male' or 'female'
            
        Returns:
            List of recommendations
        """
        recommendations = []
        
        if bmi < 18.5:
            recommendations = [
                "You are underweight. Consider consulting a healthcare provider.",
                "Focus on nutrient-dense foods to gain healthy weight.",
                "Include protein-rich foods in your diet.",
                "Consider strength training exercises.",
                "Ensure adequate calorie intake for your activity level."
            ]
        elif 18.5 <= bmi < 25:
            recommendations = [
                "Congratulations! You are at a healthy weight.",
                "Maintain your current lifestyle habits.",
                "Continue regular physical activity (150 minutes/week).",
                "Keep a balanced diet with variety.",
                "Stay hydrated and get adequate sleep."
            ]
        elif 25 <= bmi < 30:
            recommendations = [
                "You are overweight. Consider lifestyle modifications.",
                "Aim for a modest weight loss of 5-10% of body weight.",
                "Increase physical activity to 300 minutes/week.",
                "Focus on portion control and mindful eating.",
                "Limit processed foods and sugary drinks."
            ]
        else:
            recommendations = [
                "You are in the obese category. Consult a healthcare provider.",
                "Set realistic weight loss goals (1-2 lbs/week).",
                "Consider working with a registered dietitian.",
                "Start with low-impact exercises like walking or swimming.",
                "Monitor other health markers (blood pressure, cholesterol)."
            ]
        
        # Add gender-specific recommendations
        if gender == 'female':
            recommendations.append("Consider hormonal factors that may affect weight.")
        else:
            recommendations.append("Focus on maintaining muscle mass while losing weight.")
        
        return recommendations