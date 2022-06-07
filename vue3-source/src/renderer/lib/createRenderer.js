import { Fragment, Text } from "./constance";

export function createRenderer() {
    function simpleDiff(n1, n2, container) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let lastIndex = 0;
        for (let i = 0; i < newChildren.length; i++) {
            let find = false;
            for (let j = 0; j < oldChildren.length; j++) {
                if (newChildren[i].key === oldChildren[j].key) {
                    find = true;
                    patch(oldChildren[j], newChildren[i], container);
                    if (j < lastIndex) {
                        // 需要移动节点
                        const preNode = newChildren[i - 1];
                        if (preNode) {
                            const anchor = preNode.element.nextSibling;
                            insert(container, newChildren[i].element, anchor);
                        }
                    } else {
                        lastIndex = j;
                    }
                    break;
                }
            }
            if (!find) {
                const preNode = newChildren[i - 1];
                let anchor = null;
                if (preNode) {
                    anchor = preNode.element.nextSibling;
                } else {
                    anchor = container.firstChild;
                }
                patch(null, newChildren[i], container, anchor);
            }
        }
        for (let i = 0; i < oldChildren.length; i++) {
            const has = newChildren.find(c => c.key === oldChildren[i].key);
            if (!has) {
                unmount(oldChildren[i]);
            }
        }
        
    }
    function twoSideDiff(n1, n2, container) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        const oldStart = 0;
        const oldEnd = oldChildren.length - 1;
        const newStart = 0;
        const newEnd = newChildren.length - 1;
        while (oldStart <= oldEnd && newStart <= newEnd) {
            if (!oldChildren[oldStart]) {
                oldStart++;
            } else if (!oldChildren[oldEnd]) {
                oldEnd--;
            } else if (oldChildren[oldStart].key === newChildren[newStart].key) {
                patch(oldChildren[oldStart], newChildren[newStart], container);
                oldStart++;
                newStart++;
            } else if (oldChildren[oldEnd].key === newChildren[newEnd].key) {
                patch(oldChildren[oldEnd], newChildren[newEnd], container);
                oldEnd--;
                newEnd--;
            } else if (oldChildren[oldEnd].key === newChildren[newStart].key) {
                patch(oldChildren[oldEnd], newChildren[newStart], container);
                insert(container, oldChildren[oldEnd].element, oldChildren[oldStart].element);
                oldEnd--;
                newStart++;
            } else if (oldChildren[oldStart].key === newChildren[newEnd].key) {
                patch(oldChildren[oldStart], newChildren[newEnd], container);
                insert(container, oldChildren[oldStart].element, oldChildren[oldEnd].element);
                oldStart++;
                newEnd--;
            } else {
                const idxInOld = oldChildren.find(c => c.key === newChildren[newStart].key);
                if (idxInOld > 0) {
                    const vnodeToMove = oldChildren[idxInOld];
                    patch(vnodeToMove, newChildren[newStart], container);
                    insert(container, vnodeToMove.element, oldChildren[oldStart].element);
                    oldChildren[idxInOld] = undefined;
                } else {
                    patch(null, newChildren[newStart], container, oldChildren[oldStart].element);
                }
                newStart++;
            }
        }
        if (oldEnd < oldStart && newStart <= newEnd) {
            for (let i = newStart; i < newEnd; i++) {
                patch(null, newChildren[i], container, oldChildren[oldStart].element);
            }
        } else if (newEnd < newStart && oldStart <= oldEnd) {
            for (let i = oldStart; i < oldEnd; i++) {
                unmount(oldChildren[i]);
            }
        }
    }
    function quickDiff(n1, n2, container) {
        const newChildren = n2.children;
        const oldChildren = n1.children;
        let j = 0;
        while(newChildren[j].key === oldChildren[j].key) {
            patch(oldChildren[j], newChildren[j], container);
            j++;
        }
        let oldEnd = oldChildren[oldChildren.length - 1];
        let newEnd = newChildren[newChildren.length - 1];
        while (newChildren[newEnd].key === oldChildren[oldEnd].key) {
            patch(oldChildren[oldEnd], newChildren[newEnd], container);
            oldEnd--;
            newEnd--;
        }
        if (j > oldEnd && j <= newEnd) {
            const anchorIndex = newEnd + 1;
            const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex] : null;
            while (j <= newEnd) {
                patch(null, newChildren[j], container, anchor);
                j++;
            }
        } else if (j > newEnd && j <= oldEnd) {
            while (j <= oldEnd) {
                unmount(oldChildren[j++]);
            }
        } else {
            const count = newEnd - j + 1;
            const source = new Array(count).fill(-1);
            let oldStart = j;
            let newStart = j;
            let moved = false;
            let pos = 0;
            const keyIndex = {};
            for (let i = newStart; i < newChildren.length; i++) {
                keyIndex[newChildren[i].key] = i;
            }
            let patched = 0;
            for (let i = oldStart; i < oldChildren.length; i++) {
                const oldVNode = oldChildren[i];
                const k = keyIndex[newVNode.key];
                if (patched < count) {
                    if (k !== undefined) {
                        const newVNode = newChildren[keyIndex[newVNode.key]];
                        patch(oldVNode, newVNode, container);
                        patched++;
                        source[k - newStart] = i;
                        if (k < pos) {
                            moved = true;
                        } else {
                            pos = k;
                        }
                    } else {
                        unmount(oldVNode);
                    }
                } else {
                    unmount(oldVNode);
                }
                if (moved) {
                    const seq = lis(source);
                    let s = seq.length - 1;
                    let i = count - 1;
                    for (i; i >= 0; i--) {
                        if (i !== seq[s]) {
                            if (source[i] === -1) {
                                const pos = i + newStart;
                                const newVNode = newChildren[pos];
                                const nextPos = pos + 1;
                                const anchor = newChildren.length > nextPos ? newChildren[nextPos].element : null;
                                patch(null, newVNode, container, anchor);
                            } else if (i !== seq[j]) {
                                const pos = i + newStart;
                                const newVNode = newChildren[pos];
                                const nextPos = pos + 1;
                                const anchor = newChildren.length > nextPos ? newChildren[nextPos].element : null;
                                insert(container, newVNode, anchor);
                            }
                        } else {
                            s--;
                        }
                    }
                }
            }

            
        }
    }

    // 计算最长递增子序列
    function lis(array) {
        const map = new Map();
        let max = 0;
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            map.set(i, [i]);
            let temp = i;
            while(map.get(--temp)) {
                const prev = map.get(temp);
                if (array[i] > array[prev[prev.length - 1]]) {
                    prev.push(i);
                    if (prev.length > max) {
                        max = prev.length;
                        index = temp;
                    }
                    map.set(temp, prev);
                }
            }
        }
        console.log(map);
        if (index !== -1) {
            return map.get(index)
        } else {
            return [array[0]];
        }
    }

    function insert(parent, children, anchor = null) {
        anchor ? parent.insertBefore(children, anchor) : parent.append(children);
    }

    function shouldSetAsProps(el, key, value) {
        if (key === 'form' && el.target === 'INPUT') {
            return false;
        }
        return key in el;
    }

    function normalizeClass(classValue) {
        if (typeof classValue === 'string') {
            return classValue;
        } else if (typeof classValue === 'object') {
            const ret = new Set();
            for (let key in classValue) {
                if (classValue[key]) {
                    ret.add(classValue[key]);
                }
            }
            return [...ret].join(' ');
        } else if (Array.isArray(classValue)) {
            const ret = new Set();
            for (let value of classValue) {
                if (typeof value === 'string') {
                    ret.add(value);
                } else if (typeof value === 'object') {
                    const ret2 = new Set();
                    for (let key in classValue) {
                        if (classValue[key]) {
                            ret2.add(classValue[key]);
                        }
                    }
                    ret.add([...ret2].join(' '));
                }
            }
            return [...ret].join(' ');
        }
    }

    function patchProps(element, key, preVal, newVal) {
        if (key.startsWith('on')) {
            const invokers = element._vei || (element._vei = {});
            const name = key.slice(2).toLowerCase();
            let invoker = invokers[key];
            if (newVal) {
                if (!invoker) {
                    invoker = element._vei[key] = e => {
                        if (e.timeStamp < invoker.attached) {
                            return;
                        }
                        if (Array.isArray(invoker.value)) {
                            invoker.value.forEach(fn => fn(e));
                        } else {
                            invoker.value(e);
                        }
                    }
                    invoker.value = newVal;
                    invoker.attached = performance.now();
                    element.addEventListener(name, invoker);
                } else {
                    invoker.value = newVal;
                }
            } else {
                element.removeEventListener(name, invoker);
            }
        } else if (key === 'class') {
            el.className = normalizeClass(newVal) || '';
        } else if (shouldSetAsProps(element, key, newVal)) {
            const type = typeof element[key];
            if (type === 'boolean' && newVal === '') {
                el[key] = true;
            } else {
                el[key] = newVal;
            }
        } else {
            element.setAttribute(key, newVal);
        }
    }

    function patchElement(n1, n2) {
        const element = n2.element = n1.element;
        const oldProps = n1.props;
        const newProps = n2.props;
        for (const key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                patchProps(element, key, oldProps[key], newProps[key]);
            }
        }
        for (const key in oldProps) {
            if (!(key in newProps)) {
                patchProps(element, key, oldProps[key], newProps[key])
            }
        }
        patchChildren(n1, n2, element);
    }

    function patchChildren(n1, n2, element) {
        if (typeof n2.children === 'string') {
            if (Array.isArray(n1.children)) {
                n1.children.forEach(c => unmount(c));
            }
            element.innerHTML = n2.children;
        } else if (Array.isArray(n2.children)) {
            if (Array.isArray(n1.children)) {
                simpleDiff(n1, n2, element);
            } else {
                element.innerHTML = '';
                n2.children.forEach(c => patch(null, c, element));
            }
        } else {
            if (Array.isArray(n1.children)) {
                n1.children.forEach(c => unmount(c.element));
            } else if (typeof n1.children === 'string') {
                element.innerHTML = '';
            }
        }
    }

    function mountElement(vnode, container, anchor) {
        const { type, children } = vnode;
        const element = vnode.element = document.createElement(type);
        if (typeof children === 'string') {
            element.innerHTML = children;
        } else if (Array.isArray(children)) {
            children.forEach(c => patch(null, c, element))
        }
        
        if (vnode.props) {
            for (let key in vnode.props) {
                const value = vnode.props[key];
                patchProps(element, key, null, value);
            }
        }
        insert(container, element, anchor);
    }

    function patch(n1, n2, container, anchor) {
        if (n1 && n1.type !== n2.type) {
            unmount(n1);
            n1 = null;
        }
        const { type } = n2;
        if (typeof type === 'string') {
            if (!n1) {
                mountElement(n2, container, anchor);
            } else {
                patchElement(n1, n2);
            }
        } else if (typeof type === Text) {
            if (!n1) {
                const textNode = document.createTextNode(n2.children);
                container.innerHTML = textNode;
            } else {
                const el = n2.element = n1.element;
                if (n2.children !== n1.children) {
                    el.nodeValue = n2.children;
                }
            }
        } else if (typeof type === Fragment) {
            if (!n1) {
                n2.children.forEach(c => patch(null, c, container));
            } else {
                patchChildren(n1, n2, container);
            }
        } else if (typeof type === 'object') {
            patchChildren(n1, n2, container);
        }
        

    }

    function unmount(vnode) {
        if (vnode.type === Fragment) {
            vnode.children.forEach(c => unmount(c));
            return;
        }
        const parent = vnode.element.parentNode;
        if (parent) {
            parent.removeChild(vnode.element);
        }
    }
    function render(vnode, container) {
        if (vnode) {
            patch(container._vnode, vnode, container);
        } else {
            if (container._vnode) {
                unmount(container._vnode);
            }
        }
        container._vnode = vnode;
    }

    return {
        render
    }
}