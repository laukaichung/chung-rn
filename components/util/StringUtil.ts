export default class StringUtil {

    static sameIds(id, id2) {
        if (!id || !id2) return false;

        return String(id).toLowerCase() === String(id2).toLowerCase();
    }

    static capitalize(str: string) {
        if (str)
            return str.slice(0, 1).toUpperCase() + str.slice(1)
    }

}
