import {HttpClient} from "./http-client.js";
import {App} from "./app.js";
import {TodoAdd} from "./todo-add.js";
import {Todo} from "./todo.js";

HttpClient.init({
    baseUrl: '/api'
});

customElements.define('app-entry', App);
customElements.define('app-todo-add', TodoAdd);
customElements.define('app-todo', Todo);
