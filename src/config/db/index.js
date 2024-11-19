import mongoose from 'mongoose';

async function connect(params) {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_edu_dev');
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

export default { connect };
