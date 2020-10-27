const express = require('express')
const Hubs = require('./db-model')

const router = express.Router()

// @desc		Get all posts
// @route		GET /api/posts
router.get('/api/posts', (req,res)=>{
    console.log(req.query)
    Hubs
        .find(req.query)
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })
})

// @desc		Get a post by id
// @route		GET /api/posts/:id
router.get('/api/posts', (req,res)=>{

})

// @desc		Get a comments from a specific post
// @route		Get /api/posts/:id/comments
router.get('/api/posts', (req,res)=>{

})

// @desc		Add a new post
// @route		POST /api/posts/
router.post('/api/posts', (req,res)=>{

})
// @desc		Update a comment on a post by id
// @route		POST /api/posts/:id/comments
router.post('/api/posts', (req,res)=>{

})
// @desc		Edit a post by id
// @route		PUT /api/posts/:id
router.put('/api/posts/:id', (req,res)=>{

})
// @desc		Remove a post by id
// @route		DELETE /api/posts/:id
router.delete('/api/posts/:id', (req,res)=>{

})

module.exports = router