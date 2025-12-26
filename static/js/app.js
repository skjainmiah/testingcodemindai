document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error-message');
    const unitSystemRadios = document.querySelectorAll('input[name="unit_system"]');
    
    // Update unit labels when unit system changes
    unitSystemRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateUnitLabels(this.value);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous results and errors
        resultsDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            height: parseFloat(formData.get('height')),
            weight: parseFloat(formData.get('weight')),
            gender: formData.get('gender'),
            unit_system: formData.get('unit_system')
        };
        
        // Validate form data
        if (!data.height || !data.weight || !data.gender) {
            showError('Please fill in all fields');
            return;
        }
        
        try {
            // Send request to calculate BMI
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'An error occurred');
            }
            
            // Display results
            displayResults(result, data.unit_system);
            
        } catch (error) {
            showError(error.message);
        }
    });
    
    function updateUnitLabels(unitSystem) {
        const heightUnit = document.querySelector('.height-unit');
        const weightUnit = document.querySelector('.weight-unit');
        
        if (unitSystem === 'imperial') {
            heightUnit.textContent = '(inches)';
            weightUnit.textContent = '(lbs)';
        } else {
            heightUnit.textContent = '(cm)';
            weightUnit.textContent = '(kg)';
        }
    }
    
    function displayResults(result, unitSystem) {
        // Update BMI value
        document.getElementById('bmi-number').textContent = result.bmi;
        
        // Update category with color coding
        const categoryElement = document.getElementById('bmi-category');
        categoryElement.textContent = result.category;
        categoryElement.className = 'category';
        
        // Add appropriate class based on category
        if (result.category.includes('Underweight')) {
            categoryElement.classList.add('underweight');
        } else if (result.category.includes('Normal')) {
            categoryElement.classList.add('normal');
        } else if (result.category.includes('Overweight')) {
            categoryElement.classList.add('overweight');
        } else {
            categoryElement.classList.add('obese');
        }
        
        // Update ideal weight range
        const idealRange = result.ideal_weight_range;
        document.getElementById('ideal-range').textContent = 
            `${idealRange.min} - ${idealRange.max} ${idealRange.unit}`;
        
        // Update recommendations
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';
        result.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
        
        // Show results
        resultsDiv.classList.remove('hidden');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
});