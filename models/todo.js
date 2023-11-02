const express = require('express');
const router = express.Router();
const pool = require('../config/connection.js');

router.post('/todo', (req, res) => {
    const { note } = req.body;

    if (!note) {
        return res.status(400).json({ error: 'Note is required'});
    }

    pool.query('INSERT INTO todo (note) VALUES ($1)', [note], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Note is error' });
        }

        res.status(201).json({ message: 'Note successfully created', note });
    });
});

router.get('/todo', (req, res) => {
    const sql = 'SELECT * FROM todo';

    pool.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error find notes' });
        }
        res.json({ message: 'Succesfully get all notes', notes: result.rows});
    });
});

router.get('/todo/:id', (req, res) => {
    const movieId = req.params.id;

    const sql = 'SELECT * FROM todo WHERE id = $1';
    const values = [movieId];

    pool.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error find note' });
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.json({ message: 'Succesfully get this note', detail: result.rows[0]});
    });
});

router.delete('/todo/:id', (req, res) => {
    const todoId = req.params.id;

    const deleteSql = 'DELETE FROM todo WHERE id = $1';
    const values = [todoId];

    pool.query(deleteSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed delete note' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ message: 'Delete succesfullly' });
    });
});


module.exports = router;