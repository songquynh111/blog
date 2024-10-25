import { engine } from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import * as sass from 'sass';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __dirname = path.resolve();
const app = express();
const port = 3000;
const route = require('./routes');

// Compile scss to css
const result = sass.compile(
    path.join(__dirname, 'src/resources/scss/app.scss'),
);
fs.writeFileSync(path.join(__dirname, 'src/public/css/app.css'), result.css);

// Static file
app.use(
    
    express.static(path.join(__dirname, 'src/public')));

// Middleware
app.use(
                    express.urlencoded({
                            extended: true,
                        }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        partialsDir: path.join(__dirname, 'src/resources/views/partials'),
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/resources/views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
