import { reactive, ref } from "./reactive"
import { effect } from "./reactive/lib/reactive";
import { createRenderer } from "./renderer/lib/createRenderer";

const renderer = createRenderer();

const bol = ref(false);

effect(() => {
    const vnode = {
        type: 'div',
        children: [
            {
                type: 'p',
                children: 'p1',
                key: 'p1'
            }, {
                type: 'p',
                children: 'p2',
                key: 'p2'
            }, {
                type: 'p',
                children: 'p3',
                key: 'p3'
            }, {
                type: 'p',
                children: 'p4',
                key: 'p4'
            },
        ]
    }
    renderer.render(vnode, document.querySelector('#app'));

    setTimeout(() => {
        const vnode = {
            type: 'div',
            children: [
                {
                    type: 'p',
                    children: 'p4',
                    key: 'p4'
                }, {
                    type: 'p',
                    children: 'p3',
                    key: 'p3'
                }, {
                    type: 'p',
                    children: 'p2',
                    key: 'p2'
                }, {
                    type: 'p',
                    children: 'p1',
                    key: 'p1'
                }, {
                    type: 'p',
                    children: 'p5',
                    key: 'p5'
                },
            ]
        }
        renderer.render(vnode, document.querySelector('#app'));
    }, 3000);
})


