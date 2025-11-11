/**
 * Tic Tac Toe Cell factory function
 * @param {string | undefined} mark Character symbol marked on cell
 * @returns cell object
 */
export default function Cell(mark = null) {
    // `mark` must be undefined or be only 1 character 
    if (mark && mark.length > 1) {
        throw new Error(`Symbol must be one character: ${mark}`);
    }
    const _id = crypto.randomUUID();
    let _mark = mark;

    const getID = () => "" + _id;
    const isMarked = () => _mark ? true : false;
    const getMark = () => _mark;
    const addMark = (value) => {
        if (value.length !== 1) {
            throw new Error(`Symbol must be one character: ${value}`);
        }
        _mark = "" + value;
    };
    const clear = () => _mark = undefined;
    const equals = (other) => _mark === other.getMark();
    const toString = () => "" + _mark;

    return { getID, isMarked, getMark, addMark, clear, equals, toString }
}