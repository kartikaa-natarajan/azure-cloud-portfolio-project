document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";
}
});
},{threshold:.12});

document.querySelectorAll(".section,.project-card,.skill-card,.education-card").forEach(el => {
el.style.opacity = "0";
el.style.transform = "translateY(25px)";
el.style.transition = "opacity .7s ease, transform .7s ease";
observer.observe(el);
});
