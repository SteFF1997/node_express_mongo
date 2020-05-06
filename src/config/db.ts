import colors from 'colors';
import mongoose from 'mongoose';

export const connectDB = async () => {
  const connect = await mongoose.connect(
    'mongodb+srv://ivan:qweqwe@admincluster-1m4rn.mongodb.net/db',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  console.log(colors.blue.bold(`Mongo connect: ${connect.connection.host}`));
};
