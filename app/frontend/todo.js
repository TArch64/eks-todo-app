import {html, css, LitElement} from 'lit';
import {HttpClient} from "./http-client.js";

export class Todo extends LitElement {
    static properties = {
        todo: {
            type: Object,
            attribute: 'todo'
        }
    };

    static styles = css`
        :host {
            display: flex;
            align-items: center;
        }

        button,
        input { margin-right: 8px }
    `;

    render() {
        return html`
            <input type="checkbox" .checked="${this.todo.done}" @change="${this.#toggleDone}">
            <button type="button" @click="${this.#delete}">Delete</button>
            ${this.todo.text}
        `;
    }

    async #toggleDone(event) {
        await HttpClient.instance.patch(`/todos/${this.todo.id}/done`, {
            done: event.target.checked
        });
    }

    async #delete() {
        await HttpClient.instance.delete(`/todos/${this.todo.id}`);

        this.dispatchEvent(new CustomEvent('deleted', {
            bubbles: true,
            composed: true,
            detail: this.todo
        }));
    }
}