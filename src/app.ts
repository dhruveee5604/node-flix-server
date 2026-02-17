// npm imports
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// our mvc file imports
import appointmentsRouter from './routes/appointmentsRoutes';

// create & run new express app
const app: Application = express();

// express app config
app.use(bodyParser.json());  // parse request body as json

// mongodb connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Connection Failed: ${error}`));

// use appointments routes
app.use('/api/v1/appointments', appointmentsRouter);

app.listen(4000, () => { console.log(`Express API running on port 4000`) });

// swagger api doc config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appointment Manager API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js']  // location of api methods
};

// create new document using options above
const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

// set url routing for swagger api docs
// use Cloudflare Content Delivery Network for css/js so links work on any server (no local paths)
app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});

// api routing
app.use('/api/v1/appointments', appointmentsRouter);