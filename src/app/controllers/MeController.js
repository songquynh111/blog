import Course from '../models/Courses.js';
import { mongooseToObject } from '../../util/mongoose.js';
import { multiMongooseToObject } from '../../util/mongoose.js';
import moment from 'moment';
class MeController {
    //[GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            // Promise.all([Course.findWithDeleted(),Course.countDocumentsWithDeleted({deleted:true})])
            //     .then(([courses,countDocumentsDeleted]) => {
            //         return res.render('me/stored-sourses',{
            //             countDocumentsDeleted,
            //             courses : multiMongooseToObject(courses)
            //         });
            //     }).catch(next)

            // const formattedCourses = courses.map(course => {
            //     return {
            //         ...course.toObject(),
            //         deletedAt: course.deletedAt ? moment(course.deletedAt).format('DD-MM-YYYY') : null
            //     };
            // });

            let countDocumentsDeleted;
            let courses;

            try {
                countDocumentsDeleted = await Course.countDocumentsWithDeleted({
                    deleted: true,
                });
            } catch (error) {
                console.error('Error counting deleted documents:', error);
                return res
                    .status(500)
                    .json({ error: 'Error counting deleted documents' });
            }

            try {
                let query = Course.findWithDeleted().sortable(req);
                courses = await query;
            } catch (error) {
                console.error('Error finding courses:', error);
                return res.status(500).json({ error: 'Error finding courses' });
            }

            return res.render('me/stored-sourses', {
                courses: multiMongooseToObject(courses),
                countDocumentsDeleted,
            });
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }
}

export default new MeController();
