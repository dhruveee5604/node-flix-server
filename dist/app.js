"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// our mvc file imports
const appointmentsRoutes_1 = __importDefault(require("./routes/appointmentsRoutes"));
// create & run new express app
const app = (0, express_1.default)();
// express app config
app.use(body_parser_1.default.json()); // parse request body as json
// mongodb connection
mongoose_1.default.connect(process.env.DB, {})
    .then((response) => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`Connection Failed: ${error}`));
// use appointments routes
app.use('/api/v1/appointments', appointmentsRoutes_1.default);
app.listen(4000, () => { console.log(`Express API running on port 4000`); });
// swagger api doc config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appointment Manager API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // location of api methods
};
// create new document using options above
const openApiSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve);
// set url routing for swagger api docs
// use Cloudflare Content Delivery Network for css/js so links work on any server (no local paths)
app.get('/api-docs', (req, res) => {
    const html = swagger_ui_express_1.default.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});
// api routing
app.use('/api/v1/appointments', appointmentsRoutes_1.default);
