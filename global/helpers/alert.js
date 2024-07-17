export function alert(message, location) {
    return `<script>alert('${message}'); window.location.href = '${location}'; </script>`;
}