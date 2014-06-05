module.exports = function(router, app, models) {

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log("method: %s\nurl: %s\npath: %s", req.method, req.url, req.path);
        console.log("body:"); 
        console.log(req.body);

        next(); // make sure we go to the next routes and don't stop here
    });

    // prefix all routes with /api
    app.use('/api', router);

    router.route('/todos')

        // create a todo (accessed at POST http://localhost:8080/api/todos)
        .post(function(req, res) {
            var todo = new models.Todo(); 		// create a new instance of the Todo model
            todo.name = req.body.name;  // set the todos name (comes from the request)

            // save the todo and check for errors
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Todo created!', doc: todo });
            });
        })

        .get(function(req, res) {
            models.Todo.find(function(err, todos) {
                if(err)
                    res.send(err);

                console.log(todos);
                res.json(todos);
            });
        });


    router.route('/todos/:todo_id')
        .get(function(req, res) {
            models.Todo.findById(req.params.todo_id, function(err, todo) {
                if(err)
                    res.send(err);

                res.json(todo);
            });
        })

        .put(function(req, res) {
            models.Todo.findById(req.params.todo_id, function(err, todo) {
                if(err)
                    res.send(err);

                todo.title = req.body.title;
                todo.status = req.body.status;
                todo.updated = Date.now();

                todo.save(function(err) {
                    if(err)
                        res.send(err);

                    res.json({ message: 'Todo updated successfully', doc: todo });
                });
            });
        })

        .delete(function(req, res) {
            models.Todo.remove({
                _id: req.params.todo_id
            }, function(err, todo) {
                if(err)
                    res.send(err);

                res.json({ message: "Deleted todo with id: " + req.params.todo_id });
            });
        });
};
