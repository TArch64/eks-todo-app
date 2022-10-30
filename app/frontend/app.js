import {LitElement, html, css, repeat} from 'lit';
import {HttpClient} from "./http-client.js";

export class App extends LitElement {
    static properties = {
        _todos: { type: Array }
    };

    static styles = css`
        app-todo-add {
            display: flex;
            margin-bottom: 16px;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
    `;

    constructor() {
        super();
        this._todos = [];
    }

    render() {
        return html`
            <app-todo-add @added="${this.#onTodoAdded}"></app-todo-add>
            <ul>${this.#renderTodos()}</ul>
        `;
    }

    #renderTodos() {
        return repeat(this._todos, (todo) => todo.id, (todo) => html`
            <li><app-todo .todo="${todo}" @deleted="${this.#onTodoDeleted}"></app-todo></li>
        `);
    }

    connectedCallback() {
        super.connectedCallback();
        this.#loadTodos();
    }

    async #loadTodos() {
        this._todos = await HttpClient.instance.get('/todos');
    }

    #onTodoAdded(event) {
        this._todos = [event.detail].concat(this._todos);
    }


    #onTodoDeleted(event) {
        this._todos = this._todos.filter(todo => todo.id !== event.detail.id);
    }
}
