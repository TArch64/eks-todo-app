import {useRepository} from "./repository.js";

export const todoRepository = useRepository('Todo', {
    text: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        required: false,
        default: false
    }
});
