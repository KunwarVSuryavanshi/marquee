export const sanatizeInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, "");
}