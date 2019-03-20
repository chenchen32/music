const addTwoNumbers = (l1, l2) => {
    let number1 = getNumberFromListNode(l1)
    let number2 = getNumberFromListNode(l2)
    let addResult = number1 + number2
    let listNode = parseNumberToListNode(addResult)
    return listNode
}

const getNumberFromListNode = (node) => {
    let firstNode = node
    let result = [firstNode.val]
    while (firstNode.next !== null) {
        let nextNodeVal = firstNode.next.val
        result.push(nextNodeVal)
        firstNode = firstNode.next
    }
    let str = result.reverse().join('')
    return Number(str)
}

const parseNumberToListNode = (number) => {
    let str = String(new Number(number).toLocaleString())
    // console.log('str', str)
    let len = str.length
    let firstElement = Number(str[len - 1])
    let listNode = new ListNode(firstElement)
    let firstNode = listNode
    for (let i = len - 2; i >= 0; i--) {
        let element = Number(str[i])
        let thisNode = new ListNode(element)
        listNode.next = thisNode
        listNode = thisNode
    }
    return firstNode
}

function ListNode(val) {
    this.val = val
    this.next = null
}

let node1 = parseNumberToListNode(1000000000000000000000000000001)

console.log('node1', node1)

// let parseNode1 = getNumberFromListNode(node1)

let node2 = parseNumberToListNode(564)

// let parseNode2 = getNumberFromListNode(node2)

// console.log(addTwoNumbers(node1, node2))