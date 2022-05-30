const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function readFile() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Cannot read file ${contactsPath}`);
    return null;
  }
}

async function writeFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (error) {
    console.error(error.message);
  }
}

const listContacts = async () => {
  const data = await readFile();
  if (data) {
    return data;
  } else {
    console.log(`Cannot found contacts`);
    return null;
  }
};

const getContactById = async (contactId) => {
  const data = await readFile();
  if (data) {
    const contact = data.find((contact) => contact.id === contactId);
    return contact;
  } else {
    console.log(`Not found contact with id ${contactId}`);
    return null;
  }
};

const removeContact = async (contactId) => {
  const data = await readFile();
  if (data) {
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      console.log(`Not found contact with id ${contactId}`);
      return null;
    } else {
      const contact = data.splice(index, 1);
      writeFile(data);
      return contact;
    }
  } else {
    console.log(`Cannot remove contact with id ${contactId}`);
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const data = await readFile();
  if (data) {
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    data.push(newContact);
    writeFile(data);
    return newContact;
  } else {
    console.log(`Cannot add contact with name ${name}`);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  const data = await readFile();
  if (data) {
    const index = data.findIndex(
      (contact) => contact.id === contactId.toString()
    );
    if (index === -1) {
      console.log(`Not found contact with id ${contactId}`);
      return null;
    } else {
      data.splice(index, 1, { ...body, id: contactId });
      writeFile(data);
      return { ...body, id: contactId };
    }
  } else {
    console.log(`Cannot undate contact with id ${contactId}`);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
