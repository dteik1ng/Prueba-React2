const BASE_URL = 'http://localhost:5002/api/empleados';

const api = {
  getEmpleados: async () => {
    const response = await fetch(BASE_URL);
    return response.json();
  },

  getEmpleadoById: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
  },

  addEmpleado: async (empleadoData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoData),
    });

    return response.json();
  },

  updateEmpleado: async (id, empleadoData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoData),
    });

    return response.json();
  },

  deleteEmpleado: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  },

  getAreas: async () => {
    try {
      const response = await fetch('http://localhost:5002/api/areas');
      if (!response.ok) {
        throw new Error(`Error al obtener las áreas: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw new Error(`Error en la solicitud de áreas: ${error.message}`);
    }
  },

  getRoles: async () => {
    try {
      const response = await fetch('http://localhost:5002/api/roles');
      if (!response.ok) {
        throw new Error(`Error al obtener los roles: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw new Error(`Error en la solicitud de roles: ${error.message}`);
    }
  },
};

export default api;
