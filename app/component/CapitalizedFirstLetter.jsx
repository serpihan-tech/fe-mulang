export default function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle null, undefined, or empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
}
