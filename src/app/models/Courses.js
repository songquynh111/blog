import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import mongooseDelete from "mongoose-delete";
import autoIncrement from "mongoose-sequence";

const AutoIncrement = autoIncrement(mongoose);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, default: "hahaha", maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    timestamps: true,
  },
);

// Custom query helpers
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : "desc",
    });
  }
  return this;
};

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
export default mongoose.model("Course", CourseSchema);
plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
export default mongoose.model('Course', CourseSchema);
