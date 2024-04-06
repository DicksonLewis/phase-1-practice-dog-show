document.addEventListener('DOMContentLoaded', () => {



    // Fetch the list of dogs from the API and put them in the table
function fetchAndRenderDogs() {
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => renderDogTable(dogs))
      .catch(error => {
        console.log('Error fetching dogs:', error);
      });
  }
  
  // put the list of dogs in the table
  function renderDogTable(dogs) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
  
    dogs.forEach(dog => {
      const row = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;
      row.appendChild(nameCell);
  
      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;
      row.appendChild(breedCell);
  
      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;
      row.appendChild(sexCell);
  
      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => populateFormWithDog(dog));
      editCell.appendChild(editButton);
      row.appendChild(editCell);
  
      tableBody.appendChild(row);
    });
  }
  
  // Put dogs curretn info in form 
  function populateFormWithDog(dog) {
    const form = document.getElementById('dog-form');
    form.dataset.id = dog.id;
    form.elements.name.value = dog.name;
    form.elements.breed.value = dog.breed;
    form.elements.sex.value = dog.sex;
  }
  
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const dogId = form.dataset.id;
    const name = form.elements.name.value;
    const breed = form.elements.breed.value;
    const sex = form.elements.sex.value;
  
    // PATCH request to update the dog info
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, breed, sex })
    })
      .then(response => response.json())
      .then(updatedDog => {
        // Fetch and put the updated list of dogs in the table
        fetchAndRenderDogs();
      })
      .catch(error => {
        console.error('Error updating dog:', error);
      });
  
    
    form.reset();
  }
  
  // event listener to the form submit event
  const form = document.getElementById('dog-form');
  form.addEventListener('submit', handleFormSubmit);
  
  // Fetch and put the first list of dogs on page load
  fetchAndRenderDogs();
  
})