import {useRouter} from "./router.js";
import {todoRepository} from "./todo-repository.js";

function fetchTodoById(id) {
    return todoRepository.query.findById({ _id: id }).exec().then(todo => {
        if (!todo) {
            throw new Error('Todo not found');
        }

        return todo;
    });
}

export const todoRouter = useRouter('/todos', ({_get, _post, _patch, _delete}) => {
    _get('/', () => todoRepository.query.find().exec());

    _post('/', (request) => {
        if (!request.body.text) {
            throw new Error('Invalid text param');
        }

        return todoRepository.query.create({
            text: request.body.text
        });
    });

    _patch('/:id/done', async (request) => {
        if (!('done' in request.body)) {
            throw new Error('Invalid done param');
        }

        const todo = await fetchTodoById(request.param.id);
        todo.done = request.body.done;
        await todo.save();

        return todo;
    });

    _delete('/:id', async (request) => {
        await todoRepository.query.deleteOne({ _id: request.params.id });
    })
});
