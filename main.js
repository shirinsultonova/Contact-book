let contactForm = document.querySelector(".contact-form");
let contactAllInput = document.querySelector(".contact-input");
let contactNameInput = document.querySelector(".contact-name-input");
let contactRelationshipInput = document.querySelector(
  ".contact-relationship-input"
);
let contactTelInput = document.querySelector(".contact-tel-input");
let contactSuccessBox = document.querySelector(".success-box");
let contactEmptyBox = document.querySelector(".empty-box");
let contactSameNumberBox = document.querySelector(".same-number-box");
let contactSendBtn = document.querySelector(".contact-send-btn");
let contactCanceldBtn = document.querySelector(".contact-delete-btn");
let contactItemCounter = document.querySelector(".contact-item-counter");
let contactResetdBtn = document.querySelector(".contact-reset-btn");
let contactResultList = document.querySelector(".contact-result-list");

// let contactList = [];

let contactList = JSON.parse(window.localStorage.getItem("userName")) || [];

contactItemCounter.textContent = ` Your item's count ${contactList.length}`;

// ! Form submit event
contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let contactNameInputValue = contactNameInput.value;
  let contactRelationshipInputValue = contactRelationshipInput.value;
  let contactTelInputValue = contactTelInput.value;

  const contactObject = {
    id: contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
    name: contactNameInputValue,
    relationship: contactRelationshipInputValue,
    number: contactTelInputValue,
  };

  // ! Check for same number
  let repeatNumber = contactList.find(
    (repeatNumber) => repeatNumber.number == contactTelInputValue
  );
  if (repeatNumber) {
    // ! This is setTimeOut code for empty box
    contactSameNumberBox.classList.add("same-number-box--on");
    contactEmptyBox.classList.add("d-none");
    setTimeout(() => {
      contactEmptyBox.classList.remove("d-none");
      contactSameNumberBox.classList.remove("same-number-box--on");
    }, 3000);
  }

  if (
    contactNameInputValue !== "" &&
    contactRelationshipInputValue !== "" &&
    contactTelInputValue !== "" &&
    !repeatNumber
  ) {
    contactList.push(contactObject);

    // ! This is setTimeOut code for success box
    contactSuccessBox.classList.add("success-box--on");
    contactSameNumberBox.classList.remove("same-number-box--on");
    setTimeout(() => {
      contactSuccessBox.classList.remove("success-box--on");
    }, 2000);

    contactItemCounter.textContent = ` Your item's count ${contactList.length}`;

    // ! Clean all input after submitting
    contactNameInput.value = "";
    contactRelationshipInput.value = "";
    contactTelInput.value = "+";
  } else {
    contactList.push();
    contactSuccessBox.classList.remove("success-box--on");
    contactEmptyBox.classList.add("empty-box--on");
    setTimeout(() => {
      contactEmptyBox.classList.remove("empty-box--on");
    }, 3000);
  }

  addList(contactList);
  window.localStorage.setItem("userName", JSON.stringify(contactList));
});

// ! Function to add element from JavaScript
function addList() {
  contactResultList.innerHTML = "";
  contactList.forEach((item) => {
    let contactItem = document.createElement("li");
    let contactIdText = document.createElement("p");
    let contactIdTextSpan = document.createElement("span");
    let contactNameText = document.createElement("p");
    let contactNameTextSpan = document.createElement("span");
    let contactRelationText = document.createElement("p");
    let contactRelationTextSpan = document.createElement("span");
    let contactNumberText = document.createElement("p");
    let contactNumberTextSpan = document.createElement("a");
    let contactDeleteItemBtn = document.createElement("button");
    contactNumberTextSpan.href = `tel:${item.number}`;

    contactItem.classList.add("contact-result-item");

    // ! Contact Title Names
    contactIdText.textContent = `Contact ID: `;
    contactIdTextSpan.textContent = ` ${item.id}`;
    contactIdText.classList.add("contact-result-main-text");
    contactNameText.textContent = `Name:`;
    contactNameTextSpan.textContent = ` ${item.name}`;
    contactNameText.classList.add("contact-result-main-text");
    contactRelationText.textContent = `Relationship:`;
    contactRelationTextSpan.textContent = ` ${item.relationship}`;
    contactRelationText.classList.add("contact-result-main-text");
    contactNumberText.textContent = `Number:`;
    contactNumberTextSpan.textContent = ` ${item.number}`;
    contactNumberText.classList.add("contact-result-main-text");

    // ! Contact Append Child
    contactResultList.appendChild(contactItem);
    contactItem.dataset.id = item.id;

    contactItem.appendChild(contactIdText);
    contactIdText.appendChild(contactIdTextSpan);
    contactIdTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactNameText);
    contactNameText.appendChild(contactNameTextSpan);
    contactNameTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactRelationText);
    contactRelationText.appendChild(contactRelationTextSpan);
    contactRelationTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactNumberText);
    contactNumberText.appendChild(contactNumberTextSpan);
    contactNumberTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactDeleteItemBtn);
    contactDeleteItemBtn.setAttribute("type", "button");
    contactDeleteItemBtn.classList.add("contact-delete-item-btn");
    contactDeleteItemBtn.textContent = `Delete`;
    contactDeleteItemBtn.dataset.id = item.id;

    contactResetdBtn.addEventListener("click", (e) => {
      contactList = [];
      contactResultList.innerHTML = "";
      contactItemCounter.textContent = ` Your item's count ${contactList.length}`;
      localStorage.clear();
    });
  });
}
addList(contactList);

// ! Delete one by one
contactResultList.addEventListener("click", function (evt) {
  if (evt.target.matches(".contact-delete-item-btn")) {
    let btnId = Number(evt.target.dataset.id);
    let itemId = contactList.findIndex((item) => item.id === btnId);
    contactList.splice(itemId, 1);
    window.localStorage.setItem("userName", JSON.stringify(contactList));
    addList(contactList);
    contactItemCounter.textContent = ` Your item's count ${contactList.length}`;
  }
});
