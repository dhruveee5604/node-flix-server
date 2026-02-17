import express, { Router } from 'express';

import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentsController';

// Create router instance
const router: Router = express.Router();

// Standard REST API routes for appointments
// GET /api/v1/appointments - Retrieve all appointments
router.get('/', getAppointments);

// GET /api/v1/appointments/:id - Retrieve a single appointment by ID
router.get('/:id', getAppointmentById);

// POST /api/v1/appointments - Create a new appointment
router.post('/', createAppointment);

// PUT /api/v1/appointments/:id - Update an entire appointment by ID
router.put('/:id', updateAppointment);

// DELETE /api/v1/appointments/:id - Delete an appointment by ID
router.delete('/:id', deleteAppointment);

// Export the router
export default router;