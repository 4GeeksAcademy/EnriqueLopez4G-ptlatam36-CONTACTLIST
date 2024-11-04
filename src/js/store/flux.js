const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            agendas: []
        },
        actions: {
            fetchJson: async (url, options = {}) => {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return await response.json();
            },

            loadAgendas: async () => {
                const data = await getActions().fetchJson('https://playground.4geeks.com/contact/agendas?offset=0&limit=100');
                setStore({ agendas: data.agendas });
            },

            loadContacts: async (slug) => {
                const data = await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
                setStore({ contacts: data.contacts });
            },

            addAgenda: async (newAgenda) => {
                const slug = newAgenda.name.toLowerCase().replace(/\s+/g, '-');
                try {
                    await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    });
                    await getActions().loadAgendas();
                    alert('Agenda Agregada correctamente.');
                } catch (error) {
                    console.error("Error en addAgenda:", error);
                }
            },

            deleteAgenda: async (slug) => {
                try {
                    await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: 'DELETE' });
                    await getActions().loadAgendas();
                    alert('Agenda eliminada correctamente.');
                } catch (error) {
                    console.error('Error deleting agenda:', error);
                }
            },

            addContact: async (newContact, parametroSlug) => {
                try {
                    await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${parametroSlug}/contacts`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newContact),
                    });
                    await getActions().loadContacts(parametroSlug);
                } catch (error) {
                    console.error('Error al agregar el contacto:', error);
                }
            },

            getContact: async (slug, contactId) => {
                try {
                    const data = await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
                    return data.contacts.find(c => c.id === contactId) || null;
                } catch (error) {
                    console.error('Error al obtener el contacto:', error);
                    return null;
                }
            },

            deleteContact: async (slug, contactId) => {
                try {
                    await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, { method: 'DELETE' });
                    await getActions().loadContacts(slug);
                    alert('Contacto eliminado correctamente.');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            },

            updateContact: async (slug, contactId, updatedContact) => {
                try {
                    await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedContact),
                    });
                    await getActions().loadContacts(slug);
                } catch (error) {
                    console.error('Error al actualizar el contacto:', error);
                }
            },
        }
    };
};

export default getState;
