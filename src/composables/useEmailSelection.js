import { reactive } from "vue"

let emails = reactive(new Set())

export const useEmailSelection = function () {
    let toggle = function (email) {
        if (emails.has(email)) {
            emails.delete(email);
        } else {
            emails.add(email);
        }
        console.log(selected);
    }

    return {
        emails, toggle
    }
}

export default useEmailSelection;