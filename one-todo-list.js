import {OneClass, html} from '@alexmtur/one-class'

export class OneTodoList extends OneClass {
    static get properties() {return {
        list: Array,
        newItem: String,
        suggestions: Array,
        color: String,
        color2: String,
        direction: Number,
    }}
    constructor() {
        super();  
        this.list = [];
        this.newItem = '';
        this.suggestions = [];
        this.color = '#00e3c3';
        this.direction = 0;
    }
    addItem () {
        let item = {'value': this.newItem, 'done': false};
        this.push('list', item);
        this.newItem = '';
    },
    toggleSelected (e) {
        let index = e.model.index;
        this.set('list.' + index + '.done', !e.model.item.done);
        //console.log(this.list)
    },
    ready () {
        if(this.color2) {
            this.customStyle['--one-color'] = 'linear-gradient(' +
                    this.direction + 'deg,' + this.color + ',' + this.color2 + ')';

        }
        else {
            this.customStyle['--one-color'] = this.color;
        }
    }
     _render() {
        return html`
        <style>
            /* local DOM styles go here */
            :host {
                display: inline-block;
                width: 100%;
                font-family: 'Open Sans';
            }
            .add-icon {
                font-size: 30px;
                margin-left: 10px;
            }
            .task-row {
                margin-top: 10px;
                cursor: pointer;
            }
            .task {
                font-size: 16px;
                color: #333333;
                transition: all .5s;
            }
            .task[selected] {
                color: #aaaaaa;
                text-decoration: line-through;
            }
            .checkbox {
                height: 20px;
                width: 20px;
                border: solid 1px;
                border-color: var(--one-color);
                border-radius: 20px;
                background: transparent;
                transition: all .5s;
                margin-right: 10px;
            }
            .checkbox[selected] {
                background: var(--one-color);
            }
            input {
                background: var(--one-color) !important;
                border: solid 0px transparent !important;
                color: white;
                font-family: 'Open Sans';
                font-size: 16px;
                display: inline-block;
                /*border-radius: 20px;*/
                text-align: center;
                line-height: 35px;
                min-width: 100px;
            }
            input:focus {
                outline: none;
            }
            input[type=text] {
                width: 100%;
                max-width: 350px;
            }

        </style>

        <one-block align="center-left" width="100%">
            <one-block weight="5">
                <input type="text" value="{{newItem::input}}">
            </one-block>
            <one-block weight="1" class="add-icon">
                <one-icon icon="fa fa-plus-circle" on-tap="addItem" color="{{color}}" color2="{{color2}}" direction="{{direction}}"></one-icon>
            </one-block>
        </one-block>

        <template is="dom-repeat" items="{{list}}">
            <one-block align="center-left" width="100%" class="task-row" on-tap="toggleSelected">
                <div class="checkbox" selected$="{{item.done}}"></div>
                <one-block weight="1">
                    <div class="task" selected$="{{item.done}}">{{item.value}}</div>
                </one-block>
            </one-block>
        </template>`;}
}
customElements.define('one-todo-list', OneTodoList);
