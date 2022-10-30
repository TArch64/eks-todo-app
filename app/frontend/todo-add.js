import {css, html, LitElement} from 'lit';
import {HttpClient} from "./http-client.js";

export class TodoAdd extends LitElement {
    static styles = css`
        input { width: 400px }
    `;

    render() {
        return html`
            <form @submit="${this.#addTodo}">
                <input type="text" name="text">
                <button type="submit">Add</button>
            </form>
        `;
    }

    async #addTodo(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const todo = await HttpClient.instance.post('/todos', {
            text: data.get('text')
        });

        this.dispatchEvent(new CustomEvent('added', {
            bubbles: true,
            composed: true,
            detail: todo
        }));
    }
}
