import dateFormat from "dateformat";

export const currentTime = () => {
    return dateFormat(new Date(), 'dd-mm-yyyy h:MM:ss');
}

export const closeApp = () => {
    process.exit();
}