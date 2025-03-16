'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type Contact = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  is_read: boolean;
  subject?: string;
};

export default function AdminContacts() {
  const { user, loading: authLoading } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger la liste des contacts depuis Supabase
  useEffect(() => {
    if (!authLoading && user) {
      fetchContacts();
    }
  }, [authLoading, user]);

  async function fetchContacts() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des contacts:', error);
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error('Exception lors du chargement des contacts:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Marquer un contact comme lu ou non lu
  async function toggleReadStatus(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        return;
      }

      // Mettre à jour l'état local
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, is_read: !currentStatus } : contact
        )
      );

      // Mettre à jour le contact sélectionné si nécessaire
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, is_read: !currentStatus });
      }
    } catch (error) {
      console.error('Exception lors de la mise à jour du statut:', error);
    }
  }

  // Supprimer un contact
  async function deleteContact(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      return;
    }

    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression du contact:', error);
        return;
      }

      // Mettre à jour l'état local
      setContacts(contacts.filter((contact) => contact.id !== id));

      // Fermer le modal si le contact supprimé est le contact sélectionné
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Exception lors de la suppression du contact:', error);
    }
  }

  // Ouvrir le modal de détails
  function openContactDetails(contact: Contact) {
    setSelectedContact(contact);
    setIsModalOpen(true);

    // Si le contact n'était pas lu, le marquer comme lu
    if (!contact.is_read) {
      toggleReadStatus(contact.id, false);
    }
  }

  // Formater la date
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-2">Chargement des contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Demandes de contact</h1>
          <p className="mt-2 text-gray-600">
            Consultez et gérez les demandes de contact reçues via le formulaire de contact.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          {contacts.length === 0 ? (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <p className="text-gray-500">Aucune demande de contact pour le moment.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <div
                      className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                        !contact.is_read ? 'bg-green-50' : ''
                      }`}
                      onClick={() => openContactDetails(contact)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-green-600 truncate">
                            {contact.name}
                          </p>
                          {!contact.is_read && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Nouveau
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500 truncate">
                            <p>{contact.email}</p>
                            <p className="ml-3">{formatDate(contact.created_at)}</p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 truncate">{contact.message}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleReadStatus(contact.id, contact.is_read);
                          }}
                          className="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {contact.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteContact(contact.id);
                          }}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Détails de la demande
                    </h3>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Date</p>
                        <p className="mt-1">{formatDate(selectedContact.created_at)}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Nom</p>
                        <p className="mt-1">{selectedContact.name}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1">{selectedContact.email}</p>
                      </div>
                      {selectedContact.phone && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500">Téléphone</p>
                          <p className="mt-1">{selectedContact.phone}</p>
                        </div>
                      )}
                      {selectedContact.subject && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500">Sujet</p>
                          <p className="mt-1">{selectedContact.subject}</p>
                        </div>
                      )}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Message</p>
                        <p className="mt-1 whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => deleteContact(selectedContact.id)}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
