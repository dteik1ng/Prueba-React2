import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const EmpleadosList = ({ empleados, onEdit, refreshEmpleados }) => {
  const handleDelete = async (idEmpleado) => {
    try {
      await api.deleteEmpleado(idEmpleado);
      refreshEmpleados();
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Sexo</th>
          <th>Área</th>
          <th>Boletín</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id_empleado}>
            <td>{empleado.id_empleado}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.email}</td>
            <td>{empleado.sexo === 'M' ? 'Masculino' : 'Femenino'}</td>
            <td>{empleado.id_area}</td>
            <td>{empleado.boletin === 1 ? 'Sí' : 'No'}</td>
            <td>
              <Link to={`/editar/${empleado.id_empleado}`}>
                <Button variant="info" onClick={() => onEdit(empleado.id_empleado)}>
                  Editar
                </Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(empleado.id_empleado)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmpleadosList;
