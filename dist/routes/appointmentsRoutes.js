"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentsController_1 = require("../controllers/appointmentsController");
// Create router instance
const router = express_1.default.Router();
// Standard REST API routes for appointments
// GET /api/v1/appointments - Retrieve all appointments
router.get('/', appointmentsController_1.getAppointments);
// GET /api/v1/appointments/:id - Retrieve a single appointment by ID
router.get('/:id', appointmentsController_1.getAppointmentById);
// POST /api/v1/appointments - Create a new appointment
router.post('/', appointmentsController_1.createAppointment);
// PUT /api/v1/appointments/:id - Update an entire appointment by ID
router.put('/:id', appointmentsController_1.updateAppointment);
// DELETE /api/v1/appointments/:id - Delete an appointment by ID
router.delete('/:id', appointmentsController_1.deleteAppointment);
// Export the router
exports.default = router;
