import Course from "../models/Courses.js";
import { multiMongooseToObject } from "../../util/mongoose.js";
class SiteControllers {
  async index(req, res, next) {
    try {
      // const CourseDoc = await Course.find({ name: 'dainv'}).exec();
      const courses = await Course.find({}).exec();
      return res.render("home", {
        courses: multiMongooseToObject(courses),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  search(req, res) {
    res.render("search");
  }
}
export default new SiteControllers();
