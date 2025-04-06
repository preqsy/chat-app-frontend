
export const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleTimeString(undefined, options);
    
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
        return `Today at ${timeString}`;
    } else if (isYesterday) {
        return `Yesterday at ${timeString}`;
    } else {
        const dateOptions = { month: 'long', day: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, dateOptions);
        return `${dateString} at ${timeString}`;
    }
}
