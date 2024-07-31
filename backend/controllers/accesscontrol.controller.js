const db = require('../models');
const AccessControl = db.AccessControl;

// Create a new AccessControl entry
exports.create = async (req, res) => {
  try {
    const { student_id, external_id, access_granted } = req.body;
    const accessControl = await AccessControl.create({ student_id, external_id, access_granted });
    res.status(201).json(accessControl);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Retrieve all AccessControl entries
exports.findAll = async (req, res) => {
  try {
    const accessControls = await AccessControl.findAll();
    res.status(200).json(accessControls);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Retrieve an AccessControl entry by ID
exports.findOne = async (req, res) => {
  try {
    const accessControl = await AccessControl.findByPk(req.params.id);
    if (accessControl) {
      res.status(200).json(accessControl);
    } else {
      res.status(404).json({ message: 'AccessControl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update an AccessControl entry by ID
exports.update = async (req, res) => {
  try {
    const { access_granted } = req.body;
    const [updated] = await AccessControl.update({ access_granted }, { where: { id: req.params.id } });

    if (updated) {
      const updatedAccessControl = await AccessControl.findByPk(req.params.id);
      res.status(200).json(updatedAccessControl);
    } else {
      res.status(404).json({ message: 'AccessControl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete an AccessControl entry by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await AccessControl.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(200).json({ message: 'AccessControl deleted' });
    } else {
      res.status(404).json({ message: 'AccessControl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// exports.grantAccess = async (req, res) => {
//   try {
//       const { externalId, studentId } = req.body;

//       // Check if the record already exists
//       let accessRecord = await AccessControl.findOne({
//           where: { external_id: externalId, student_id: studentId }
//       });

//       if (!accessRecord) {
//           // Create new access record
//           accessRecord = await AccessControl.create({
//               external_id: externalId,
//               student_id: studentId,
//               access_granted: 1
//           });
//       } else {
//           // Update existing record
//           accessRecord.access_granted = 1;
//           await accessRecord.save();
//       }

//       res.status(200).json({ message: 'Access granted successfully' });
//   } catch (error) {
//       console.error('Error granting access:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Revoke access
// exports.revokeAccess = async (req, res) => {
//   try {
//     const { studentId, externalId } = req.body;

//     // Find the record and update it
//     const accessRecord = await AccessControl.findOne({ where: { student_id: studentId, external_id: externalId } });

//     if (accessRecord) {
//       accessRecord.access_granted = 0;
//       await accessRecord.save();
//       res.status(200).json({ message: 'Access revoked successfully' });
//     } else {
//       res.status(404).json({ message: 'Access record not found' });
//     }
//   } catch (error) {
//     console.error('Error revoking access:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.grantAccess = async (req, res) => {
  try {
      const { externalId, studentId } = req.body;

      let accessRecord = await AccessControl.findOne({
          where: { external_id: externalId, student_id: studentId }
      });

      if (!accessRecord) {
          accessRecord = await AccessControl.create({
              external_id: externalId,
              student_id: studentId,
              access_granted: 1
          });
      } else {
          accessRecord.access_granted = 1;
          await accessRecord.save();
      }

      res.status(200).json({ message: 'Access granted successfully' });
  } catch (error) {
      console.error('Error granting access:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Revoke access
exports.revokeAccess = async (req, res) => {
  try {
      const { externalId, studentId } = req.body;

      const accessRecord = await AccessControl.findOne({ where: { external_id: externalId, student_id: studentId } });

      if (accessRecord) {
          accessRecord.access_granted = 0;
          await accessRecord.save();
          res.status(200).json({ message: 'Access revoked successfully' });
      } else {
          res.status(404).json({ message: 'Access record not found' });
      }
  } catch (error) {
      console.error('Error revoking access:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.checkAccess = async (req, res) => {
  const { externalId, studentId } = req.body;

  try {
    const accessControl = await AccessControl.findOne({
      where: {
        external_id: externalId,
        student_id: studentId,
        access_granted: 1,
      },
    });

    if (accessControl) {
      res.json({ accessGranted: true });
    } else {
      res.json({ accessGranted: false });
    }
  } catch (error) {
    console.error('Error checking access control:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check access status
exports.checkAccessStatus = async (req, res) => {
  try {
      const { studentId } = req.query;

      const accessRecords = await AccessControl.findAll({
          where: { student_id: studentId },
          attributes: ['external_id', 'access_granted']
      });

      const accessStatus = {};
      accessRecords.forEach(record => {
          accessStatus[record.external_id] = record.access_granted;
      });

      res.status(200).json(accessStatus);
  } catch (error) {
      console.error('Error fetching access status:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};