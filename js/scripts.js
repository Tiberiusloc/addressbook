function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, newEmail, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = newEmail
  this.address = address
}

function Email(emailAddress, type) {
  this.emailAddress = emailAddress;
  this.type = type;
}

function Address(streetNum, city, state, zipCode) {
  this.streetNum = streetNum;
  this.city = city;
  this.state = state;
  this.zipCode = zipCode;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  const multiEmailAddress = contact.email;
  const multiAddress = contact.address;
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email-address").innerText = multiEmailAddress.emailAddress;
  document.querySelector(".email-type").innerText = multiEmailAddress.type;
  document.querySelector(".street-num").innerText = multiAddress.streetNum;
  document.querySelector(".city").innerText = multiAddress.city;
  document.querySelector(".state").innerText = multiAddress.state;
  document.querySelector(".zip-code").innerText = multiAddress.zipCode;
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  const inputtedEmailType = document.querySelector("select#email-type").value;
  const inputtedStreetNum = document.querySelector("input#street-num").value;
  const inputtedCity = document.querySelector("input#city").value;
  const inputtedState = document.querySelector("input#state").value;
  const inputtedZipCode = document.querySelector("input#zip-code").value;
  let newAddress = new Address(inputtedStreetNum, inputtedCity, inputtedState, inputtedZipCode);
  let newEmail = new Email(inputtedEmail, inputtedEmailType);
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newEmail, newAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
});