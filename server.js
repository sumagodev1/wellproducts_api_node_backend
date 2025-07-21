const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 8000;
const cors = require("cors");

app.use(cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// const corsOptions = {
//   origin: ['*'],
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://positivebackend.sumagodemo.com'); // Replace with your frontend URL
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const headerContactRoutes = require("./routes/headerContactRoutes");
const socialContactRoutes = require("./routes/SocialContactRoute");
const testimonialRoutes = require("./routes/testimonialRoutes");
const infrastructureRoutes = require("./routes/infrastructureRoute");
const carrousalRoutes = require('./routes/carrousalRoutes');
const homeSliderRoutes = require('./routes/homeSliderRoutes');
const uploadCVRoutes = require('./routes/uploadCVRoutes');
const contactPersonRoutes = require('./routes/contactPersonRoutes');
const officeRoutes = require('./routes/officeRoutes');
const carousalFormRoutes = require('./routes/carousalFormRoutes');
const requestCallbackFormRoutes = require('./routes/requestCallbackFormRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const getInTouchRoutes = require('./routes/getInTouchRoutes');
const productNameRoutes = require('./routes/productNameRoutes');
const productDetailsRoutes = require('./routes/productDetailsRoutes');
const technicalDataRoutes = require('./routes/technicalDataRoutes');
const optionsDataRoutes = require('./routes/optionsDataRoutes');
const materialDataRoutes = require('./routes/materialDataRoutes');
const productAggregateRoutes = require('./routes/productAggregateRoutes');
const blogDetailRoutes = require('./routes/blogDetailRoutes');
const newsRoutes = require('./routes/newsRoutes');
const teamRoutes = require('./routes/teamRoutes');
const eventRoutes = require('./routes/eventRoutes');
const OueleadersRoutes = require('./routes/OueleadersRoutes');

const ApplicationRoutes = require('./routes/ApplicationDataRoutes');
const productImagesRouter = require('./routes/productImagesRoutes')
const leadershipRoutes = require('./routes/leadershipRoutes');
const about = require('./routes/aboutRoutes');

// new modearch api
const categoryRoutes = require('./routes/categoryRoutes');
const projectNameRoutes = require('./routes/projectNameRoutes');
const projectDetailsRoutes = require('./routes/projectDetailsRoutes');
const projectDetailsWithImagesRoutes = require('./routes/projectDetailsWithImagesRoutes')
const galleryDetailsRoutes = require('./routes/galleryDetailsRoutes');
const galleryImagesRoutes = require('./routes/galleryImagesRoutes')

const facilitiesRoutes = require('./routes/facilitiesRoutes');
const homepagebannerRoutes = require('./routes/homepagebannerRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');
const contactInformationRoutes = require('./routes/contactInformationRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const ourTeamRoutes = require('./routes/ourTeamRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const subProductRoutes = require('./routes/subProductRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// const productDetailRoutes = require('./routes/productDetailRoutes')


app.use("/uploads", express.static("uploads"));
app.use('/dashboard',dashboardRoutes);
app.use('/about', about);
app.use('/leadership', leadershipRoutes);
app.use('/team', teamRoutes);
app.use('/dailynews', newsRoutes);
app.use('/events', eventRoutes);
app.use('/OueleadersRoutes', OueleadersRoutes);
app.use('/blogs', blogDetailRoutes);
app.use('/facilities', facilitiesRoutes);
app.use('/homepagebanner',homepagebannerRoutes);
app.use('/socialmedia',socialMediaRoutes);
app.use('/contactinformation',contactInformationRoutes);
app.use('/product',productRoutes);
// app.use('/productdeatil',productDetailRoutes);
app.use('/productdetails', productDetailsRoutes);
app.use('./ourteam',ourTeamRoutes);
app.use('/productname', productNameRoutes);
app.use('/jobpost',jobPostRoutes);
app.use('/contactus',contactUsRoutes);
app.use('/getintouch', getInTouchRoutes);
app.use('/subscribe', subscribeRoutes);
app.use('/requestcallbackform', requestCallbackFormRoutes);
app.use('/carousal-form', carousalFormRoutes);
app.use('/office', officeRoutes);
app.use('/contactperson', contactPersonRoutes);
app.use("/auth", authRoutes);
app.use("/header-contact", headerContactRoutes);
app.use("/social-contact", socialContactRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/infrastructure", infrastructureRoutes);
app.use('/carrousal', carrousalRoutes);
app.use('/homeslider', homeSliderRoutes);
app.use('/cvlists', uploadCVRoutes);
app.use('/technicalData', technicalDataRoutes);
app.use('/optionsData', optionsDataRoutes);
app.use('/applicationData',ApplicationRoutes);
app.use('/materialData', materialDataRoutes);
app.use('/productAggregate', productAggregateRoutes);
app.use('/productImages', productImagesRouter);

// new modearch api
app.use('/category', categoryRoutes);
app.use('/projectName', projectNameRoutes);
app.use('/projectDetails', projectDetailsRoutes);
app.use('/projectDetailsWithImages',projectDetailsWithImagesRoutes)
app.use('/galleryDetails',galleryDetailsRoutes)
app.use('/galleryImages',galleryImagesRoutes)
app.use('/userdb',userRoutes);
app.use('/subproduct',subProductRoutes);

// Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return apiResponse.ErrorResponse(res, err.message);
//   } else if (err) {
//     return apiResponse.ErrorResponse(res, err.message);
//   }
//   next();
// });

// Test DB connection
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync(); // Ensure the database and model are in sync
  } catch (err) {
    console.error("Error: " + err);
  }
};

app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data

// Initialize the application
const init = async () => {
  await testDbConnection();
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

init();

app.get("/", (req, res) => {
  res.send("server start");
});
