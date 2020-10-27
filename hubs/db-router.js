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
router.get('/api/posts/:id', (req,res)=>{
    Hubs
        .findById(req.params.id)
        .then(hub => {
            if (hub) {
                res.status(200).json(hub)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })
})

// @desc		Get a comments from a specific post
// @route		Get /api/posts/:id/comments
router.get('/api/posts/:id/comments', (req,res)=>{
    Hubs
        .findPostComments(req.params.id)
        .then(data => {
            console.log(data)
            if(!data.length){
                res.status(404).json({message: `the post with specified ID ${req.params.id} does not exist`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })
})

// @desc		Add a new post
// @route		POST /api/posts/
router.post('/api/posts', (req,res)=>{
    // console.log(req.body)
    Hubs
        .insert(req.body)
        .then(hub => {
            const newPost = {...hub, ...req.body}
            console.log(newPost)
            res.status(201).json(newPost)
        })
        .catch(error => {
        console.log(error.message, error.stack)
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    })
})
// @desc		Update a comment on a post by id
// @route		POST /api/posts/:id/comments
router.post('/api/posts/:id/comments', (req,res)=>{
    
    const newComment = {post_id: req.params.id, ...req.body}
    Hubs
        .insertComment(newComment)
        .then(data => {
            const postComment ={...data, ...newComment}
            console.log(postComment)
            res.status(201).json(postComment)
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })
})
// @desc		Edit a post by id
// @route		PUT /api/posts/:id
router.put('/api/posts/:id', (req,res)=>{
    
    const updateUpdate = new Date()
    const changes = (req.body)
    
    console.log(changes)
    Hubs
        .update(req.params.id, changes)
        .then(hub => {
            if (hub){
                const changePost = {id: req.params.id, ...changes}
                res.status(200).json(changePost)
            } else {
                res.status(404).json({message: `The post with the specified ID ${req.params.id} does not exist.` })
            }
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })

})
// @desc		Remove a post by id
// @route		DELETE /api/posts/:id
router.delete('/api/posts/:id', (req,res)=>{    
    Hubs
        .remove(req.params.id)
        .then(count => {
            if (count > 0 ) {
                res.status(200).json({message: "post has been deleted"})
            } else {
                res.status(404).json({message: `the post with ID ${id} can not be found`})
            }
        })
        .catch(error => {
            console.log(error.message, error.stack)
            res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        })
})

module.exports = router