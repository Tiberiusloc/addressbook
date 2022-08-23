// Business Logic for AddressBook ---------
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

// Business Logic for Contacts --------


function Contact(firstName, lastName, phoneNumber, emailAddress, newPhysicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = newPhysicalAddress;
}

function PhysicalAddress(streetNum, city, state, zipCode, type) {
  this.streetNum = streetNum;
  this.city = city;
  this.state = state;
  this.zipCode = zipCode;
  this.type = type;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//UI Logic
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
  const fullAddress = contact.physicalAddress;
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email-address").innerText = contact.emailAddress;
  document.querySelector(".physical-address").innerText = fullAddress.streetNum;
  document.querySelector(".physical-address").innerText = fullAddress.city;
  document.querySelector(".physical-address").innerText = fullAddress.state;
  document.querySelector(".physical-address").innerText = fullAddress.zipCode;
  document.querySelector(".address-type").innerText = fullAddress.type;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailAddress = document.querySelector("input#new-email-address").value;
  const inputtedStreetNum = document.querySelector("input#new-street-num").value;
  const inputtedCity = document.querySelector("input#new-city").value;
  const inputtedState = document.querySelector("input#new-state").value;
  const inputtedZipCode = document.querySelector("input#new-zip").value;
  const inputtedPhysicalAddress = document.querySelector("input#new-physical-address").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedPhysicalAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null; 
  document.querySelector("input#new-email-address").value = null; 
  document.querySelector("input#new-physical-address").value = null; 
  document.querySelector("input#new-physical-address").value = null; 
  document.querySelector("input#new-physical-address").value = null; 
  document.querySelector("input#new-physical-address").value = null; 

  console.log(addressBook.contacts);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});