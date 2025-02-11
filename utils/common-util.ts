export default function formDataToObject(formData: HTMLFormElement | null) {
    return formData === null ? {} : Object.fromEntries(new FormData(formData).entries())
};
