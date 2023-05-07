import { defaultState } from "../constants";

const useNode = () => {
    const LS_KEY = 'navi-comments'

    const updateLocalStorage = (tree) => {
        localStorage.setItem(LS_KEY, JSON.stringify(tree))
    }

    const initialiseComments = () => {
        const initialState = localStorage.getItem(LS_KEY);
        return initialState ? JSON.parse(initialState) : defaultState;
    }

    const insertNode = function(tree, parentId, item) {
        if (tree.id === parentId) {
            tree.items.unshift({
                id: new Date().getTime(),
                title: item,
                items: [],
                timeStamp: new Date()
            })
            updateLocalStorage(tree)
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, parentId, item);
        })
        const updatedTree = { ...tree, items: latestNode} 
        updateLocalStorage(updatedTree)
        return updatedTree;
    }

    const editNode = function (tree, parentId, updatedValue) {
        if (parentId === tree.id) {
            tree.title = updatedValue;
            tree.timeStamp = new Date()
            tree.isEdited = true;
            updateLocalStorage(tree)
            return tree;
        }
        tree.items.map(obj => editNode(obj, parentId, updatedValue));
        const updatedTree = {...tree} 
        updateLocalStorage(updatedTree)
        return updatedTree;
    }

    const deleteNode = function(tree, id) {
        for (let i =0;i<tree.items.length;i++) {
            const currentItem = tree.items[i];
            if (currentItem.id === id) {
                tree.items.splice(i, 1);
                updateLocalStorage(tree)
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        updateLocalStorage(tree)
        return tree;
    } 
    return {
        insertNode, deleteNode, editNode, initialiseComments
    }

}

export default useNode