function formatDate(dateString) {
    const date = new Date(dateString);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const yy = date.getFullYear().toString().slice(-2);
    return `${mm}/${dd}/${yy}`;
  }
  
  let current_page = 1;
  let people_per_page = 10;
  
  let listOfUsers = document.getElementById('users-list');
  let pagination = document.getElementById('pagination');
  let totalUsers = users.length;
  let total_pages = Math.ceil(totalUsers / people_per_page);
  
  document.getElementById('page-header').innerHTML =
    `<h2>Contacts</h2>
    <h3>Total: ${totalUsers}</h3>`;
  
  function displayUsers(startIndex, endIndex) {
    listOfUsers.innerHTML = ''; 
  
    for (let i = startIndex; i < endIndex; i++) {
      let user = users[i];
  
      let contactItem = document.createElement('li');
      let contactDetails = document.createElement('div');
      let joinedDetails = document.createElement('div');
  
      let names = user.name.toLowerCase().split(' ');
      let email = `${names[0]}.${names[1]}@example.com`;
  
      contactDetails.innerHTML =
        `<img class="avatar" src="${user.image}">
        <h3>${user.name}</h3>
        <span class="email">${email}</span>`;
  
      contactDetails.classList.add('contact-details');
  
      joinedDetails.innerHTML =
        `<span class="date">Joined ${formatDate(user.joined)}</span>`;
  
      joinedDetails.classList.add('joined-details');
  
      contactItem.appendChild(contactDetails);
      contactItem.appendChild(joinedDetails);
      contactItem.classList.add('contact-item');
      contactItem.classList.add('cf');
      listOfUsers.appendChild(contactItem);
    }
  }
  
  function updatePagination() {
    pagination.innerHTML = ''; 
  
    for (let page = 1; page <= total_pages; page++) {
      let pageItem = document.createElement('li');
      pageItem.textContent = page;
      if (page === current_page) {
        pageItem.classList.add('active');
      }
      pageItem.addEventListener('click', function () {
        current_page = page;
        let startIndex = (current_page - 1) * people_per_page;
        let endIndex = startIndex + people_per_page;
        displayUsers(startIndex, endIndex);
        updatePagination();
      });
      pagination.appendChild(pageItem);
    }
  }
  
  
  let startIndex = (current_page - 1) * people_per_page;
  let endIndex = startIndex + people_per_page;
  displayUsers(startIndex, endIndex);
  updatePagination();