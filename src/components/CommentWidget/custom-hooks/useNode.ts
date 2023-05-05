const useNode = () => {
    const insertNode = function(tree, parentId, item) {
        if (tree.id === parentId) {
            tree.items.unshift({
                id: new Date().getTime(),
                title: item,
                items: []
            })
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, parentId, item);
        })
        return { ...tree, items: latestNode}
    }

    const deleteNode = function(tree, id) {
        for (let i =0;i<tree.items.length;i++) {
            const currentItem = tree.items[i];
            if (currentItem.id === id) {
                tree.items.splice(i, 1);
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    } 
    return {
        insertNode, deleteNode
    }

}

export default useNode