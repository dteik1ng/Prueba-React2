import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EmpleadosList from '../components/EmpleadosList';
import EmpleadoForm from '../components/EmpleadoForm';
import api from '../services/api';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmpleado(null);
  };

  const fetchEmpleados = async () => {
    try {
      const data = await api.getEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener la lista de empleados:', error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const refreshEmpleados = async () => {
    await fetchEmpleados();
  };

  const handleEdit = async (idEmpleado) => {
    try {
      const empleado = await api.getEmpleadoById(idEmpleado);
      setEditingEmpleado(empleado);
      handleShowForm();
    } catch (error) {
      console.error('Error al obtener el empleado para editar:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Empleados</h1>
      <Button variant="success" onClick={handleShowForm}>
        Agregar Empleado
      </Button>
      <EmpleadosList empleados={empleados} onEdit={handleEdit} refreshEmpleados={refreshEmpleados} />
      <EmpleadoForm
        show={showForm}
        handleClose={handleCloseForm}
        refreshEmpleados={refreshEmpleados}
        editingEmpleado={editingEmpleado}
      />
    </div>
  );
};

export default Home;
