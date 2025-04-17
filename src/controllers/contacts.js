import {
  getAllContacts,
  getContactById,
  createContactService,
  updateContactService,
  deleteContactService,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

const fetchAllContacts = async (req, res) => {
  const contacts = await getAllContacts();
  // Always return 200 status, even if contacts array is empty
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const fetchContactById = async (req, res) => {
  const contactID = req.params.contactID;
  const contact = await getContactById(contactID);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactID}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const contact = await createContactService(req.body);
  res.status(201).send({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

const updateContact = async (req, res) => {
  const { contactID } = req.params;
  const newFields = req.body;
  const contact = await updateContactService(contactID, newFields, { upsert: false });
  res.status(200).send({
    status: 200,
    message: 'Successfully updated contact!',
    data: contact,
  });
};

const deleteContact = async (req, res) => {
  const contactID = req.params.contactID;
  console.log('deleteContact:', contactID);
  const contact = await deleteContactService(contactID);
  res.status(200).send({
    status: 200,
    message: 'Successfully deleted contact!',
    data: contact,
  });
};

export {
  fetchAllContacts,
  fetchContactById,
  createContact,
  updateContact,
  deleteContact
};