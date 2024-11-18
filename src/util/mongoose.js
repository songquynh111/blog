export const multiMongooseToObject = (mongooses) =>
    mongooses.map((mongoose) => mongoose.toObject());
export const mongooseToObject = (mongoose) =>
    mongoose ? mongoose.toObject() : mongoose;
