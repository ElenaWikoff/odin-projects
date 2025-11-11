import { Node, LinkedList } from "./linked-list.js";

describe("Node", () => {
  // Test Node initialization
  it("should create a Node with value and next", () => {
    let node = Node(1, null);
    expect(node.value()).toBe(1);
    expect(node.next()).toBe(null);
    node = Node(1, Node(2, null));
    expect(node.value()).toBe(1);
    expect(node.next().value()).toBe(2);
  });

  // Test Node initialization
  it(".setNext(node), should set this nodes next to node", () => {
    let node_one = Node(1, null);
    let node_two = Node(2, null);
    node_one.setNext(node_two);
    expect(node_one.value()).toBe(1);
    expect(node_one.next().value()).toBe(2);
    expect(node_two.value()).toBe(2);
    expect(node_two.next()).toBe(null);
  });
});

describe("LinkedList", () => {
  // Test LinkedList initialization
  it("should create a LinkedList with no nodes", () => {
    const list = LinkedList();
    expect(list.head()).toBe(null);
    expect(list.tail()).toBe(null);
  });

  // Test LinkedList initialization from list
  it("should create a LinkedList from list", () => {
    let list = LinkedList([]);
    expect(list.head()).toBe(null);
    expect(list.tail()).toBe(null);

    list = LinkedList([1, 2, 3]);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(3);
  });

  // Test that append adds node with value to end of linked list
  it(".append(value) should add a single node to the end of a list", () => {
    const list = LinkedList();
    list.append(1);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(1);
    expect(list.tail().next()).toBe(null);
    list.append(2);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(2);
    expect(list.tail().next()).toBe(null);
    list.append(3);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(3);
    expect(list.tail().next()).toBe(null);
    list.append(4);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(4);
    expect(list.tail().next()).toBe(null);
  });

  // Test that prepend adds node with value to start of linked list
  it(".prepend(value) should add a single node to the beginning of a list", () => {
    const list = LinkedList();
    list.prepend(1);
    expect(list.head().value()).toBe(1);
    expect(list.tail().value()).toBe(1);
    expect(list.tail().next()).toBe(null);
    list.prepend(2);
    expect(list.head().value()).toBe(2);
    expect(list.tail().value()).toBe(1);
    expect(list.tail().next()).toBe(null);
    list.prepend(3);
    expect(list.head().value()).toBe(3);
    expect(list.tail().value()).toBe(1);
    expect(list.tail().next()).toBe(null);
    list.prepend(4);
    expect(list.head().value()).toBe(4);
    expect(list.tail().value()).toBe(1);
    expect(list.tail().next()).toBe(null);
  });

  it(".size() should number of nodes in linked list", () => {
    let list = LinkedList();
    expect(list.size()).toBe(0);
    list = LinkedList([]);
    expect(list.size()).toBe(0);
    list = LinkedList([1, 2, 3, 4, 5, 6]);
    expect(list.size()).toBe(6);
  });

  // Test that at gets node at index of linked list
  it(".at(index) should return node at index", () => {
    let list = LinkedList();
    list.append(1);
    expect(list.at(0).value()).toBe(1);
    expect(() => list.at(1)).toThrow(Error);
    list.prepend(2);
    expect(list.at(0).value()).toBe(2);
    expect(list.at(1).value()).toBe(1);
    expect(() => list.at(-1)).toThrow(Error);
    expect(() => list.at(2)).toThrow(Error);

    list = LinkedList([]);
    expect(() => list.at(0)).toThrow(Error);
    expect(() => list.at(1)).toThrow(Error);

    list = LinkedList([1, 2, 3, 4, 5, 6]);
    expect(() => list.at(-1)).toThrow(Error);
    expect(list.at(0).value()).toBe(1);
    expect(list.at(1).value()).toBe(2);
    expect(list.at(2).value()).toBe(3);
    expect(list.at(3).value()).toBe(4);
    expect(list.at(4).value()).toBe(5);
    expect(list.at(5).value()).toBe(6);
    expect(() => list.at(6)).toThrow(Error);
  });

  // Test that pop removes last element of linked list
  it(".pop() should remove last element from list and return value", () => {
    let list = LinkedList();
    expect(list.pop()).toBe(null);
    expect(list.size()).toBe(0);
    list = LinkedList([1, 2, 3]);
    expect(list.pop()).toBe(3);
    expect(list.size()).toBe(2);
    expect(list.pop()).toBe(2);
    expect(list.size()).toBe(1);
    expect(list.pop()).toBe(1);
    expect(list.size()).toBe(0);
    expect(list.pop()).toBe(null);
    expect(list.size()).toBe(0);
  });

  // Test that contains returns true if value in linked list, false otherwise
  it(".contains(value) should return true if value in list, false otherwise", () => {
    let list = LinkedList();
    expect(list.contains(3)).toBe(false);
    list = LinkedList([1, 2, 3]);
    expect(list.contains(1)).toBe(true);
    expect(list.contains(2)).toBe(true);
    expect(list.contains(3)).toBe(true);
    expect(list.contains(4)).toBe(false);
  });

  // Test that find returns index of value or null if not found
  it(".find(value) should return index of value or null otherwise", () => {
    let list = LinkedList();
    expect(list.find(3)).toBe(null);
    list = LinkedList([1, 2, 3]);
    expect(list.find(1)).toBe(0);
    expect(list.find(2)).toBe(1);
    expect(list.find(3)).toBe(2);
    expect(list.find(4)).toBe(null);
  });

  // Test that toString returns correct string represenation to linked list
  it(".toString()", () => {
    let list = LinkedList();
    expect(list.toString()).toBe("null");
    list = LinkedList([1, 2, 3]);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> null");
  });
});
