import express, { Request, Response } from 'express';

// Appointment Model ref
import Appointment from '../models/appointment';

/**
* @swagger
* /api/v1/appointments/{id}:
*   get:
*     summary: Retrieve a single appointment by id
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: A single appointment
*       404:
*         description: Appointment not found
*/
export const getAppointmentById = async (req: Request, res: Response) => {
    // check if id valid
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return res.status(404).json({ 'error': 'Appointment Not Found' });
    }

    return res.status(200).json(appointment);
}

/**
* @swagger
* /api/v1/appointments:
*   get:
*     summary: Retrieve all appointments
*     responses:
*       200:
*         description: A list of appointments
*/
export const getAppointments = async (req: Request, res: Response) => {
    // use model to fetch all appointment documents from MongoDB
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
}

/**
* @swagger
* /api/v1/appointments:
*   post:
*     summary: Create a new appointment
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               date:
*                 required: true
*                 type: string
*                 format: date-time
*               duration:
*                 required: true
*                 type: number
*               confirmed:
*                 type: boolean
*     responses:
*       201:
*         description: Appointment created
*       400:
*         description: Bad request
*/
export const createAppointment = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }

    const { title, date, duration, confirmed } = req.body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ 'error': 'Title is required and must be a non-empty string' });
    }

    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ 'error': 'Valid date is required' });
    }

    if (!duration || typeof duration !== 'number' || duration <= 0) {
        return res.status(400).json({ 'error': 'Duration is required and must be a positive number' });
    }

    if (confirmed !== undefined && typeof confirmed !== 'boolean') {
        return res.status(400).json({ 'error': 'Confirmed must be a boolean' });
    }

    try {
        // use Appointment model to save to db
        const newAppointment = await Appointment.create(req.body);
        return res.status(201).json(newAppointment); // 201: Resource Created, return the created appointment
    } catch (error) {
        return res.status(500).json({ 'error': 'Internal Server Error' });
    }
}

/**
* @swagger
* /api/v1/appointments/{id}:
*   put:
*     summary: Update an appointment based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               date:
*                 required: true
*                 type: string
*                 format: date-time
*               duration:
*                 required: true
*                 type: number
*               confirmed:
*                 type: boolean
*     responses:
*       204:
*         description: Updated, no content
*       404:
*         description: Appointment not found
*/
export const updateAppointment = async (req: Request, res: Response) => {
    // check if id valid
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return res.status(404).json({ 'error': 'Appointment Not Found' });
    }

    // use mongoose to update Appointment from request body
    await Appointment.findByIdAndUpdate(req.params.id, req.body);

    return res.status(204).json(); // 204: OK, No Content
};

/**
* @swagger
* /api/v1/appointments/{id}:
*   delete:
*     summary: Delete an appointment based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       204:
*         description: Deleted, no content
*       404:
*         description: Appointment not found
*/
export const deleteAppointment = async (req: Request, res: Response) => {
    // check if id valid
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return res.status(404).json({ 'error': 'Appointment Not Found' });
    }

    // use mongoose to delete appointment based on id param in url
    await Appointment.findByIdAndDelete(req.params.id);

    return res.status(204).json(); // 204: OK, No Content
};