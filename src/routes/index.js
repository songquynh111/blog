import newsRouter from './news.js'; // Thêm .js vào đường dẫn
import siteRouter from './sites.js';
import coursesRouter from './course.js';
import meRouter from './me.js';

export default function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}
