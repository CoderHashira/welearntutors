const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");

if (openSidebar && sidebar) {
    openSidebar.addEventListener("click", () => {
        sidebar.classList.add("active");
    });
}

if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}