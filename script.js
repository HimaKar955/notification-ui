// Function to load the form dynamically
function showForm(formType) {
  const formPath = `forms/${formType}-form.html`;
  console.log(`Loading: ${formPath}`);

  fetch(formPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('formContainer').innerHTML = html;

      // Attach form validation once the form is loaded
      attachFormValidation(formType);  // Pass formType to handle validation
    })
    .catch(error => {
      console.error(error);
      alert('⚠️ Failed to load form. Make sure the path is correct and you are running a local server.');
    });
}

// Function to handle form validation
function attachFormValidation(formType) {
  let form;
  let submitButton;
  let formFields;
  form = document.getElementById('notificationForm');

  // Select the form and fields based on formType
  if (formType === 'insert-update') {
    form = document.getElementById('notificationForm');
    formFields = ['clientAccount', 'performingSite', 'destinationCode'];
    submitButton = form.querySelector('button[type="submit"]');
    // Dynamically populate performingSite options (1 to 61)
    const statusSelect = document.getElementById('performingSite');
    if (statusSelect) {
      for (let i = 1; i <= 61; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        statusSelect.appendChild(option);
      }
    }
    console.log(statusSelect)
  } else if (formType === 'read') {
    form = document.getElementById('readNotificationForm');
    formFields = ['clientAccountRead', 'performingSiteRead'];
    submitButton = form.querySelector('button[type="submit"]');
  } else if (formType === 'delete') {
    form = document.getElementById('deleteNotificationForm');
    formFields = ['clientAccountDelete', 'performingSiteDelete'];
    submitButton = form.querySelector('button[type="submit"]');
  }

  if (!form) return;  // Prevent errors if the form isn't loaded

  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    let errorMessage = 'Please fill in the mandatory fields: \n';
    let isValid = true;

    // Check each field in the form
    formFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field.value || (field.tagName.toLowerCase() === 'select' && field.value === '')) {
        errorMessage += ` - ${field.previousElementSibling.innerText}\n`;
        isValid = false;
      }
    });

    if (!isValid) {
      // Show an alert with the error message if validation fails
      alert(errorMessage);
    } else {
      // If all required fields are filled, submit the form (you can add your logic here)
      alert('Form submitted successfully!');
      // Add logic to submit form data or send it to the server here
    }
  });
}
