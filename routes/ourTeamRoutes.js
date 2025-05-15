const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateOurTeam, validateOurTeamId } = require('../validations/ourTeamValidation');
const {
  addOurTeam,
  updateOurTeam,
  getOurTeam,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/ourTeamController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-ourteam', uploadFiles, authenticateToken, validateOurTeam, addOurTeam);
router.put('/update-ourteam/:id', uploadFiles, authenticateToken, validateOurTeam, validateOurTeamId, updateOurTeam);
router.get('/get-ourteam', getOurTeam);
router.get('/find-ourteam', authenticateToken, getOurTeam);
router.put('/isactive-ourteam/:id', authenticateToken, validateOurTeamId, isActiveStatus);
router.delete('/isdelete-ourteam/:id', authenticateToken, validateOurTeamId, isDeleteStatus);

module.exports = router;