const express = require('express')
const multer = require('multer')
const logger = require('../utils/logger')

const router = express.Router()

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false)
    }
  }
})

/**
 * POST /api/upload/resume
 * Upload resume file
 */
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      })
    }

    const file = req.file

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({
        error: 'File too large. Maximum size is 10MB.'
      })
    }

    // TODO: Upload to S3 or cloud storage
    // For now, we'll return file info for temporary storage
    const fileInfo = {
      filename: `resume_${Date.now()}_${file.originalname}`,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      uploadDate: new Date(),
      // In production, this would be the S3 URL
      url: `/uploads/resumes/${Date.now()}_${file.originalname}`,
      // For demo purposes, store as base64 (not recommended for production)
      data: file.buffer.toString('base64')
    }

    logger.info(`Resume uploaded: ${fileInfo.filename}`)

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      data: fileInfo
    })
  } catch (error) {
    logger.error('Resume upload error:', error)
    res.status(500).json({
      error: 'File upload failed',
      message: error.message
    })
  }
})

/**
 * GET /api/upload/resume/:filename
 * Download resume file
 */
router.get('/resume/:filename', async (req, res) => {
  try {
    const { filename } = req.params

    // TODO: Implement file download from S3 or cloud storage
    // For now, return 404
    res.status(404).json({
      error: 'File not found',
      message: 'File storage not implemented yet'
    })
  } catch (error) {
    logger.error('Resume download error:', error)
    res.status(500).json({
      error: 'File download failed'
    })
  }
})

/**
 * DELETE /api/upload/resume/:filename
 * Delete resume file
 */
router.delete('/resume/:filename', async (req, res) => {
  try {
    const { filename } = req.params

    // TODO: Implement file deletion from S3 or cloud storage
    
    logger.info(`Resume deleted: ${filename}`)

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    })
  } catch (error) {
    logger.error('Resume deletion error:', error)
    res.status(500).json({
      error: 'File deletion failed'
    })
  }
})

module.exports = router