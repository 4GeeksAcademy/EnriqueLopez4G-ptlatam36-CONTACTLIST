const getState = ({ getStore, getActions, setStore }) => ({
    store: { contacts: [], agendas: [] },
    actions: {
      fetchJson: async (url, options = {}) => {
        const response = await fetch(url, options);
        // LAMENTABLEMENTE ES ERROR ESTUVO INSPORTABLE CREO QUE PORQUE TODOS LE ECHAMOS MONTO A LA API, 
        //INVESTIGUE EN INTERNET Y ME ENCONTRE ESTA SUGERENCIA,LA ENETENDI Y JALO.
        if (!response.ok) throw new Error(response.status === 429 ? 'Demasiadas solicitudes.' : `Error: ${response.status}`);
        const text = await response.text();
        return text ? JSON.parse(text) : {};
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
          await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: 'POST', headers: { 'accept': 'application/json', 'Content-Type': 'application/json' } });
          await getActions().loadAgendas();
          alert('Agenda agregada.');
        } catch (error) { console.error("Error en addAgenda:", error); }
      },
      deleteAgenda: async (slug) => {
        try {
          await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: 'DELETE' });
          await getActions().loadAgendas();
          alert('Agenda eliminada.');
        } catch (error) { console.error('Error en deleteAgenda:', error); }
      },
      addContact: async (newContact, parametroSlug) => {
        try {
          await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${parametroSlug}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newContact) });
          await getActions().loadContacts(parametroSlug);
        } catch (error) { console.error('Error al agregar contacto:', error); }
      },
      getContact: async (slug, contactId) => {
        try {
          const data = await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
          return data.contacts.find(c => c.id === contactId) || null;
        } catch (error) { console.error('Error al obtener contacto:', error); return null; }
      },
      deleteContact: async (slug, contactId) => {
        try {
          const response = await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, { method: 'DELETE' });
          if (response) {
            alert('Contacto eliminado.');
            setStore({ contacts: getStore().contacts.filter(contact => contact.id !== contactId) });
          } else { console.error('Error al eliminar contacto'); }
        } catch (error) { console.error('Error al eliminar contacto:', error); }
      },
      updateContact: async (slug, contactId, updatedContact) => {
        try {
          await getActions().fetchJson(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedContact) });
          await getActions().loadContacts(slug);
        } catch (error) { console.error('Error al actualizar contacto:', error); }
      }
    }
  });
  
  export default getState;
  