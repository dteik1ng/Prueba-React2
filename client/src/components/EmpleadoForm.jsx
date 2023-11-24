import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const EmpleadoForm = ({ show, handleClose, refreshEmpleados }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    sexo: '',
    area: '',
    descripcion: '',
    boletin: false,
    roles: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addEmpleado(formData);
      console.log('Empleado agregado exitosamente');
      refreshEmpleados();
      handleClose();
    } catch (error) {
      console.error('Error al agregar empleado:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formArea">
            <Form.Label>Área</Form.Label>
            <Form.Control
              as="select"
              name="area"
              value={formData.area}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="Profesional de proyectos">Profesional de proyectos</option>
              <option value="Gerente estratégico">Gerente estratégico</option>
              <option value="Auxiliar administrativo">Auxiliar administrativo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBoletin">
            <Form.Check
              type="checkbox"
              label="Recibir boletín informativo"
              name="boletin"
              checked={formData.boletin}
              onChange={(e) => setFormData({ ...formData, boletin: e.target.checked })}
            />
          </Form.Group>
          <Form.Group controlId="formRoles">
            <Form.Label>Roles</Form.Label>
            <Form.Control
              as="select"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="Profesional de proyectos">Profesional de proyectos</option>
              <option value="Gerente estratégico">Gerente estratégico</option>
              <option value="Auxiliar administrativo">Auxiliar administrativo</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmpleadoForm;
