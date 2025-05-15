const express = require('express');
// const { upload } = require('../middleware/multer');
const upload = require('../config/multer-config');
const {
  addHomePageBanner,
  updateHomePageBanner,
  getHomePageBanner,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/homepagebannerController');
const authenticateToken = require('../middleware/auth');

const {
  validateHomePageBanner,
  validateHomePageBannerId,
} = require('../validations/homepagebannerValidation');

const router = express.Router();

// upload.single('img') 

router.post('/create-homepagebanner',  upload.single('img'), authenticateToken, addHomePageBanner,validateHomePageBanner);
router.put('/update-homepagebanner/:id',  upload.single('img'), authenticateToken, updateHomePageBanner,validateHomePageBanner,validateHomePageBannerId);
router.get('/get-homepagebanner', getHomePageBanner);
router.get('/find-homepagebanner',authenticateToken, getHomePageBanner);
router.put('/isactive-homepagebanner/:id', authenticateToken,validateHomePageBannerId, isActiveStatus);
router.delete ('/isdelete-homepagebanner/:id', authenticateToken,validateHomePageBannerId, isDeleteStatus);

module.exports = router;


// const express = require('express');
// const upload = require('../middleware/fileUploadMiddleware');
// const {
//   addHomePageBanner,
//   updateHomePageBanner,
//   getHomePageBanner,
//   isActiveStatus,
//   isDeleteStatus,
// } = require('../controllers/homepagebannerController');
// const authenticateToken = require('../middleware/auth');

// const {
//   validateHomePageBanner,
//   validateHomePageBannerId,
// } = require('../validations/homepagebannerValidation');

// const router = express.Router();

// // Routes
// router.post(
//   '/create-homepagebanner',
//   authenticateToken,
//   upload.single('img'),
//   validateHomePageBanner,
//   addHomePageBanner
// );

// router.put(
//   '/update-homepagebanner/:id',
//   authenticateToken,
//   upload.single('img'),
//   validateHomePageBannerId,
//   validateHomePageBanner,
//   updateHomePageBanner
// );

// router.get('/get-homepagebanner', authenticateToken, getHomePageBanner);

// router.patch(
//   '/isactive-homepagebanner/:id',
//   authenticateToken,
//   validateHomePageBannerId,
//   isActiveStatus
// );

// router.patch(
//   '/isdelete-homepagebanner/:id',
//   authenticateToken,
//   validateHomePageBannerId,
//   isDeleteStatus
// );

// module.exports = router;



