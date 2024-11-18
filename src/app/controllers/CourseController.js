import Course from '../models/Courses.js';
import { mongooseToObject } from '../../util/mongoose.js';
class CourseController {
    //[GET] /course:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({
                slug: req.params.slug,
            }).exec();
            return res.render('courses/show', {
                course: mongooseToObject(course),
            });
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[GET] /course/create
    async create(req, res, next) {
        try {
            return res.render('courses/create');
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[POST] /course/store
    async store(req, res, next) {
        try {
            const course = new Course(req.body);
            await course.save();
            res.redirect('/');
        } catch (error) {
            console.log(error);

            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[GET] /courses/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).exec();
            return res.render('courses/edit', {
                course: mongooseToObject(course),
            });
        } catch (error) {
            next;
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[PUT] /courses/:id
    async update(req, res, next) {
        try {
            await Course.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next;
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[DELETE] /courses/:id
    async destroy(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id });
            res.redirect(req.get('Referrer'));
        } catch (error) {
            next;
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[DELETE] /courses/:id/force
    async forceDestroy(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id });
            res.redirect(req.get('Referrer'));
        } catch (error) {
            next;
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[PATCH] /courses/:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });
            res.redirect(req.get('Referrer'));
        } catch (error) {
            next;
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }

    //[POST] /courses/hanlde-form-action
    async handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                try {
                    await Course.delete({ _id: { $in: req.body.courseIds } });
                    res.redirect(req.get('Referrer'));
                } catch (error) {
                    next;
                    res.status(400).json({ error: 'ERROR!!!' });
                }
                break;
            default:
                res.json(req.body);
                break;
        }
    }
}

export default new CourseController();
